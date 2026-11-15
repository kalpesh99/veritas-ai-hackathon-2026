// Frozen authored synthetic queries, not patient data. No tuning on these results.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {match}=require('../visit-match.js');
const cases=[
 ['I am drinking water all the time','symptoms'],
 ['My vision is blurry lately','symptoms'],
 ['I keep getting up to pee','symptoms'],
 ['I feel exhausted and hungry','symptoms'],
 ['Can a home glucose meter diagnose me?','testing'],
 ['What does an HbA1c result mean?','testing'],
 ['My mother has diabetes should I get screened?','testing'],
 ['Do I need to fast before a blood test?','testing'],
 ['What should I ask about my insulin prescription?','management'],
 ['How do I plan my meals?','management'],
 ['Can I talk to my care team about exercise?','management'],
 ['I was diagnosed and want a daily routine','management'],
 ['Why am I feeling washed out lately?','symptoms'],
 ['What should I eat for supper?','management'],
 ['Can heredity matter?','testing']
];
let checks=0;function check(fn){fn();checks++;}
check(()=>assert.equal(match('').length,0));check(()=>assert.equal(match('こんにちは').length,0));check(()=>assert.equal(match('<script>alert(1)</script>').length,0));
check(()=>assert.equal(match('THIRSTY')[0].id,match('thirsty')[0].id));
check(()=>assert.deepEqual(match('the and my'),[]));
const predictions=cases.map(([query,expected])=>{const m=match(query);return {query,expected,predicted:m[0]?.id||null,correct:m[0]?.id===expected};});
const correct=predictions.filter(x=>x.correct).length;
const baseline=cases.filter(x=>x[1]==='symptoms').length;
const result={task:'Educational topic retrieval, NOT medical prediction',dataset:'15 authored synthetic English queries; one author-assigned relevant topic each; not real patient questions',model:'TF-IDF + cosine; word regex; catalog-only fitting; top 1; abstain on zero overlap',baseline:'Always return symptoms',total:cases.length,correct,top1_accuracy:correct/cases.length,baseline_correct:baseline,baseline_accuracy:baseline/cases.length,limitations:['Tiny author-written evaluation, not independent or clinical validation','No paraphrase understanding; zero-overlap queries are withheld','Known-diabetes wording can overlap with testing terms','Only three English topics; no urgency assessment'],predictions};
fs.writeFileSync(require('node:path').join(__dirname,'../evaluation/visit-results.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({checks,total:cases.length,correct,baseline,failures:predictions.filter(x=>!x.correct)},null,2));
