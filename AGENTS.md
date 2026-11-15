# KidneyLens development notes

Fresh Veritas AI 2026 hackathon entry, started November 15, 2026. This is separate from the user's pre-event practice projects. Do not copy or extend their source, trained models or results.

Scope: an adult kidney-lab pattern classification demo using the public UCI Chronic Kidney Disease dataset (336). Intended user: a nurse exploring how missing laboratory results affect an educational model. No diagnosis, future-risk, triage urgency or clinical validation claims.

Keep preprocessing inside training pipelines. Select model and decision threshold on validation only. Reserve test data for final reporting; never tune to improve reported test results. Group identical selected input profiles across partitions. Report actual counts, precision and recall together, plus a majority-class baseline. Document limited sample size, selection bias, missingness and label limitations.

The deployed app runs the exported logistic model in the browser. Changes to preprocessing or inference must pass Python/JavaScript parity checks. Do not collect patient names, identifiers or upload personal health records. Demo profiles must be synthetic. Do not persist entered lab values or add analytics/API calls.

Read README.md, evaluation/results.json and the source before continuing. No invented results or claims. Credit UCI, libraries, tutorials if used, and ChatGPT/Codex assistance. Keep the public repository safe to share. The user must understand and explain the project.

