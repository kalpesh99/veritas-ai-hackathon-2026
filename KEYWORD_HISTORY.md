# Superseded diabetes keyword prototype

The diabetes-only TF-IDF app and its 15-query results were superseded after user feedback about ordinary language and condition bias. Its source files visit-app.js, visit-match.js, visit-fixtures.js and visit-lab.js remain as transparent in-event history, not the current app. The current entry point uses concern-*.js and semantic-*.js.

# HealthNotes

**AI + Health · Veritas AI 2026 · Prototype, not medical advice**

[Open the app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Methods](METHODS.md) · [Results](evaluation/visit-results.json)

People at home may have concerns about diabetes but no laboratory results. HealthNotes turns everyday questions into a printable visit-preparation sheet and retrieves relevant educational topics from a small NIDDK-based catalog. It cannot tell someone whether they have diabetes, whether they can safely wait, or what treatment to take.

## Main AI task

A browser-local TF-IDF information-retrieval model fits word importance on three authored topic documents, then uses cosine similarity to rank symptoms, testing and management information. The user's concern and selected changes are the query. Optional context is copied to notes but not used by the model. No generative model, API key or remote inference is involved. Unknown phrasing can produce no match. The app always allows browsing every topic.

## New features

- **Explain each match:** shows exact shared words and words outside the catalog. No disease probability or confidence score.
- **Personal question agenda:** add questions from reading cards or write your own, reorder priorities, and remove items. Up to eight questions, 300 characters each. Notes update immediately.
- **Preparation checklist and download:** select reminders, then print, copy or download a plain-text visit note. All personal state stays in memory until a user explicitly copies/prints/downloads.
- **Interactive model lab:** inspect a fictional query, demonstrate a known failure, and rerun all 15 frozen queries with per-question results and a baseline directly in the browser. The lab uses a separate field and never copies the person's concern into examples.

## What we tested

A frozen set of **15 author-written synthetic questions**, five per topic: **12/15 top-1 matches (80%)**, versus **5/15 (33.3%)** for always returning symptoms. Three queries had no vocabulary overlap: “washed out,” “eat for supper,” and “heredity.” These are kept as failures, not patched to raise the result. Labels were assigned by the author; this is a tiny, non-independent retrieval demonstration, **not clinical accuracy or patient validation**. Five original edge-case checks and twelve explanation/robustness checks pass. The latter explicitly demonstrates that negation is NOT understood. See the complete queries and predictions in the results file.

## Run

```sh
python serve.py
# Open http://127.0.0.1:8770/
node tests/visit-benchmark.cjs
node tests/visit-features.cjs
```

No packages or credentials are needed for the active app. The benchmark rewrites its result JSON; it does not modify the model. The current UI loads index.html, visit.css, visit-match.js, visit-app.js, visit-features.js, visit-fixtures.js and visit-lab.js. Entries exist only in page memory. No analytics, storage or uploads; opening source links contacts NIDDK. Printing/copying/downloading produces a user-controlled copy. Browser extensions and browser-managed form restoration are outside this app's control.

## Contribution, limitations and next steps

Our contribution is a local question-to-resource workflow paired with editable everyday inputs and a printable summary that distinguishes the person's statements from suggested clinician questions. No disease score is shown. Current scope is diabetes, English, three topics. It does not understand negation, paraphrases, urgency, or medical context; keyword overlap can return inappropriate reading. No clinician or user study has been conducted. Next: independently labeled real-world questions collected with consent, relevance review by a qualified professional, and a broader catalog with meaningful out-of-scope evaluation. Do not generalize the synthetic score to real users.

## Sources and assistance

Summaries are authored paraphrases based on NIDDK pages, consulted November 15, 2026:
- [Symptoms & causes](https://www.niddk.nih.gov/health-information/diabetes/overview/symptoms-causes)
- [Tests & diagnosis](https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis)
- [Managing diabetes](https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes)

Catalog vocabulary and synthetic queries were authored for this project with ChatGPT/OpenAI Codex assistance, as were implementation, tests and documentation. No private patient data. The participant must review and understand the work before submitting.

Fresh work started November 15, 2026. The earlier in-event kidney experiment is documented in [KIDNEY_HISTORY.md](KIDNEY_HISTORY.md); its files and numbers are not the active HealthNotes app. No pre-event practice project code or model was imported. [Demo outline](DEMO.md).
