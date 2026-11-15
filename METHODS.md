# HealthNotes retrieval methods

Catalog: three authored English topic documents (title plus explicitly listed vocabulary in visit-match.js). Educational card text is separately authored from cited NIDDK sources, not scraped patient data. NIDDK does not endorse this app.

Tokenization: lowercase ASCII alphanumeric tokens; fixed stop-word list. Raw term frequency multiplied by smoothed inverse document frequency log((1+3)/(1+document frequency))+1. L2 normalize document and query vectors; rank cosine dot products descending. Ignore words outside the catalog vocabulary. Return no matches for zero overlap. No fitted probability, synonym engine, medical rules, clinical classifier, or urgency threshold. Ties follow catalog order. UI shows at most two topics but evaluation uses the first.

Fitting uses only the three catalog documents; no query labels are used for fitting. Model design and vocabulary were fixed before running tests/visit-benchmark.cjs. Evaluation is a single authored 15-query set with one author-assigned target topic per query, balanced five per class. It is not an independently authored test or representative dataset. There is no validation split or parameter search. No vocabulary changes were made after seeing the errors.

Metric: count top-1 exact topic matches, counting abstentions as failures. 12/15 vs 5/15 always-symptoms baseline. All three failures are no-overlap abstentions. No confidence intervals or clinical sensitivity/specificity are claimed from this tiny synthetic set. Edge checks cover empty text, non-English text, markup-like input, capitalization and stop words. DOM rendering uses textContent so user text is not interpreted as HTML.

Limits: lexical overlap can misread negation and unrelated uses of shared words; the benchmark has no robust out-of-scope, mixed-intent, spelling, demographic or language evaluation. A zero match cannot rule anything out. Matched information must never determine care timing. The optional context and timing fields are notes only, not clinical features. Medical content is not clinician-reviewed. This prototype is not medical advice.

The kidney files are archived history: see KIDNEY_HISTORY.md and KIDNEY_METHODS.md. They are not loaded by HealthNotes and their classification metrics do not apply to retrieval.
