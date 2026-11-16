# HealthNotes semantic retrieval methods

## Task and intended workflow

Retrieve possible educational reading topics from an English description, require user confirmation, and organize user-authored visit notes. No diagnostic classification or medical urgency assessment. The authored prompts collect detail for notes, not a symptom differential. The catalog has nine topics with direct primary-source links. Heart/stroke cards are awareness information and do not substitute for emergency help. A fixed emergency notice remains visible regardless of model output; the model does not scan for emergency symptoms.

## Neural retrieval

Transformers.js 3.0.0 is imported inside a Web Worker from jsDelivr. Xenova/all-MiniLM-L6-v2 revision 751bff37182d3f1213fa05d7196b954e230abad9 uses the q8 ONNX model, WASM CPU backend, one thread. Feature extraction uses mean pooling and normalization. Both query and title-plus-text catalog strings become normalized 384-dimensional vectors; dot product is cosine similarity. Catalog embeddings are computed once per worker/catalog version. The encoder is pretrained; no project-specific fine-tuning occurred. It is not a medical language reasoning or generative model.

Ranking is descending cosine, up to three topics with score >=0.30. The cutoff was chosen as a demonstration heuristic before evaluation; no calibration or clinical meaning. No-match requests more detail/manual topic selection. Every match requires user confirmation before showing a source card; users can select no topic and still make notes. Refinement explicitly combines the concern with the person's added detail. Optional appointment context is not an embedding input. No shared-word explanation is claimed for embeddings.

## Evaluation integrity

concern-fixtures.js was frozen before the first semantic-model run: two author-labeled fictional descriptions for each of nine topics, four unrelated questions and three vague descriptions. Intended topic labels reflect the author's retrieval judgment, not patient conditions. The same file drives the browser evaluation and baseline. No fit/validation split because the project fits no model parameters and performs no threshold search. No changes to model revision, catalog, descriptions, labels or cutoff were made after observing evaluation. Further design changes would require a new independent evaluation set.

Browser inference gave intended raw top-1 rank 18/18, intended topic in offered top-three 17/18, versus TF-IDF top-1 baseline 13/18 on the same nine title/text documents. TF-IDF uses lowercase ASCII tokens, a small documented stop list, smoothed IDF and cosine similarity; no query-label fitting. All seven vague/unrelated descriptions fell below the cutoff. These denominators must be reported separately. Raw top-1 accuracy ignores withholding and is not the product success rate. The retained miss (wiped out by end of ordinary day) had raw energy similarity 0.143; no topic was offered. Alternative lists sometimes contain irrelevant topics. See evaluation/semantic-results.json. No prevalence, sensitivity, specificity, confidence intervals or clinical accuracy claims.

This test is tiny, synthetic, authored with the catalog by the same AI-assisted developer, and not independent or representative. No assessment of triage, diagnosis, negation, medication questions, mixed intent, multilingual use or demographic fairness. MiniLM can miss or misinterpret ordinary phrasing. Confirmation and manual browsing are workflow choices, not proven medical safeguards. Independent, consented relevance testing and clinician/user review remain future work.

## Engineering and privacy

Main-thread coordinator sends text only by postMessage to the local worker. Network requests load static library, tokenizer and model assets, never include health-text input. Asset caches may persist; no entered health text is written to storage, URLs, logs or analytics by app code. Source links use no-referrer. Browser/device-managed state is not controlled by the app. No API key, backend inference, camera or microphone. Worker/model failures provide manual browsing and notes rather than silently falling back to disease-biased keywords. file:// gets an explicit hosted-site/local-server instruction.

A revision counter invalidates pending results after edits, Clear, or manual browsing. Notes and agenda are removed on input changes. Rendering uses textContent. Downloads are created locally only on a user click. Model download/runtime loading can still fail or take minutes; a three-minute timeout returns a useful error. The runtime uses one WASM thread so cross-origin isolation/SharedArrayBuffer is not required.

node tests/test-concern.cjs runs 17 catalog/source integrity, fixture/result provenance, baseline, threshold-boundary and file-mode error assertions. Actual inference is tested by the browser Model lab. Historical tests and results for earlier in-event experiments remain separate; see KEYWORD_HISTORY.md and KIDNEY_HISTORY.md.

## Judge-facing evidence added November 15
The recorded-results panel summarizes the existing, unchanged evaluation JSON, without rerunning or tuning inference. Of 18 supported queries, one target was absent from the offered shortlist. Six suggestions differed from the author target, across five supported queries. None of seven vague/unrelated queries received a suggestion. A non-target suggestion is not independently labeled irrelevant and is not a clinical false positive. Per-topic counts use the same single-label assumption. Snapshot metrics are separated from live inference in the Model lab. Pretrained-model exposure to evaluation-like wording is unknown; no claim of pretraining disjointness is made.
