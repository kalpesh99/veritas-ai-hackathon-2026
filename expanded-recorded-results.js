// Actual browser inference; full provenance: evaluation/expanded-results.json
const ExpandedRecordedResults={
  "catalogVersion": "24-topics-v2",
  "dataset": "60 newly authored synthetic English queries; 48 supported, 12 unrelated or unclear; frozen before first expanded run",
  "model": "Xenova/all-MiniLM-L6-v2",
  "revision": "751bff37182d3f1213fa05d7196b954e230abad9",
  "runtime": "Transformers.js 3.0.0, WASM q8, mean pooling, normalized",
  "threshold": 0.3,
  "scope": "Synthetic educational retrieval only. Not medical accuracy; no independent or clinician validation.",
  "supportedCount": 48,
  "top1Correct": 47,
  "top3ContainsTarget": 42,
  "lexicalTop1Correct": 33,
  "ambiguousOrUnrelatedCount": 12,
  "ambiguousOrUnrelatedWithheld": 12,
  "rows": [
    {
      "query": "I run out of steam doing ordinary chores",
      "expected": "energy",
      "top1": "energy",
      "topScore": 0.2106875414663728,
      "offered": [],
      "top1Correct": true,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": "energy"
    },
    {
      "query": "I feel exausted despite resting",
      "expected": "energy",
      "top1": "energy",
      "topScore": 0.5659438878583615,
      "offered": [
        "energy",
        "back"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "energy"
    },
    {
      "query": "An ache pounds behind my forehead",
      "expected": "headache",
      "top1": "headache",
      "topScore": 0.4761249173713789,
      "offered": [
        "headache",
        "energy",
        "dizziness"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "diabetes"
    },
    {
      "query": "My head has been hurting off and on",
      "expected": "headache",
      "top1": "headache",
      "topScore": 0.5050121137471386,
      "offered": [
        "headache"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "headache"
    },
    {
      "query": "My abdomen feels full of gas after lunch",
      "expected": "digestion",
      "top1": "digestion",
      "topScore": 0.4126831333486111,
      "offered": [
        "digestion"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "digestion"
    },
    {
      "query": "I have been having trouble moving my bowels",
      "expected": "digestion",
      "top1": "digestion",
      "topScore": 0.2113623729040375,
      "offered": [],
      "top1Correct": true,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": "sleep"
    },
    {
      "query": "A tickle keeps making me cough",
      "expected": "cough",
      "top1": "cough",
      "topScore": 0.40919144425323406,
      "offered": [
        "cough"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "cough"
    },
    {
      "query": "I cannot shake this hacking sound from my chest",
      "expected": "cough",
      "top1": "cough",
      "topScore": 0.22531890857038195,
      "offered": [],
      "top1Correct": true,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": "heart"
    },
    {
      "query": "I cannot drift off when I go to bed",
      "expected": "sleep",
      "top1": "sleep",
      "topScore": 0.3746400640119281,
      "offered": [
        "sleep"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "dizziness"
    },
    {
      "query": "I keep awakening long before morning",
      "expected": "sleep",
      "top1": "sleep",
      "topScore": 0.29869510775967945,
      "offered": [],
      "top1Correct": true,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I am constantly tense about what may happen",
      "expected": "stress",
      "top1": "stress",
      "topScore": 0.3228506256446817,
      "offered": [
        "stress"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "stress"
    },
    {
      "query": "My worrying is getting in the way of daily life",
      "expected": "stress",
      "top1": "stress",
      "topScore": 0.49114277827765995,
      "offered": [
        "stress"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "energy"
    },
    {
      "query": "I want to understand a test for high blood glucose",
      "expected": "diabetes",
      "top1": "diabetes",
      "topScore": 0.5248458829172851,
      "offered": [
        "diabetes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "diabetes"
    },
    {
      "query": "Does having a diabetic parent mean I should ask about testing",
      "expected": "diabetes",
      "top1": "diabetes",
      "topScore": 0.5889986657445851,
      "offered": [
        "diabetes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "medicines"
    },
    {
      "query": "I want educational information about heart attack warnings",
      "expected": "heart",
      "top1": "heart",
      "topScore": 0.5889691051353791,
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
      "query": "What should I ask at a checkup about my heart health",
      "expected": "heart",
      "top1": "heart",
      "topScore": 0.6526176609506373,
      "offered": [
        "heart",
        "diabetes",
        "medicines"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "heart"
    },
    {
      "query": "I am researching how to recognize stroke warnings",
      "expected": "stroke",
      "top1": "stroke",
      "topScore": 0.7424559632132107,
      "offered": [
        "stroke",
        "eyes",
        "dizziness"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "stroke"
    },
    {
      "query": "I want to learn about a face drooping during a stroke",
      "expected": "stroke",
      "top1": "stroke",
      "topScore": 0.5781378532996067,
      "offered": [
        "stroke",
        "eyes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "stroke"
    },
    {
      "query": "The surroundings seem to whirl when I move",
      "expected": "dizziness",
      "top1": "dizziness",
      "topScore": 0.3643193078147654,
      "offered": [
        "dizziness"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "headache"
    },
    {
      "query": "I feel unsteady like I might topple over",
      "expected": "dizziness",
      "top1": "dizziness",
      "topScore": 0.4189526838940685,
      "offered": [
        "dizziness"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "dizziness"
    },
    {
      "query": "My lower spine hurts after sitting at my desk",
      "expected": "back",
      "top1": "back",
      "topScore": 0.47423166577024534,
      "offered": [
        "back",
        "joints"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "back"
    },
    {
      "query": "I wake up with stiffness across my back",
      "expected": "back",
      "top1": "back",
      "topScore": 0.5143252330316445,
      "offered": [
        "back",
        "sleep",
        "joints"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "back"
    },
    {
      "query": "My fingers feel stiff when I try to bend them",
      "expected": "joints",
      "top1": "joints",
      "topScore": 0.49065922908843634,
      "offered": [
        "joints",
        "tingling"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "joints"
    },
    {
      "query": "An ache in my knees makes walking uncomfortable",
      "expected": "joints",
      "top1": "joints",
      "topScore": 0.4835560594844672,
      "offered": [
        "joints",
        "back"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "joints"
    },
    {
      "query": "I have patches on my arm that I keep scratching",
      "expected": "skin",
      "top1": "skin",
      "topScore": 0.31481808566585745,
      "offered": [
        "skin"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "stress"
    },
    {
      "query": "Small red bumps have appeared on my skin",
      "expected": "skin",
      "top1": "skin",
      "topScore": 0.4780812506453299,
      "offered": [
        "skin"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "skin"
    },
    {
      "query": "It stings when I pass water",
      "expected": "urinary",
      "top1": "ears",
      "topScore": 0.2659860799907782,
      "offered": [],
      "top1Correct": false,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": "headache"
    },
    {
      "query": "I am leaking a little urine before reaching the bathroom",
      "expected": "urinary",
      "top1": "urinary",
      "topScore": 0.38539373481631295,
      "offered": [
        "urinary"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "urinary"
    },
    {
      "query": "The thermometer shows a higher reading than normal",
      "expected": "fever",
      "top1": "fever",
      "topScore": 0.3072058823491964,
      "offered": [
        "fever"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": null
    },
    {
      "query": "I feel hot and shivery and want to discuss my temperature",
      "expected": "fever",
      "top1": "fever",
      "topScore": 0.587378932571145,
      "offered": [
        "fever",
        "energy",
        "teeth"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "fever"
    },
    {
      "query": "Every spring pollen makes me sneeze",
      "expected": "allergy",
      "top1": "allergy",
      "topScore": 0.47109158752706526,
      "offered": [
        "allergy"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "allergy"
    },
    {
      "query": "Being near cats makes my nose run and my eyes water",
      "expected": "allergy",
      "top1": "allergy",
      "topScore": 0.4008942177300082,
      "offered": [
        "allergy"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "allergy"
    },
    {
      "query": "Sounds are muffled through one of my ears",
      "expected": "ears",
      "top1": "ears",
      "topScore": 0.4366920033063956,
      "offered": [
        "ears"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "ears"
    },
    {
      "query": "There is a ringing noise inside my ear",
      "expected": "ears",
      "top1": "ears",
      "topScore": 0.5085736158269645,
      "offered": [
        "ears"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "ears"
    },
    {
      "query": "Words on a page are not clear to my eyes anymore",
      "expected": "eyes",
      "top1": "eyes",
      "topScore": 0.32076251133352385,
      "offered": [
        "eyes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "allergy"
    },
    {
      "query": "My eyes feel dry and irritated",
      "expected": "eyes",
      "top1": "eyes",
      "topScore": 0.5213733178445454,
      "offered": [
        "eyes",
        "allergy",
        "energy"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "eyes"
    },
    {
      "query": "A cold drink makes one tooth hurt",
      "expected": "teeth",
      "top1": "teeth",
      "topScore": 0.5375561637955083,
      "offered": [
        "teeth"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "teeth"
    },
    {
      "query": "One of my teeth aches when I chew",
      "expected": "teeth",
      "top1": "teeth",
      "topScore": 0.4731754026077456,
      "offered": [
        "teeth"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "teeth"
    },
    {
      "query": "My monthly bleeding is no longer regular",
      "expected": "periods",
      "top1": "periods",
      "topScore": 0.1881583050642293,
      "offered": [],
      "top1Correct": true,
      "top3ContainsTarget": false,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I want to ask about cramps during my menstrual cycle",
      "expected": "periods",
      "top1": "periods",
      "topScore": 0.6664949130552306,
      "offered": [
        "periods",
        "teeth"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "periods"
    },
    {
      "query": "My trousers are getting loose although I have not tried to slim down",
      "expected": "weight",
      "top1": "weight",
      "topScore": 0.4011847113383058,
      "offered": [
        "weight"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": null
    },
    {
      "query": "The number on the scale keeps dropping without dieting",
      "expected": "weight",
      "top1": "weight",
      "topScore": 0.5006624808109066,
      "offered": [
        "weight"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "weight"
    },
    {
      "query": "I want to ask a pharmacist about a possible unwanted effect of my tablets",
      "expected": "medicines",
      "top1": "medicines",
      "topScore": 0.5879440341002885,
      "offered": [
        "medicines",
        "eyes",
        "urinary"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "medicines"
    },
    {
      "query": "I need help preparing questions about my prescription instructions",
      "expected": "medicines",
      "top1": "medicines",
      "topScore": 0.6324958207316327,
      "offered": [
        "medicines",
        "diabetes",
        "eyes"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "medicines"
    },
    {
      "query": "My throat feels raw when I swallow food",
      "expected": "throat",
      "top1": "throat",
      "topScore": 0.4683742950351069,
      "offered": [
        "throat"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "throat"
    },
    {
      "query": "There is a scratchy painful feeling in my throat",
      "expected": "throat",
      "top1": "throat",
      "topScore": 0.5580463508996685,
      "offered": [
        "throat",
        "teeth",
        "cough"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "throat"
    },
    {
      "query": "My fingertips feel like little electric prickles",
      "expected": "tingling",
      "top1": "tingling",
      "topScore": 0.49567734112684186,
      "offered": [
        "tingling"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": null
    },
    {
      "query": "My foot has a pins and needles sensation",
      "expected": "tingling",
      "top1": "tingling",
      "topScore": 0.6441132304570971,
      "offered": [
        "tingling"
      ],
      "top1Correct": true,
      "top3ContainsTarget": true,
      "withheld": false,
      "lexicalTop1": "tingling"
    },
    {
      "query": "Where can I buy a cheap laptop",
      "expected": null,
      "top1": "sleep",
      "topScore": 0.07540443492254159,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "Can you help me write a school essay",
      "expected": null,
      "top1": "ears",
      "topScore": 0.14499898632642622,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "How do I repair a leaking kitchen tap",
      "expected": null,
      "top1": "joints",
      "topScore": 0.05717425818862248,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "What is the score of the basketball game",
      "expected": null,
      "top1": "energy",
      "topScore": 0.029756286514302593,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "Please translate this shopping list into French",
      "expected": null,
      "top1": "digestion",
      "topScore": 0.07421155774753693,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "How do I change my email password",
      "expected": null,
      "top1": "sleep",
      "topScore": 0.0315921455659115,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": "skin"
    },
    {
      "query": "I want directions to the train station",
      "expected": null,
      "top1": "medicines",
      "topScore": 0.08683749573560576,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "What is the best recipe for a birthday cake",
      "expected": null,
      "top1": "digestion",
      "topScore": 0.03405447400976437,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I feel different",
      "expected": null,
      "top1": "energy",
      "topScore": 0.23691050007015577,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "Something is up",
      "expected": null,
      "top1": "fever",
      "topScore": 0.16754533211298817,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": "sleep"
    },
    {
      "query": "I cannot explain what is wrong",
      "expected": null,
      "top1": "sleep",
      "topScore": 0.1722745269696812,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    },
    {
      "query": "I need some help",
      "expected": null,
      "top1": "digestion",
      "topScore": 0.08396003413216536,
      "offered": [],
      "top1Correct": null,
      "top3ContainsTarget": null,
      "withheld": true,
      "lexicalTop1": null
    }
  ]
};
