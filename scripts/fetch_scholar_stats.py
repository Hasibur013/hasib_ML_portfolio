"""Fetch Google Scholar metrics into public/scholar_stats.json (stdlib only)."""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "scholar_stats.json"
SCHOLAR_ID = os.environ.get("SCHOLAR_ID", "PyEMtfkAAAAJ")
SCHOLAR_URL = (
    f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en&pagesize=1"
)


class ScholarStatsParser(HTMLParser):
    """Pull All / Since values from #gsc_rsb_st citation table."""

    def __init__(self) -> None:
        super().__init__()
        self.in_table = False
        self.in_std = False
        self.std_values: list[str] = []
        self._buf: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        cls = attr.get("class") or ""
        if tag == "table" and attr.get("id") == "gsc_rsb_st":
            self.in_table = True
        if self.in_table and tag == "td" and "gsc_rsb_std" in cls.split():
            self.in_std = True
            self._buf = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "table" and self.in_table:
            self.in_table = False
        if tag == "td" and self.in_std:
            self.in_std = False
            self.std_values.append("".join(self._buf).strip())

    def handle_data(self, data: str) -> None:
        if self.in_std:
            self._buf.append(data)


def fetch_text(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            ),
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,text/plain,*/*",
        },
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_stats_from_text(text: str) -> dict | None:
    """Parse Scholar HTML table, or plain-text mirrors that include the labels."""
    parser = ScholarStatsParser()
    parser.feed(text)
    values = [re.sub(r"[^\d]", "", v) for v in parser.std_values]
    values = [v for v in values if v]
    if len(values) < 6:
        found = re.findall(r'class="[^"]*gsc_rsb_std[^"]*"[^>]*>(\d[\d,]*)</td>', text)
        values = [re.sub(r"[^\d]", "", v) for v in found]
    if len(values) >= 6:
        nums = [int(v) for v in values[:6]]
        return {
            "citations": nums[0],
            "citations_since_2021": nums[1],
            "h_index": nums[2],
            "h_index_since_2021": nums[3],
            "i10_index": nums[4],
            "i10_index_since_2021": nums[5],
        }

    patterns = [
        (
            r"Citations\s*[|\t ]+(\d+)\s+(\d+)",
            r"h-index\s*[|\t ]+(\d+)\s+(\d+)",
            r"i10-index\s*[|\t ]+(\d+)\s+(\d+)",
        ),
        (
            r"Citations\s+(\d+)\s+(\d+)",
            r"h-index\s+(\d+)\s+(\d+)",
            r"i10-index\s+(\d+)\s+(\d+)",
        ),
    ]
    for cite_re, h_re, i10_re in patterns:
        cite = re.search(cite_re, text, re.I)
        h = re.search(h_re, text, re.I)
        i10 = re.search(i10_re, text, re.I)
        if cite and h and i10:
            return {
                "citations": int(cite.group(1)),
                "citations_since_2021": int(cite.group(2)),
                "h_index": int(h.group(1)),
                "h_index_since_2021": int(h.group(2)),
                "i10_index": int(i10.group(1)),
                "i10_index_since_2021": int(i10.group(2)),
            }
    return None


def load_existing() -> dict:
    if not OUT.exists():
        return {}
    try:
        return json.loads(OUT.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def fetch_stats() -> dict:
    candidates = [
        SCHOLAR_URL,
        f"https://r.jina.ai/{SCHOLAR_URL}",
        "https://r.jina.ai/http://scholar.google.com/citations?"
        + urllib.parse.urlencode({"user": SCHOLAR_ID, "hl": "en"}),
    ]
    errors: list[str] = []
    for url in candidates:
        try:
            print(f"Trying {url}")
            text = fetch_text(url)
            if "not a robot" in text.lower() and "gsc_rsb" not in text:
                errors.append(f"{url}: CAPTCHA")
                continue
            stats = parse_stats_from_text(text)
            if stats:
                return stats
            errors.append(f"{url}: could not parse stats")
        except (urllib.error.URLError, TimeoutError) as exc:
            errors.append(f"{url}: {exc}")
    raise RuntimeError("; ".join(errors) or "All Scholar fetch attempts failed")


def main() -> int:
    existing = load_existing()
    try:
        stats = fetch_stats()
    except RuntimeError as exc:
        print(f"Scholar fetch failed: {exc}", file=sys.stderr)
        if existing.get("citations") is not None:
            print("Keeping existing public/scholar_stats.json (soft fail).")
            return 0
        raise

    payload = {
        **stats,
        "cites_per_year": existing.get("cites_per_year") or {},
        "updated": date.today().isoformat(),
        "source": "github-actions+scholar-html",
        "scholar_id": SCHOLAR_ID,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}: {payload}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
