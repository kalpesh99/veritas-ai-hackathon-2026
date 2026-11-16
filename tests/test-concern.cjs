const assert=require('node:assert/strict');
const topics=require('../evaluation/catalog-v1.json');
const fixture=require('../concern-fixtures.js');
const report=require('../evaluation/semantic-results.json');
let n=0;function check(f){f();n++;}
check(()=>assert.equal(new Set(topics.map(t=>t.id)).size,9));
check(()=>assert.ok(topics.every(t=>['medlineplus.gov','www.niddk.nih.gov','www.cdc.gov'].includes(new URL(t.url).hostname))));
check(()=>assert.equal(fixture.cases.length,25));
check(()=>assert.equal(fixture.cases.filter(x=>x[1]).length,18));
check(()=>assert.equal(fixture.cases.filter(x=>!x[1]).length,7));
check(()=>assert.ok(fixture.cases.every(([q,id])=>q&&(!id||topics.some(t=>t.id===id)))));
check(()=>assert.deepEqual(fixture.lexical('constructor __proto__',topics),[]));
check(()=>assert.equal(report.threshold,fixture.threshold));
check(()=>assert.deepEqual(report.rows.map(x=>[x.query,x.expected]),fixture.cases));
check(()=>assert.equal(report.top1Correct,report.rows.filter(x=>x.expected&&x.top1===x.expected).length));
check(()=>assert.equal(report.top3ContainsTarget,report.rows.filter(x=>x.expected&&x.offered.includes(x.expected)).length));
check(()=>assert.equal(report.ambiguousOrUnrelatedWithheld,report.rows.filter(x=>!x.expected&&x.withheld).length));
check(()=>assert.equal(report.lexicalTop1Correct,fixture.cases.filter(([q,id])=>id&&fixture.lexical(q,topics)[0]?.id===id).length));
const fake=fixture.cases.map(([q,id])=>[{id:id||'energy',score:0.299}]);
check(()=>assert.ok(fixture.summarize(fake,topics).rows.every(x=>x.withheld)));
fake[0][0].score=0.30;
check(()=>assert.equal(fixture.summarize(fake,topics).rows[0].withheld,false));
check(()=>assert.ok(report.rows.some(x=>x.expected&&x.withheld))); // Retain known failure, not a perfect-score claim.
(async()=>{const vm=require('node:vm'),fs=require('node:fs');const context=vm.createContext({location:{protocol:'file:'}});vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../semantic-client.js'),'utf8'),context);await assert.rejects(vm.runInContext('SemanticClient.rank([],[])',context),/hosted website/);n++;console.log(n+' catalog, threshold, result-provenance, baseline and file-mode error checks passed. Actual neural inference is evaluated in the browser model lab.');})().catch(e=>{console.error(e);process.exitCode=1;});
