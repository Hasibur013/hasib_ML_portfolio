/** Google Scholar profile — weekly GitHub Action refreshes public/scholar_stats.json. */
export const researchProfiles = {
  scholar: {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=PyEMtfkAAAAJ&hl=en",
    userId: "PyEMtfkAAAAJ",
  },
};

/**
 * Fallback if scholar_stats.json is missing (e.g. offline / first clone).
 * Prefer values from public/scholar_stats.json (updated by .github/workflows/scholar.yml).
 */
export const researchMetrics = {
  citations: 30,
  citationsSince2021: 30,
  hIndex: 1,
  hIndexSince2021: 1,
  i10Index: 1,
  i10IndexSince2021: 1,
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
    citedBy: 0,
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
    citedBy: 1,
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
    citedBy: 29,
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

function mapScholarStatsJson(data) {
  if (!data || typeof data !== "object") return null;

  const citations = Number(data.citations);
  const hIndex = Number(data.h_index);
  const i10Index = Number(data.i10_index);
  if ([citations, hIndex, i10Index].some((n) => Number.isNaN(n))) return null;

  return {
    citations,
    citationsSince2021: Number(data.citations_since_2021 ?? citations),
    hIndex,
    hIndexSince2021: Number(data.h_index_since_2021 ?? hIndex),
    i10Index,
    i10IndexSince2021: Number(data.i10_index_since_2021 ?? i10Index),
    updated: data.updated || new Date().toISOString().slice(0, 10),
    source: data.source || "scholar_stats.json",
  };
}

/** Load metrics from public/scholar_stats.json (written by GitHub Actions). */
export async function fetchScholarMetricsLive() {
  try {
    const url = `${import.meta.env.BASE_URL}scholar_stats.json`;
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return null;
    return mapScholarStatsJson(await res.json());
  } catch {
    return null;
  }
}
