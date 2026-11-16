// Recorded outputs; see evaluation/semantic-results.json for provenance.
const HealthNotesRecordedResults={
  "model": "Xenova/all-MiniLM-L6-v2",
  "revision": "751bff37182d3f1213fa05d7196b954e230abad9",
  "runtime": "Transformers.js 3.0.0, WASM q8, mean pooling, normalized",
  "threshold": 0.3,
  "scope": "Synthetic educational retrieval only. Not medical accuracy; no independent or clinician validation.",
  "supportedCount": 18,
  "top1Correct": 18,
  "top3ContainsTarget": 17,
  "lexicalTop1Correct": 13,
  "ambiguousOrUnrelatedCount": 7,
  "ambiguousOrUnrelatedWithheld": 7,
  "rows": [
    {
      "query": "I am wiped out by the end of an ordinary day",
      "expected": "energy",
      "top1": "energy",
      "topScore": 0.14321118051796894,
      "offered": [],
      "top1Correct": true,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": "energy"
    },
    {
      "query": "I have no get up and go lately",
      "expected": "energy",
      "top1": "energy",
      "topScore": 0.3636834206170525,
      "offered": [
        "energy"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "sleep"
    },
    {
      "query": "My head keeps pounding in the afternoons",
      "expected": "headache",
      "top1": "headache",
      "topScore": 0.4611538293670062,
      "offered": [
        "headache",
        "energy"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "headache"
    },
    {
      "query": "There is a tight band of pain around my forehead",
      "expected": "headache",
      "top1": "headache",
      "topScore": 0.4936114665805154,
      "offered": [
        "headache"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "headache"
    },
    {
      "query": "My belly gets uncomfortable after dinner",
      "expected": "digestion",
      "top1": "digestion",
      "topScore": 0.520270917769574,
      "offered": [
        "digestion"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "digestion"
    },
    {
      "query": "I have trouble going to the toilet and feel bloated",
      "expected": "digestion",
      "top1": "digestion",
      "topScore": 0.36860252360593704,
      "offered": [
        "digestion"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "sleep"
    },
    {
      "query": "I keep hacking and clearing my throat",
      "expected": "cough",
      "top1": "cough",
      "topScore": 0.3474373213181833,
      "offered": [
        "cough"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "cough"
    },
    {
      "query": "This cough has been hanging around for weeks",
      "expected": "cough",
      "top1": "cough",
      "topScore": 0.4386096636765837,
      "offered": [
        "cough"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "cough"
    },
    {
      "query": "I lie awake for hours before drifting off",
      "expected": "sleep",
      "top1": "sleep",
      "topScore": 0.37123235512642583,
      "offered": [
        "sleep",
        "energy"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": null
    },
    {
      "query": "I wake up again and again through the night",
      "expected": "sleep",
      "top1": "sleep",
      "topScore": 0.3227519630808594,
      "offered": [
        "sleep"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "sleep"
    },
    {
      "query": "My thoughts keep racing about things that might go wrong",
      "expected": "stress",
      "top1": "stress",
      "topScore": 0.319215344385156,
      "offered": [
        "stress"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "stress"
    },
    {
      "query": "I feel on edge and cannot stop worrying",
      "expected": "stress",
      "top1": "stress",
      "topScore": 0.5103952832243598,
      "offered": [
        "stress"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": null
    },
    {
      "query": "My dad has diabetes and I wonder about a blood test",
      "expected": "diabetes",
      "top1": "diabetes",
      "topScore": 0.5950473422488941,
      "offered": [
        "diabetes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "diabetes"
    },
    {
      "query": "What is an A1C supposed to tell me",
      "expected": "diabetes",
      "top1": "diabetes",
      "topScore": 0.35019120665358067,
      "offered": [
        "diabetes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "diabetes"
    },
    {
      "query": "Where can I learn the warning signs of a heart attack",
      "expected": "heart",
      "top1": "heart",
      "topScore": 0.5097423076318313,
      "offered": [
        "heart",
        "stroke"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "heart"
    },
    {
      "query": "I want to ask about cardiovascular health",
      "expected": "heart",
      "top1": "heart",
      "topScore": 0.6474855420492013,
      "offered": [
        "heart",
        "stroke",
        "diabetes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "heart"
    },
    {
      "query": "What does FAST mean when learning about strokes",
      "expected": "stroke",
      "top1": "stroke",
      "topScore": 0.40339888188273576,
      "offered": [
        "stroke"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "headache"
    },
    {
      "query": "Where can I read about sudden one sided weakness and difficulty speaking",
      "expected": "stroke",
      "top1": "stroke",
      "topScore": 0.401848421700586,
      "offered": [
        "stroke",
        "sleep"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "stroke"
    },
    {
      "query": "How do I fix the wifi on my laptop",
      "expected": null,
      "top1": "digestion",
      "topScore": 0.035056965046033756,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "Can you solve my algebra homework",
      "expected": null,
      "top1": "stress",
      "topScore": 0.06798982440729619,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "What will the weather be tomorrow",
      "expected": null,
      "top1": "stress",
      "topScore": 0.12916062895440192,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I need directions to the library",
      "expected": null,
      "top1": "stroke",
      "topScore": 0.10942378499976595,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I feel weird",
      "expected": null,
      "top1": "stress",
      "topScore": 0.12527797212544495,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "Something does not seem right",
      "expected": null,
      "top1": "stress",
      "topScore": 0.1262832587651597,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I have a problem",
      "expected": null,
      "top1": "sleep",
      "topScore": 0.20897181280432608,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    }
  ]
}
;
