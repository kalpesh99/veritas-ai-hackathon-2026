(function(root){
 'use strict';
 const base='https://www.niddk.nih.gov/health-information/diabetes/overview/';
 const topics=[
 {id:'symptoms',title:'Changes you have noticed',url:base+'symptoms-causes',description:'Diabetes can cause increased thirst, frequent urination, tiredness and vision changes. These symptoms can have other causes too. Discuss new or persistent changes with a health professional.',question:'Could these changes need diabetes testing or another explanation?',terms:'symptoms signs causes thirsty thirst drinking water urinate urination pee bathroom tired fatigue exhausted blurry blurred vision weight loss hungry hunger tingling numb feet changes noticed'},
 {id:'testing',title:'Understanding diabetes testing',url:base+'tests-diagnosis',description:'A health professional uses blood tests to diagnose diabetes. A home glucose meter cannot establish a diagnosis. Ask which test is appropriate and whether a result needs confirmation.',question:'Which test would be appropriate, and what would the result mean?',terms:'tests testing diagnosis diagnose screening blood glucose sugar A1C HbA1c fasting random oral tolerance results confirm prediabetes family history risk parent mother father brother sister appointment check tested'},
 {id:'management',title:'Questions about living with diabetes',url:base+'managing-diabetes',description:'Diabetes care is planned with a health care team. Bring questions about medicines, glucose monitoring and daily routines to that conversation. This app cannot recommend treatment changes.',question:'What should I ask my care team about my daily diabetes plan?',terms:'management managing living diabetes diagnosed treatment medicine medication insulin prescription dose monitoring monitor meals food diet eating activity exercise walking routine care team goals plan stress sleep'}
 ];
 const stop=new Set('a an and are as at be been but by can could do does for from have how i if in is it me my of on or should that the their this to was what when which with would you your'.split(' '));
 function tokens(s){return (String(s).toLowerCase().match(/[a-z0-9]+/g)||[]).filter(t=>!stop.has(t));}
 const bags=topics.map(t=>tokens(t.title+' '+t.terms));
 const vocabulary=[...new Set(bags.flat())].sort();
 const idf=Object.fromEntries(vocabulary.map(w=>[w,Math.log((1+topics.length)/(1+bags.filter(b=>b.includes(w)).length))+1]));
 function vector(words){const v=Object.create(null);for(const w of words)if(Object.hasOwn(idf,w))v[w]=(v[w]||0)+1;for(const w in v)v[w]*=idf[w];const n=Math.hypot(...Object.values(v));if(n)for(const w in v)v[w]/=n;return v;}
 const docs=bags.map(vector);
 function match(query){const q=vector(tokens(query));return topics.map((t,i)=>({...t,similarity:Object.keys(q).reduce((s,w)=>s+q[w]*(docs[i][w]||0),0)})).filter(t=>t.similarity>0).sort((a,b)=>b.similarity-a.similarity);}
 function explain(query,topicId){const words=[...new Set(tokens(query))];const index=topics.findIndex(t=>t.id===topicId);const q=vector(tokens(query));return {matched:words.filter(w=>index>=0&&q[w]&&docs[index][w]),unrecognized:words.filter(w=>!Object.hasOwn(idf,w)),recognized:words.filter(w=>Object.hasOwn(idf,w))};}
 const api={topics,match,tokens,explain};if(typeof module==='object'&&module.exports)module.exports=api;else root.VisitMatch=api;
})(typeof globalThis!=='undefined'?globalThis:this);
