/** Scholar / ResearchGate profile links and fallback metrics (used until live fetch resolves). */
export const researchProfiles = {
  scholar: {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=PyEMtfkAAAAJ&hl=en",
    userId: "PyEMtfkAAAAJ",
  },
  researchGate: {
    label: "ResearchGate",
    // Update this to your exact ResearchGate profile URL when you have it.
    href: "https://www.researchgate.net/profile/Md-Hasibur-Rahman",
  },
};

/**
 * Fallback metrics shown immediately; live Crossref refresh updates citations / h-index / i10.
 * Edit these when Scholar numbers diverge from Crossref (Scholar often counts more).
 */
export const researchMetricsFallback = {
  citations: 16,
  hIndex: 1,
  i10Index: 1,
  publications: 3,
  researchGateReads: null,
  source: "Crossref baseline",
  updated: "2026-11-22",
};

export const publications = [
  {
    id: "dementia2026",
    title:
      "How Reliable and Explainable Are Machine Learning Models for Dementia Detection? A Leakage-Aware Evaluation",
    authors: "Md. Hasibur Rahman, Md. Jamil Hasan, Md. Sajjad Hossain, Md. Sultanul Islam Ovi",
    venue: "Research Square preprint — September 2026",
    status: "Preprint — will be submitted to a journal",
    abstract:
      "Leakage-aware evaluation of dementia classification on OASIS-2 (373 visits, 150 participants) using demographics, education, MMSE, and global MRI measures. Participant-grouped nested folds avoid visit-level leakage across nine modeling procedures. Selected models reach pooled ROC-AUC 0.867; MMSE alone is strong (0.85–0.86), MRI gains are learner-dependent, and XGBoost attributions are dominated by MMSE.",
    url: "https://doi.org/10.21203/rs.3.rs-10967756/v1",
    doi: "10.21203/rs.3.rs-10967756/v1",
    bibtex: `@article{rahman2026dementia,
  title={How Reliable and Explainable Are Machine Learning Models for Dementia Detection? A Leakage-Aware Evaluation},
  author={Rahman, Md. Hasibur and Hasan, Md. Jamil and Hossain, Md. Sajjad and Ovi, Md. Sultanul Islam},
  year={2026},
  note={Preprint. Will be submitted to a journal},
  doi={10.21203/rs.3.rs-10967756/v1}
}`,
  },
  {
    id: "smc2025",
    title: "Priority-Aware Task Offloading for Latency and Energy Minimization in Healthcare IoT Systems",
    authors:
      "Md. Jamil Hasan, Md. Hasibur Rahman, Md. Sajjad Hossain, Palash Roy, Md. Abdur Razzaque, Giancarlo Fortino, Raffaele Gravina, Mohammad Mehedi Hassan",
    venue: "IEEE International Conference on Systems, Man, and Cybernetics (SMC 2025), Vienna, Austria — December 2025",
    abstract:
      "A priority- and Age-of-Information-aware task offloading framework (PRALEIT) for healthcare IoT. The work classifies IoMT tasks with a Bayesian model, combines D2D/local processing with MEC offloading, and formulates a MILP to reduce execution delay and energy while keeping medical services reliable.",
    url: "https://doi.org/10.1109/SMC58881.2025.11343197",
    doi: "10.1109/SMC58881.2025.11343197",
    bibtex: `@inproceedings{hasan2025praleit,
  title={Priority-Aware Task Offloading for Latency and Energy Minimization in Healthcare IoT Systems},
  author={Hasan, Md. Jamil and Rahman, Md. Hasibur and Hossain, Md. Sajjad and Roy, Palash and Razzaque, Md. Abdur and Fortino, Giancarlo and Gravina, Raffaele and Hassan, Mohammad Mehedi},
  booktitle={IEEE International Conference on Systems, Man, and Cybernetics (SMC)},
  pages={4667--4672},
  year={2025},
  publisher={IEEE},
  doi={10.1109/SMC58881.2025.11343197}
}`,
  },
  {
    id: "sti2024",
    title: "PhishGuard: A Multi-Layered Ensemble Model for Optimal Phishing Website Detection",
    authors: "Md Sultanul Islam Ovi, Md. Hasibur Rahman, Mohammad Arif Hossain",
    venue: "6th International Conference on Sustainable Technologies for Industry 5.0 (STI 2024), Dhaka — December 2024",
    abstract:
      "A custom multi-layered ensemble for phishing-website detection. Feature selection with SelectKBest and RFECV, plus hyperparameter tuning and class balancing, feed stacked classifiers (Random Forest, Gradient Boosting, CatBoost, XGBoost). Evaluated on four public datasets with up to 99.05% accuracy.",
    url: "https://arxiv.org/abs/2409.19825",
    doi: "10.1109/STI64222.2024.10951075",
    bibtex: `@inproceedings{ovi2024phishguard,
  title={PhishGuard: A Multi-Layered Ensemble Model for Optimal Phishing Website Detection},
  author={Ovi, Md Sultanul Islam and Rahman, Md. Hasibur and Hossain, Mohammad Arif},
  booktitle={2024 6th International Conference on Sustainable Technologies for Industry 5.0 (STI)},
  pages={1--6},
  year={2024},
  organization={IEEE}
}`,
  },
];

function hIndexFromCounts(counts) {
  const sorted = [...counts].sort((a, b) => b - a);
  let h = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    if (sorted[i] >= i + 1) h = i + 1;
    else break;
  }
  return h;
}

/** Live citation refresh via Crossref (browser-safe CORS). Scholar itself cannot be scraped client-side. */
export async function fetchLiveResearchMetrics(pubs = publications) {
  const dois = pubs.map((p) => p.doi).filter(Boolean);
  if (!dois.length) return null;

  const counts = await Promise.all(
    dois.map(async (doi) => {
      try {
        const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return 0;
        const data = await res.json();
        return Number(data?.message?.["is-referenced-by-count"] ?? 0);
      } catch {
        return 0;
      }
    })
  );

  const citations = counts.reduce((sum, n) => sum + n, 0);
  const hIndex = hIndexFromCounts(counts);
  const i10Index = counts.filter((n) => n >= 10).length;

  return {
    citations,
    hIndex,
    i10Index,
    publications: pubs.length,
    researchGateReads: researchMetricsFallback.researchGateReads,
    source: "Live via Crossref",
    updated: new Date().toISOString().slice(0, 10),
    perPaper: dois.map((doi, i) => ({ doi, citations: counts[i] })),
  };
}
