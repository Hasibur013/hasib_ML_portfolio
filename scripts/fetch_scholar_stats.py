"""Fetch Google Scholar metrics via SerpAPI into public/scholar_stats.json."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "scholar_stats.json"
SCHOLAR_ID = os.environ.get("SCHOLAR_ID", "PyEMtfkAAAAJ")


def recent_value(metric: dict) -> int:
    """Pick the 'since_YYYY' value from a SerpAPI metric object."""
    if not isinstance(metric, dict):
        return int(metric or 0)
    all_value = int(metric.get("all") or 0)
    for key, value in metric.items():
        if key.startswith("since_"):
            return int(value or 0)
    return all_value


def fetch_via_serpapi(api_key: str) -> dict:
    query = urllib.parse.urlencode(
        {
            "engine": "google_scholar_author",
            "author_id": SCHOLAR_ID,
            "hl": "en",
            "api_key": api_key,
        }
    )
    url = f"https://serpapi.com/search.json?{query}"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "hasib-ml-portfolio-scholar-bot/1.0"},
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.load(resp)

    if data.get("error"):
        raise RuntimeError(str(data["error"]))

    table = (data.get("cited_by") or {}).get("table") or []
    if len(table) < 3:
        raise RuntimeError(f"Unexpected SerpAPI cited_by table: {table!r}")

    citations = table[0].get("citations") or {}
    h_index = table[1].get("h_index") or {}
    i10_index = table[2].get("i10_index") or {}

    graph = (data.get("cited_by") or {}).get("graph") or []
    cites_per_year = {
        str(item.get("year")): int(item.get("citations") or 0)
        for item in graph
        if item.get("year") is not None
    }

    return {
        "citations": int(citations.get("all") or 0),
        "citations_since_2021": recent_value(citations),
        "h_index": int(h_index.get("all") or 0),
        "h_index_since_2021": recent_value(h_index),
        "i10_index": int(i10_index.get("all") or 0),
        "i10_index_since_2021": recent_value(i10_index),
        "cites_per_year": cites_per_year,
        "updated": date.today().isoformat(),
        "source": "serpapi+google_scholar_author",
        "scholar_id": SCHOLAR_ID,
    }


def main() -> int:
    api_key = os.environ.get("SERPAPI_KEY", "").strip()
    if not api_key:
        print(
            "SERPAPI_KEY is missing. Add it as a GitHub Actions secret.",
            file=sys.stderr,
        )
        return 1

    try:
        payload = fetch_via_serpapi(api_key)
    except (urllib.error.URLError, TimeoutError, RuntimeError, json.JSONDecodeError) as exc:
        print(f"SerpAPI Scholar fetch failed: {exc}", file=sys.stderr)
        return 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}: {payload}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
