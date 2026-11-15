const assert=require('node:assert/strict');
const {match,explain}=require('../visit-match.js');
const cases=require('../visit-fixtures.js');
let checks=0;function check(f){f();checks++;}
check(()=>assert.equal(cases.length,15));
check(()=>assert.equal(cases.filter(([q,t])=>match(q)[0]?.id===t).length,12));
check(()=>assert.deepEqual(explain('THIRSTY and unknownword','symptoms').matched,['thirsty']));
check(()=>assert.deepEqual(explain('THIRSTY and unknownword','symptoms').unrecognized,['unknownword']));
check(()=>assert.deepEqual(explain('thirsty thirsty','symptoms').matched,['thirsty']));
check(()=>assert.deepEqual(explain('thirsty','unknown').matched,[]));
check(()=>assert.deepEqual(match('constructor __proto__ toString'),[]));
check(()=>assert.equal(match('thirsty constructor')[0].id,'symptoms'));
check(()=>assert.ok(match('thirsty constructor').every(t=>Number.isFinite(t.similarity))));
check(()=>assert.equal(match('I am not thirsty')[0].id,'symptoms')); // Documents inability to understand negation.
check(()=>assert.deepEqual(explain('こんにちは','symptoms').recognized,[]));
check(()=>assert.equal(match('thirsty!')[0].id,match('THIRSTY')[0].id));
console.log(checks+' explanation, benchmark consistency and robustness checks passed.');
