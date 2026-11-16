# HealthNotes: two-minute judge demo

Record fictional information only. Open the live app and warm up the model before recording. The video is optional; if recorded, upload it as an unlisted YouTube video or a viewable Google Drive link. This outline is not a completed video.

**0:00–0:15 — User and problem.** “I’m Aarjav. HealthNotes is for an adult at home preparing a non-emergency appointment. People know what feels different but may not know the medical search terms. We help them organize their own concerns, not diagnose them.”

**0:15–0:50 — Real input to real output.** Type “I have no get up and go lately”, run suggestions, and confirm the energy reading topic. Explain: “A pretrained MiniLM encoder compares sentence meaning locally. I must choose the topic; the app does not tell me which disease I have.” Add fictional duration/context and make visit notes.

**0:50–1:10 — Useful output.** Add “What information should I track before our appointment?” to the agenda and show Download notes. Briefly show Browse all topics: model failure does not block visit preparation. Explain that the follow-up prompt is authored, not a medical AI interview.

**1:10–1:40 — Fair comparison and retained failure.** Show the recorded results section: same-task raw top-1 18/18 versus TF-IDF 13/18; actual offered target 17/18 after cutoff; one missed reading topic; six non-target extras; no suggestions for seven vague/unrelated descriptions. Show the “wiped out” failure and its 0.143 score. “These are 25 fictional author-labeled examples, not clinical accuracy or independent validation.” The Model lab can rerun inference; first-use downloads may take minutes.

**1:40–2:00 — Limits, contribution and next step.** “We built the local retrieval, confirmation, manual fallback and notes workflow during the event, with AI coding assistance. The encoder is pretrained, not our trained medical model. English only, nine topics, no diagnosis or urgency assessment. Next I’d collect independently labeled relevance tests and conduct consented usability and professional review.”

Before submitting, check code and README links without signing in. Submit exactly one project in AI + Health; list Aarjav Vaghasiya, LASA High School, and the correct email on the form. Deadline in the supplied brief: November 15 at 11:59 PM Eastern / 10:59 PM Central.

Be ready to explain: normalized embeddings; cosine similarity; why top-1 and shortlist metrics differ; the unvalidated cutoff; why extra topics are not clinical false alarms; the retained miss; model-download versus health-text privacy; and what Clear does during pending inference. No claims that this prevents illness, guarantees understanding, or improves patient outcomes have been validated.

## Current expansion update

The deployed catalog is now24 topics and168 searchable authored phrases. Demonstrate Browse all topics → search “pins and needles” or “dizzyness”, then select the matching reference yourself. Model lab's current60-query results: raw47/48 vs baseline33/48; target offered42/48;6misses;25extra non-target suggestions across16/48;0/12 vague/unrelated suggestions. Do not present the older18/18/17/18 counts as current results. Mention retained failures and that reference pages/aliases are not patient training data or medical validation. No new claim about clinical safety or winning.
