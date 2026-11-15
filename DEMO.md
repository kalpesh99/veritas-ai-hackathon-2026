# Two-minute demo outline

Use synthetic panels only. Speak in your own words after understanding the code and results.

- **0:00–0:15 — Problem:** A nurse exploring an incomplete panel may see a confident-looking model score. KidneyLens makes the gaps visible.
- **0:15–0:55 — App:** Select Routine-looking, then CKD-like. Show the pattern and contributions. Select Missing labs, point to estimated values, then clear one more field so the score is withheld. Explain that the app is not a diagnosis or medical advice.
- **0:55–1:25 — Evidence:** On 75 reserved records, it caught 45 of 46 CKD labels, missed one and made two false alarms. Always CKD caught all 46 but made 29 false alarms. Validation, not test data, selected the model and threshold.
- **1:25–1:45 — Own contribution:** Precision fell from 95.7% to 93.1% and 87.5% when one or two more labs were hidden. Recall stayed high partly because more records were flagged. Missing information changes what a number means.
- **1:45–2:00 — Limits:** Small retrospective study, no external validation. Next: another data source and qualified-user review. Credit UCI and the AI/development tools used.

Do not describe 96% test accuracy as reliability for real patients or the score as a personal disease probability. No video is recorded or submitted automatically.
