# HealthNotes

**AI + Health · Veritas AI 2026 · Aarjav Vaghasiya, LASA High School**

**Prototype, not medical advice.**

[Open the app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Submission write-up](WRITEUP.md) · [Submission links](SUBMISSION.md) · [Methods](METHODS.md) · [Sources](SOURCE_CATALOG.md)

HealthNotes helps an adult preparing a non-emergency appointment describe a concern, find educational reading and prepare personal notes. It does not diagnose, determine urgency, recommend treatment or provide disease percentages. Patient benefit has not been measured.

## Current app

- **24 educational topics**, each linked to MedlinePlus, NIDDK or CDC.
- **168 authored manual-search phrases** with synonyms and selected misspellings; not clinical research records or patient training data.
- A pretrained MiniLM sentence model suggests up to three reading topics. Users confirm one, choose another, or select none.
- Concern, onset, optional context, preparation checklist, authored follow-up prompts and a prioritized personal question agenda.
- Print, copy or download notes. Manual browsing and notes remain available without loading AI.
- A live model lab and recorded results showing failures as well as successes.

The original contribution combines meaning-based retrieval, confirmation, manual fallback and appointment preparation. An earlier in-event keyword prototype prompted this redesign; pre-event HealthScreen code/models were not imported.

## Actual current evaluation

Sixty frozen, author-labeled synthetic English queries, created with AI assistance before the first expanded run. No scoring, cutoff or catalog tuning followed these results.

| Measurement | Result |
| --- | ---: |
| Intended topic ranked first, before cutoff | 47/48 supported descriptions |
| Same-catalog TF-IDF first-topic baseline | 33/48 |
| Intended topic actually offered after cutoff | **42/48** |
| Intended topics missed | **6/48** |
| Non-target extra suggestions | **25 across 16/48** |
| Vague/unrelated queries receiving suggestions | **0/12** |

[All current outputs](evaluation/expanded-results.json) · [Current source catalog](evaluation/catalog-v2.json) · [Original-question regression on current catalog](evaluation/expanded-regression.json).

Misses include “It stings when I pass water” and “My monthly bleeding is no longer regular.” Non-target means different from a single author label, not necessarily irrelevant. These are retrieval counts, not disease errors or medical accuracy. Tests are small, synthetic, non-independent and not clinician-validated. Negation, mixed intent, broad spelling/language coverage, fairness and real-user benefit remain unestablished. Confirmation is not a proven medical safeguard.

## Run and verify

```sh
python serve.py
# Open http://127.0.0.1:8770/
node tests/test-concern.cjs
node tests/test-evidence.cjs
node tests/test-expanded.cjs
```

The **59 engineering checks** cover historical-result provenance, evidence counts, current catalog/search data and current-result consistency. Actual neural inference runs in Model lab → Run the new 60-question evaluation. No local package installation or API key is needed; the first model download requires internet. Use HTTPS or a local server rather than opening index.html as a file.

MiniLM runs in a local Web Worker using Transformers.js 3.0.0, WASM q8, mean pooling and normalized embeddings. Cosine similarity >=0.30 is an unvalidated retrieval cutoff, not a medical boundary. No project fine-tuning. Aliases affect manual search only. Model/runtime files download from Hugging Face/jsDelivr and may be cached; concerns are not uploaded to inference services or saved by app code. Optional context stays in notes. Explicit Refine includes the follow-up detail in local inference. Copy/print/download creates user-controlled copies. Source links visit external websites.

## Sources and credits

**Reference content.** The [complete source/alias catalog](SOURCE_CATALOG.md) lists every exact page: 21 [MedlinePlus](https://medlineplus.gov/) pages, one [NIDDK](https://www.niddk.nih.gov/) page and two [CDC](https://www.cdc.gov/) pages, checked November 15, 2026. Authored summaries, prompts and aliases are not endorsed or clinician-reviewed by those sources.

**Pretrained model.** [Xenova/all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2) (Apache 2.0), revision `751bff37182d3f1213fa05d7196b954e230abad9`, based on [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) (Sentence Transformers). Used as-is; not trained or fine-tuned in this project.

**Libraries and hosting.** [Transformers.js](https://huggingface.co/docs/transformers.js) 3.0.0 and [ONNX Runtime](https://onnxruntime.ai/). Runtime and model files are downloaded from [jsDelivr](https://www.jsdelivr.com/) and [Hugging Face](https://huggingface.co/).

**Tutorials and event materials.** Veritas AI International High School Hackathon materials: the hacker guide, optional Colab starter notebook and sample submission shared with participants by the organizers, and the pre-event [workshops](https://highschoolhackathon.org/workshops.html). See also the public [project briefs](https://highschoolhackathon.org/briefs.html).

**Dataset (superseded experiment only).** The earlier in-event kidney experiment ([KIDNEY_HISTORY.md](KIDNEY_HISTORY.md), [KIDNEY_METHODS.md](KIDNEY_METHODS.md)) used the [UCI Chronic Kidney Disease dataset](https://archive.ics.uci.edu/dataset/336/chronic+kidney+disease) (Rubini et al., 2015; [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)). HealthNotes itself uses no patient dataset; its evaluation questions are fictional and were written by the authors with AI assistance.

**AI assistance.** ChatGPT/OpenAI Codex assisted with research, design, implementation, catalog/examples, tests and writing. Claude (Anthropic) helped check the published links, prepare the submission form and write this credits section. Aarjav must review and understand the work.

Project work began November 15 during the event. [Technical notes](TECHNICAL_NOTES.md) explain reproduction and history; [keyword](KEYWORD_HISTORY.md) and [kidney](KIDNEY_HISTORY.md) experiments are superseded in-event work. Old nine-topic counts are historical, not current performance. Next: independent relevance evaluation, consented usability testing and professional review.

**Submission plan: code and write-up, without a demo video. No hackathon form has been submitted by this assistant.**
