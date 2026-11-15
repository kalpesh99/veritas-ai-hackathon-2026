const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {predict,assess}=require('../inference.js');
const root=path.join(__dirname,'..'),model=JSON.parse(fs.readFileSync(path.join(root,'model.json'),'utf8'));
const cases=JSON.parse(fs.readFileSync(path.join(root,'evaluation/parity_cases.json'),'utf8'));
let checks=0;
for(const test of cases){
  const before=JSON.stringify(test.inputs),actual=predict(model,test.inputs);
  assert(Math.abs(actual.score-test.expected_score)<1e-12,test.name+' Python/JS mismatch');
  assert.equal(actual.flagged,test.expected_score>=model.threshold);
  assert.equal(JSON.stringify(test.inputs),before,'Inference must not mutate input');
  assert(assess(model,test.inputs).ready,test.name+' should pass demo input policy');checks+=4;
}
const complete=cases[0].inputs;
assert.equal(assess(model,{}).ready,false);checks++;
assert.equal(assess(model,{...complete,age:17}).ready,false);checks++;
assert.equal(assess(model,{...complete,age:null}).ready,false);checks++;
assert.equal(assess(model,{...complete,sc:null,hemo:null,al:null}).ready,false);checks++;
assert.equal(assess(model,{...complete,sc:1e20}).ready,false);checks++;
assert.equal(assess(model,{...complete,sc:Infinity}).ready,false);checks++;
assert.equal(assess(model,{...complete,sg:1.017}).ready,false);checks++;
assert.equal(assess(model,{...complete,al:-1}).ready,false);checks++;
assert.equal(predict(model,{...complete,hemo:null}).imputed.length,1);checks++;
assert.equal(predict(model,{...complete,hemo:0}).imputed.length,0,'Zero cannot be treated as missing');checks++;
assert.notEqual(predict(model,{...complete,hemo:null}).score,predict(model,{...complete,hemo:0}).score);checks++;
const result=model.evaluation.test;
assert.equal(result.tp+result.fn,result.positives);checks++;
assert.equal(result.tp+result.fp+result.fn+result.tn,result.n);checks++;
console.log(JSON.stringify({checks,status:'passed'}));
