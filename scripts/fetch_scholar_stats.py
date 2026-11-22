"""Fetch Google Scholar metrics into public/scholar_stats.json."""

from __future__ import annotations

import json
import os
import sys
from datetime import date
from pathlib import Path

from scholarly import scholarly

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "scholar_stats.json"
SCHOLAR_ID = os.environ.get("SCHOLAR_ID", "PyEMtfkAAAAJ")


def main() -> int:
    author = scholarly.fill(
        scholarly.search_author_id(SCHOLAR_ID),
        sections=["basics", "indices", "counts"],
    )

    citations = int(author.get("citedby") or 0)
    citations_recent = int(author.get("citedby5y") or citations)
    h_index = int(author.get("hindex") or 0)
    h_index_recent = int(author.get("hindex5y") or h_index)
    i10_index = int(author.get("i10index") or 0)
    i10_index_recent = int(author.get("i10index5y") or i10_index)

    payload = {
        "citations": citations,
        "citations_since_2021": citations_recent,
        "h_index": h_index,
        "h_index_since_2021": h_index_recent,
        "i10_index": i10_index,
        "i10_index_since_2021": i10_index_recent,
        "cites_per_year": author.get("cites_per_year") or {},
        "updated": date.today().isoformat(),
        "source": "github-actions+scholarly",
        "scholar_id": SCHOLAR_ID,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}: {payload}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001 — surface scrape/CAPTCHA failures in CI logs
        print(f"Scholar fetch failed: {exc}", file=sys.stderr)
        raise
