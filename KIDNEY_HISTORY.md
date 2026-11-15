# Archived in-event experiment

The kidney-lab scope was replaced by HealthNotes. The files train.py, model.json, inference.js, app.js, styles.css, requirements.txt, evaluation/results.json, evaluation/parity_cases.json, evaluation/summary.png and tests/test_inference.cjs belong ONLY to this earlier experiment, not the active app or its performance claims. Kept for transparent development history.

# KidneyLens

**Track: AI + Health · Veritas AI International High School Hackathon 2026**

**This project is a prototype and is not medical advice.**

[Open the app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Methods and limitations](METHODS.md) · [Complete results](evaluation/results.json)

## The problem

A nurse exploring a lab panel may have incomplete results. A model can still produce a confident-looking number after replacing unknown values. KidneyLens asks: **how does missing laboratory information change a kidney-disease classifier?** It is an educational model explorer, not a diagnosis, future-risk estimate or urgency assessment.

## What we built

A browser app uses age, random blood glucose, blood urea, serum creatinine, hemoglobin, urine specific gravity and urine albumin grade. It shows a pattern summary, model contributions and every estimated value. Synthetic examples make it easy to test. Entries are not uploaded or saved. Excessive missingness, missing adult age and out-of-training-range values withhold the score; these are demo guardrails, not clinical rules.

## What we added

**Our own idea:** a missing-lab stress test and an interface that exposes imputation. We hid one or two additional test-set lab values in 20 fixed random trials, keeping the model and threshold unchanged. Mean precision fell from **95.7%** to **93.1%** and **87.5%**. Recall was **97.8%**, **96.3%** and **97.0%**. Missing information increased false alarms even when recall stayed high. Random masking is not external validation.

## How it works

The public UCI Chronic Kidney Disease dataset has 400 records. Our adult-only analysis retains **372**, excluding 19 children and 9 unknown ages. We use 223 training, 74 validation and 75 reserved test records, grouping identical input profiles. Training-only imputation, scaling and categorical encoding feed logistic regression. Validation selects regularization and a threshold retaining at least 90% validation recall; test results never influence that choice.

## Results and failures

| Reserved test: 75 records | Always-CKD baseline | KidneyLens |
| --- | ---: | ---: |
| Accuracy | 61.3% | 96.0% |
| Precision | 61.3% | 95.7% |
| Recall | 100.0% | 97.8% |
| Missed CKD labels | 0 | **1 of 46** |
| False alarms | 29 | **2 of 29 non-CKD** |

The three errors all had missing hemoglobin; that association does not establish the cause. The missed case scored 30.4%, below the 31.7% threshold. Recall’s approximate 95% interval is 88.7–99.6%, precision’s 85.8–98.8%. A small selected sample and diagnosis-related labs can make performance look strong. Scores are not validated personal disease probabilities. External testing, calibration and broader subgroup evaluation remain unfinished.

## Next steps

Test an independent source with compatible units; investigate structured missingness and whether abstention helps users. Have qualified users review the workflow before any real-world use.

## Run and verify

```bash
python -m pip install -r requirements.txt
python train.py
node tests/test_inference.cjs
python serve.py
```

Open `http://127.0.0.1:8770/`. Model files and results are included; retraining is optional for running the app. Training downloads the public source to an ignored `.cache/` folder and verifies its SHA-256. No API key is required.

## Sources and tools

- Rubini, Soundarapandian & Eswaran (2015), [UCI Chronic Kidney Disease](https://archive.ics.uci.edu/dataset/336/chronic+kidney+disease), [DOI](https://doi.org/10.24432/C5G020), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Features/categories follow that source.
- [scikit-learn](https://scikit-learn.org/), [pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/), [Matplotlib](https://matplotlib.org/): modeling, processing, evaluation and figures.
- [ChatGPT / OpenAI Codex](https://openai.com/codex/): assistance with scoping, implementation, debugging, explanations and documentation. The participant must review and understand the work before submission.

Fresh work began November 15, 2026. No pre-event practice code, model or evaluation result was imported. Team identity is supplied separately on the submission form. [Demo outline](DEMO.md).
