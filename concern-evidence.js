(function(root){
'use strict';
// Summarize recorded retrieval outputs without changing the frozen evaluation or model.
function summarize(report){
 const supported=report.rows.filter(r=>r.expected),outside=report.rows.filter(r=>!r.expected);
 const extra=r=>r.offered.filter(id=>id!==r.expected);
 return {
  supported:supported.length,
  missedTargets:supported.filter(r=>!r.offered.includes(r.expected)).length,
  queriesWithExtraTopics:supported.filter(r=>extra(r).length).length,
  extraTopicSuggestions:supported.reduce((n,r)=>n+extra(r).length,0),
  unrelatedOrVague:outside.length,
  unrelatedOrVagueWithSuggestions:outside.filter(r=>r.offered.length).length,
  totalSuggestions:report.rows.reduce((n,r)=>n+r.offered.length,0),
  perTopic:[...new Set(supported.map(r=>r.expected))].map(id=>{
   const rows=supported.filter(r=>r.expected===id);
   return {id,tested:rows.length,offered:rows.filter(r=>r.offered.includes(id)).length,
    missed:rows.filter(r=>!r.offered.includes(id)).length,
    nonTargetOffers:report.rows.filter(r=>r.expected!==id&&r.offered.includes(id)).length};
  })
 };
}
const api={summarize};if(typeof module==='object'&&module.exports)module.exports=api;else root.ConcernEvidence=api;
})(typeof globalThis!=='undefined'?globalThis:this);
