# HealthNotes technical notes

The active entry point is index.html. ConcernCatalog defines24 source-linked topics and168 authored manual-search aliases. concern-app.js coordinates user confirmation and visit notes; visit-features.js manages the agenda and export. semantic-client.js calls semantic-worker.js, which loads pinned MiniLM via Transformers.js3.0.0 and runs WASM q8 inference locally. Aliases are not neural-model training data or embedding inputs. SOURCE_CATALOG.md and evaluation/catalog-v2.json provide provenance.

## Reproduce current results

Run python serve.py and open http://127.0.0.1:8770/. In Model lab run the new60-question evaluation; it uses expanded-fixtures.js. Recorded outputs are evaluation/expanded-results.json and the matching expanded-recorded-results.js display artifact. Current raw47/48 versus lexical33/48; offered42/48;6misses;25non-target extras across16/48;0/12 vague/unrelated suggestions. No post-run tuning. See METHODS.md for limitations.

Run node tests/test-concern.cjs, node tests/test-evidence.cjs and node tests/test-expanded.cjs:59 assertions. These are engineering/provenance checks, not clinical tests or a rerun of the neural model. expand-catalog.py rebuilds current catalog data from the frozen original catalog plus authored expansion data.

## Historical artifacts

Original nine-topic catalog: evaluation/catalog-v1.json. Original25-query report: evaluation/semantic-results.json and recorded-results.js;17 historical-provenance and13 evidence checks preserve its numbers. The same original questions rerun against24 topics are saved separately in evaluation/expanded-regression.json. Different candidate catalogs/question sets are not a controlled accuracy comparison.

Superseded keyword files: visit-app.js, visit-match.js, visit-fixtures.js, visit-lab.js; see KEYWORD_HISTORY.md. Superseded kidney files: app.js, styles.css, inference.js, model.json, train.py and kidney evaluation artifacts; see KIDNEY_HISTORY.md. They are retained as in-event history, not active performance claims. Pre-event HealthScreen work is separate.

## Privacy and limitations

Network requests load static model/runtime assets; app code does not upload health text, save entries or add analytics. Context stays in notes; explicitly refining includes added detail in local inference. Asset caches can persist; clipboard/downloads/prints and browser-managed state are outside app control. A revision counter discards stale async output after edits or Clear. Render input with textContent. A fixed emergency notice is not an emergency-detection algorithm. No diagnosis, care-timing decision, treatment or disease-probability output.

## Submission state

Current write-up:WRITEUP.md; links:SUBMISSION.md. Participant chose no video. The hackathon form has not been submitted by this assistant. Aarjav must review and understand the work and provide email privately in the form.
