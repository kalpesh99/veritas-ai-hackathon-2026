# HealthNotes development context

Active scope accepted by user: at-home diabetes visit preparation without lab results or disease probabilities. Main model: local TF-IDF educational topic retrieval. Current entry point index.html loads visit.css, visit-match.js, visit-app.js. Follow README.md and METHODS.md. Earlier in-event KidneyLens files remain solely as documented history in KIDNEY_HISTORY.md; do not present their results as HealthNotes results. Do not import pre-event practice code/models.

No diagnosis, urgency prediction, reassurance from no match, treatment changes or claims of clinical accuracy. Use primary medical sources, cite each educational topic. No personal data storage, analytics, API keys, uploads or patient identifiers. Render user input with textContent. Print/copy only on user action. Invalidate generated notes when inputs change.

Model vocabulary and benchmark were frozen before first evaluation. Preserve observed failures; do not tune to the test questions. node tests/visit-benchmark.cjs reproduces 12/15 topic matches vs 5/15 baseline and five edge checks. This is author-written synthetic retrieval data, not clinical validation. Clearly disclose any later evaluation/design changes. Maintain cream/sage/forest visual style and keyboard/mobile usability. Credit AI assistance and explain the app to the participant before submission.
