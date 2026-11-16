# HealthNotes

**Track:** AI + Health · **Team:** Aarjav Vaghasiya, LASA High School

[Try the live app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Code](https://github.com/kalpesh99/veritas-ai-hackathon-2026) · [Two-minute demo outline](DEMO.md)

**This project is a prototype and is not medical advice.**

## The problem

An adult at home preparing a non-emergency appointment may know what feels different without knowing the medical words to search for. HealthNotes helps that person find educational reading and organize their own questions for a health professional. It does not diagnose, assess urgency, recommend treatment or give disease percentages.

## What we built

An everyday English description goes in. A local AI model offers possible reading topics; the person confirms one, rejects them, or browses manually. Optional context and authored follow-up prompts help create prioritized, printable, copyable or downloadable visit notes. Nine topics include energy, headache, digestion, cough, sleep, worry, diabetes testing, heart information and stroke awareness. The app never automatically decides what condition the person has.

## What we added

**Our own idea:** meaning-based retrieval with human confirmation and a personal appointment agenda. An earlier in-event diabetes keyword prototype failed on broader concerns; we replaced that approach rather than adding more disease-biased checkboxes. Our experimental question is whether sentence embeddings retrieve intended reading topics that a word-based baseline misses.

## How it works

MiniLM produces normalized sentence embeddings; cosine similarity ranks nine authored topic descriptions. Up to three topics pass a fixed, unvalidated 0.30 cutoff. No project model training or fine-tuning occurred. Text stays in a browser worker; runtime/model files download on first use. Manual browsing and notes work if AI fails. Entries are not saved by the app. Evaluation uses 25 frozen, fictional, author-labeled descriptions, not patient records. They were not used for project training or tuning; exposure during the pretrained model's original training is unknown.

## Results and failures

Same-task top-1 ranking on 18 supported descriptions: **MiniLM 18/18; TF-IDF baseline 13/18**. After the cutoff, the intended topic was actually offered in **17/18**, with **1 missed target**. There were **6 non-target suggestions across 5/18 descriptions**; these differ from the single author label and may still be relevant. **0/7 vague/unrelated descriptions received suggestions.** These are retrieval counts, not disease false negatives, clinical false positives or medical accuracy.

Retained failure: “I am wiped out by the end of an ordinary day” scored 0.143 for energy, below the cutoff, so it received no topic. The tiny synthetic test is not independent, representative or clinician-validated. No demographic fairness or actual benefit to patients has been established. [All outputs](evaluation/semantic-results.json) · [Methods](METHODS.md). No tuning followed these results.

## What we'd do next

Use independently labeled everyday descriptions and measure irrelevant suggestions, abstentions and performance across language styles. Conduct consented usability testing and professional review before any health-use claims. Impact is a proposed improvement to appointment preparation, not a measured medical outcome.

## Sources and credits

Educational sources: [MedlinePlus](https://medlineplus.gov/) (six topics), [NIDDK diabetes testing](https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis), [CDC heart attack](https://www.cdc.gov/heart-disease/about/heart-attack.html), [CDC stroke](https://www.cdc.gov/stroke/signs-symptoms/index.html). Full links are in [the catalog](concern-catalog.js).

Model: [Xenova/all-MiniLM-L6-v2, Apache 2.0](https://huggingface.co/Xenova/all-MiniLM-L6-v2), pinned revision `751bff37182d3f1213fa05d7196b954e230abad9`; [Sentence Transformers](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2); [Transformers.js 3.0.0](https://huggingface.co/docs/transformers.js); [ONNX Runtime](https://onnxruntime.ai/). ChatGPT / OpenAI Codex assisted with implementation, catalog/examples, research, testing and writing. Aarjav must review and be able to explain the work.

Project work began November 15 during the event; no pre-event HealthScreen code/models were imported. [Earlier experiments](KEYWORD_HISTORY.md) · [Technical details and reproduction](TECHNICAL_NOTES.md). Run `node tests/test-concern.cjs` and `node tests/test-evidence.cjs`; actual neural inference is in the browser Model lab.
