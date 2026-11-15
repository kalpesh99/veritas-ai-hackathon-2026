(function(root){
// Frozen before first semantic-model evaluation. Synthetic, author-labeled, not patient data.
const cases=[
 ['I am wiped out by the end of an ordinary day','energy'],['I have no get up and go lately','energy'],
 ['My head keeps pounding in the afternoons','headache'],['There is a tight band of pain around my forehead','headache'],
 ['My belly gets uncomfortable after dinner','digestion'],['I have trouble going to the toilet and feel bloated','digestion'],
 ['I keep hacking and clearing my throat','cough'],['This cough has been hanging around for weeks','cough'],
 ['I lie awake for hours before drifting off','sleep'],['I wake up again and again through the night','sleep'],
 ['My thoughts keep racing about things that might go wrong','stress'],['I feel on edge and cannot stop worrying','stress'],
 ['My dad has diabetes and I wonder about a blood test','diabetes'],['What is an A1C supposed to tell me','diabetes'],
 ['Where can I learn the warning signs of a heart attack','heart'],['I want to ask about cardiovascular health','heart'],
 ['What does FAST mean when learning about strokes','stroke'],['Where can I read about sudden one sided weakness and difficulty speaking','stroke'],
 ['How do I fix the wifi on my laptop',null],['Can you solve my algebra homework',null],['What will the weather be tomorrow',null],['I need directions to the library',null],
 ['I feel weird',null],['Something does not seem right',null],['I have a problem',null]
];
const threshold=0.30;
function lexical(query,topics){const tokenize=s=>(s.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(w=>!new Set('i a the and my to of in is do what how can about for it have'.split(' ')).has(w));const docs=topics.map(t=>tokenize(t.title+' '+t.text));const vocab=[...new Set(docs.flat())];const idf=Object.fromEntries(vocab.map(w=>[w,Math.log((1+docs.length)/(1+docs.filter(d=>d.includes(w)).length))+1]));const vector=words=>{const v=Object.create(null);for(const w of words)if(Object.hasOwn(idf,w))v[w]=(v[w]||0)+1;for(const w in v)v[w]*=idf[w];const norm=Math.hypot(...Object.values(v));if(norm)for(const w in v)v[w]/=norm;return v;};const q=vector(tokenize(query));return docs.map((d,i)=>{const v=vector(d);return {id:topics[i].id,score:Object.keys(q).reduce((s,w)=>s+q[w]*(v[w]||0),0)};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);}
function summarize(results,topics){const rows=cases.map(([query,expected],i)=>{const ranked=results[i];const offered=ranked.filter(x=>x.score>=threshold).slice(0,3);const baseline=lexical(query,topics);return {query,expected,top1:ranked[0]?.id||null,topScore:ranked[0]?.score||0,offered:offered.map(x=>x.id),top1Correct:expected?ranked[0]?.id===expected:null,top3ContainsTarget:expected?offered.some(x=>x.id===expected):null,withheld:!offered.length,lexicalTop1:baseline[0]?.id||null};});const supported=rows.filter(x=>x.expected);const outside=rows.filter(x=>!x.expected);return {model:'Xenova/all-MiniLM-L6-v2',revision:'751bff37182d3f1213fa05d7196b954e230abad9',runtime:'Transformers.js 3.0.0, WASM q8, mean pooling, normalized',threshold,scope:'Synthetic educational retrieval only. Not medical accuracy; no independent or clinician validation.',supportedCount:supported.length,top1Correct:supported.filter(x=>x.top1Correct).length,top3ContainsTarget:supported.filter(x=>x.top3ContainsTarget).length,lexicalTop1Correct:supported.filter(x=>x.lexicalTop1===x.expected).length,ambiguousOrUnrelatedCount:outside.length,ambiguousOrUnrelatedWithheld:outside.filter(x=>x.withheld).length,rows};}
const api={cases,threshold,summarize,lexical};if(typeof module==='object'&&module.exports)module.exports=api;else root.ConcernFixtures=api;
})(typeof globalThis!=='undefined'?globalThis:this);
