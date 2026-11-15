# HealthNotes

**AI + Health · Veritas AI 2026 · Prototype, not medical advice**

[Open the app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Methods](METHODS.md) · [Results](evaluation/visit-results.json)

People at home may have concerns about diabetes but no laboratory results. HealthNotes turns everyday questions into a printable visit-preparation sheet and retrieves relevant educational topics from a small NIDDK-based catalog. It cannot tell someone whether they have diabetes, whether they can safely wait, or what treatment to take.

## Main AI task

A browser-local TF-IDF information-retrieval model fits word importance on three authored topic documents, then uses cosine similarity to rank symptoms, testing and management information. The user's concern and selected changes are the query. Optional context is copied to notes but not used by the model. No generative model, API key or remote inference is involved. Unknown phrasing can produce no match. The app always allows browsing every topic.

## What we tested

A frozen set of **15 author-written synthetic questions**, five per topic: **12/15 top-1 matches (80%)**, versus **5/15 (33.3%)** for always returning symptoms. Three queries had no vocabulary overlap: “washed out,” “eat for supper,” and “heredity.” These are kept as failures, not patched to raise the result. Labels were assigned by the author; this is a tiny, non-independent retrieval demonstration, **not clinical accuracy or patient validation**. Five automated edge-case checks also pass. See the complete queries and predictions in the results file.

## Run

```sh
python serve.py
# Open http://127.0.0.1:8770/
node tests/visit-benchmark.cjs
```

No packages or credentials are needed for the active app. The benchmark rewrites its result JSON; it does not modify the model. The current UI loads only index.html, visit.css, visit-match.js and visit-app.js. Entries exist only in page memory. No analytics, storage or uploads; opening source links contacts NIDDK. Printing/copying produces a user-controlled copy. Browser extensions and browser-managed form restoration are outside this app's control.

## Contribution, limitations and next steps

Our contribution is a local question-to-resource workflow paired with editable everyday inputs and a printable summary that distinguishes the person's statements from suggested clinician questions. No disease score is shown. Current scope is diabetes, English, three topics. It does not understand negation, paraphrases, urgency, or medical context; keyword overlap can return inappropriate reading. No clinician or user study has been conducted. Next: independently labeled real-world questions collected with consent, relevance review by a qualified professional, and a broader catalog with meaningful out-of-scope evaluation. Do not generalize the synthetic score to real users.

## Sources and assistance

Summaries are authored paraphrases based on NIDDK pages, consulted November 15, 2026:
- [Symptoms & causes](https://www.niddk.nih.gov/health-information/diabetes/overview/symptoms-causes)
- [Tests & diagnosis](https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis)
- [Managing diabetes](https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes)

Catalog vocabulary and synthetic queries were authored for this project with ChatGPT/OpenAI Codex assistance, as were implementation, tests and documentation. No private patient data. The participant must review and understand the work before submitting.

Fresh work started November 15, 2026. The earlier in-event kidney experiment is documented in [KIDNEY_HISTORY.md](KIDNEY_HISTORY.md); its files and numbers are not the active HealthNotes app. No pre-event practice project code or model was imported. [Demo outline](DEMO.md).
