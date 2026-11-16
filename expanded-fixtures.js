(function(root){
// Frozen before first semantic-model evaluation. Synthetic, author-labeled, not patient data.
const cases=[
  [
    "I run out of steam doing ordinary chores",
    "energy"
  ],
  [
    "I feel exausted despite resting",
    "energy"
  ],
  [
    "An ache pounds behind my forehead",
    "headache"
  ],
  [
    "My head has been hurting off and on",
    "headache"
  ],
  [
    "My abdomen feels full of gas after lunch",
    "digestion"
  ],
  [
    "I have been having trouble moving my bowels",
    "digestion"
  ],
  [
    "A tickle keeps making me cough",
    "cough"
  ],
  [
    "I cannot shake this hacking sound from my chest",
    "cough"
  ],
  [
    "I cannot drift off when I go to bed",
    "sleep"
  ],
  [
    "I keep awakening long before morning",
    "sleep"
  ],
  [
    "I am constantly tense about what may happen",
    "stress"
  ],
  [
    "My worrying is getting in the way of daily life",
    "stress"
  ],
  [
    "I want to understand a test for high blood glucose",
    "diabetes"
  ],
  [
    "Does having a diabetic parent mean I should ask about testing",
    "diabetes"
  ],
  [
    "I want educational information about heart attack warnings",
    "heart"
  ],
  [
    "What should I ask at a checkup about my heart health",
    "heart"
  ],
  [
    "I am researching how to recognize stroke warnings",
    "stroke"
  ],
  [
    "I want to learn about a face drooping during a stroke",
    "stroke"
  ],
  [
    "The surroundings seem to whirl when I move",
    "dizziness"
  ],
  [
    "I feel unsteady like I might topple over",
    "dizziness"
  ],
  [
    "My lower spine hurts after sitting at my desk",
    "back"
  ],
  [
    "I wake up with stiffness across my back",
    "back"
  ],
  [
    "My fingers feel stiff when I try to bend them",
    "joints"
  ],
  [
    "An ache in my knees makes walking uncomfortable",
    "joints"
  ],
  [
    "I have patches on my arm that I keep scratching",
    "skin"
  ],
  [
    "Small red bumps have appeared on my skin",
    "skin"
  ],
  [
    "It stings when I pass water",
    "urinary"
  ],
  [
    "I am leaking a little urine before reaching the bathroom",
    "urinary"
  ],
  [
    "The thermometer shows a higher reading than normal",
    "fever"
  ],
  [
    "I feel hot and shivery and want to discuss my temperature",
    "fever"
  ],
  [
    "Every spring pollen makes me sneeze",
    "allergy"
  ],
  [
    "Being near cats makes my nose run and my eyes water",
    "allergy"
  ],
  [
    "Sounds are muffled through one of my ears",
    "ears"
  ],
  [
    "There is a ringing noise inside my ear",
    "ears"
  ],
  [
    "Words on a page are not clear to my eyes anymore",
    "eyes"
  ],
  [
    "My eyes feel dry and irritated",
    "eyes"
  ],
  [
    "A cold drink makes one tooth hurt",
    "teeth"
  ],
  [
    "One of my teeth aches when I chew",
    "teeth"
  ],
  [
    "My monthly bleeding is no longer regular",
    "periods"
  ],
  [
    "I want to ask about cramps during my menstrual cycle",
    "periods"
  ],
  [
    "My trousers are getting loose although I have not tried to slim down",
    "weight"
  ],
  [
    "The number on the scale keeps dropping without dieting",
    "weight"
  ],
  [
    "I want to ask a pharmacist about a possible unwanted effect of my tablets",
    "medicines"
  ],
  [
    "I need help preparing questions about my prescription instructions",
    "medicines"
  ],
  [
    "My throat feels raw when I swallow food",
    "throat"
  ],
  [
    "There is a scratchy painful feeling in my throat",
    "throat"
  ],
  [
    "My fingertips feel like little electric prickles",
    "tingling"
  ],
  [
    "My foot has a pins and needles sensation",
    "tingling"
  ],
  [
    "Where can I buy a cheap laptop",
    null
  ],
  [
    "Can you help me write a school essay",
    null
  ],
  [
    "How do I repair a leaking kitchen tap",
    null
  ],
  [
    "What is the score of the basketball game",
    null
  ],
  [
    "Please translate this shopping list into French",
    null
  ],
  [
    "How do I change my email password",
    null
  ],
  [
    "I want directions to the train station",
    null
  ],
  [
    "What is the best recipe for a birthday cake",
    null
  ],
  [
    "I feel different",
    null
  ],
  [
    "Something is up",
    null
  ],
  [
    "I cannot explain what is wrong",
    null
  ],
  [
    "I need some help",
    null
  ]
];
const threshold=0.30;
function lexical(query,topics){const tokenize=s=>(s.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(w=>!new Set('i a the and my to of in is do what how can about for it have'.split(' ')).has(w));const docs=topics.map(t=>tokenize(t.title+' '+t.text));const vocab=[...new Set(docs.flat())];const idf=Object.fromEntries(vocab.map(w=>[w,Math.log((1+docs.length)/(1+docs.filter(d=>d.includes(w)).length))+1]));const vector=words=>{const v=Object.create(null);for(const w of words)if(Object.hasOwn(idf,w))v[w]=(v[w]||0)+1;for(const w in v)v[w]*=idf[w];const norm=Math.hypot(...Object.values(v));if(norm)for(const w in v)v[w]/=norm;return v;};const q=vector(tokenize(query));return docs.map((d,i)=>{const v=vector(d);return {id:topics[i].id,score:Object.keys(q).reduce((s,w)=>s+q[w]*(v[w]||0),0)};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);}
function summarize(results,topics){const rows=cases.map(([query,expected],i)=>{const ranked=results[i];const offered=ranked.filter(x=>x.score>=threshold).slice(0,3);const baseline=lexical(query,topics);return {query,expected,top1:ranked[0]?.id||null,topScore:ranked[0]?.score||0,offered:offered.map(x=>x.id),top1Correct:expected?ranked[0]?.id===expected:null,top3ContainsTarget:expected?offered.some(x=>x.id===expected):null,withheld:!offered.length,lexicalTop1:baseline[0]?.id||null};});const supported=rows.filter(x=>x.expected);const outside=rows.filter(x=>!x.expected);return {catalogVersion:'24-topics-v2',dataset:'60 newly authored synthetic English queries; 48 supported, 12 unrelated or unclear; frozen before first expanded run',model:'Xenova/all-MiniLM-L6-v2',revision:'751bff37182d3f1213fa05d7196b954e230abad9',runtime:'Transformers.js 3.0.0, WASM q8, mean pooling, normalized',threshold,scope:'Synthetic educational retrieval only. Not medical accuracy; no independent or clinician validation.',supportedCount:supported.length,top1Correct:supported.filter(x=>x.top1Correct).length,top3ContainsTarget:supported.filter(x=>x.top3ContainsTarget).length,lexicalTop1Correct:supported.filter(x=>x.lexicalTop1===x.expected).length,ambiguousOrUnrelatedCount:outside.length,ambiguousOrUnrelatedWithheld:outside.filter(x=>x.withheld).length,rows};}
const api={cases,threshold,summarize,lexical};if(typeof module==='object'&&module.exports)module.exports=api;else root.ExpandedFixtures=api;
})(typeof globalThis!=='undefined'?globalThis:this);
