# HealthNotes

**AI + Health · Veritas AI 2026 · Prototype, not medical advice**

[Open the hosted app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Methods](METHODS.md) · [Semantic results](evaluation/semantic-results.json)

People describe health concerns in everyday language, not necessarily clinical keywords. Our first diabetes-only word matcher missed that need. HealthNotes now uses a **pretrained sentence-embedding model** to suggest educational reading across **nine topics**, asks the person to confirm what they meant, and builds personal visit notes. It does not diagnose, rule out a condition, determine urgency, or recommend treatment.

## What happens in the app

1. Describe a concern in ordinary words. There are no symptom checkboxes that assume diabetes.
2. A local MiniLM model compares the description with nine authored topic descriptions. It offers up to three possible reading topics. The person must confirm one, choose another, or choose none.
3. If the description cannot be narrowed down, the app asks for more detail. The person can refine suggestions or use manual browsing. Follow-up questions are authored prompts, not an AI medical interview.
4. Make a visit summary containing the person's exact statements, selected topic, optional details and checklist. Add and prioritize personal questions; print, copy or download notes.

Topics: energy/fatigue, headaches, digestion, cough, sleep, worry/anxiety, diabetes testing, heart information, stroke awareness. These are educational catalog headings, not a list of conditions inferred from the person. Emergency information is fixed and always visible; there is no emergency-detection algorithm.

## Model and privacy

**Xenova/all-MiniLM-L6-v2**, pinned revision `751bff37182d3f1213fa05d7196b954e230abad9`, runs with **Transformers.js 3.0.0, WebAssembly q8**, mean pooling and normalized 384-dimensional embeddings. Cosine similarity ranks title-plus-description catalog embeddings. A fixed, unvalidated retrieval cutoff of **0.30** suppresses weak suggestions; it is not a medical threshold. No probabilities or treatment responses are generated.

On first use, runtime/model files download from jsDelivr and Hugging Face (tens of MB). The browser may cache those files. The description is passed to a local Web Worker, not uploaded to an inference service. The application stores no health entries, uses no analytics, and needs no API key. Context, timing, checklist and follow-up notes stay in page memory; explicitly using Refine sends the follow-up detail only to the local worker too. Printing, copying or downloading creates a copy controlled by the user. Source links visit third-party health sites. Browser extensions, device clipboard, downloads and browser-managed restoration are outside app control.

AI requires HTTPS or a local web server, not opening an HTML file directly. Manual browsing and notes remain available when the model fails, takes too long or is not loaded. Worker results are ignored after edits, Clear or manual selection so stale suggestions cannot overwrite the current state.

## Evaluation: what we actually observed

Frozen synthetic set, authored with AI assistance before first semantic evaluation: **18 supported descriptions (two per topic), four unrelated queries, three vague descriptions**. No model, threshold or catalog tuning after these results.

| Measurement | Result |
| --- | ---: |
| Intended topic ranked first, before cutoff | 18/18 |
| Intended topic in the offered shortlist, after cutoff | **17/18** |
| Word-based TF-IDF baseline, first topic | 13/18 |
| Vague/unrelated queries with suggestions withheld | 7/7 |

**Retained failure:** “I am wiped out by the end of an ordinary day” ranked energy first but scored 0.143, below 0.30, so no semantic topic was offered. The UI asks for clarification/manual selection. Some shortlists contain irrelevant alternatives, such as sleep alongside stroke awareness. Confirmation helps avoid an automatic claim but does not establish safety. All rows and raw scores are visible in the model lab and JSON.

These tiny author-labeled examples are not an independent test, user study, clinical validation or evidence of real-world accuracy. No urgency, diagnosis, negation, language, fairness, spelling or mixed-intent reliability has been established. The model is a general English sentence encoder, not a medical reasoning model. Broader independent relevance and usability testing are next.

## Run and reproduce

```sh
python serve.py
# Open http://127.0.0.1:8770/
node tests/test-concern.cjs
```

Open **Model lab → Run the synthetic evaluation** to run actual browser model inference and download its result JSON. The Node test checks catalog integrity, threshold boundaries, result provenance and the baseline; it does not rerun the neural model. There are 17 such checks. No local package install is needed for the hosted app; the first model download needs an internet connection. Slow devices may not support the model well.

## Sources and credits

Authored educational summaries and links, consulted November 15, 2026:
- MedlinePlus/National Library of Medicine: [fatigue](https://medlineplus.gov/fatigue.html), [headaches](https://medlineplus.gov/headache.html), [digestion](https://medlineplus.gov/digestivediseases.html), [cough](https://medlineplus.gov/cough.html), [sleep](https://medlineplus.gov/sleepdisorders.html), [anxiety](https://medlineplus.gov/anxiety.html).
- NIDDK: [diabetes tests and diagnosis](https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis).
- CDC: [heart attack awareness](https://www.cdc.gov/heart-disease/about/heart-attack.html), [stroke warning signs](https://www.cdc.gov/stroke/signs-symptoms/index.html).
- [Sentence Transformers all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2), [Xenova ONNX model and Apache 2.0 license](https://huggingface.co/Xenova/all-MiniLM-L6-v2), [Transformers.js](https://huggingface.co/docs/transformers.js), [ONNX Runtime](https://onnxruntime.ai/).
- ChatGPT/OpenAI Codex assisted with design, source research, authored catalog/queries, implementation, debugging, evaluation and documentation. Participant must review, understand and explain the work. Sources and model authors do not endorse this app; content is not clinician-reviewed.

All project work began during the event on November 15, 2026. No pre-event practice code/model/results were imported. [KEYWORD_HISTORY.md](KEYWORD_HISTORY.md) records the superseded diabetes word matcher; [KIDNEY_HISTORY.md](KIDNEY_HISTORY.md) records the earlier in-event lab experiment. Their code/results remain solely as history and are not the active app. [Two-minute demo outline](DEMO.md).
