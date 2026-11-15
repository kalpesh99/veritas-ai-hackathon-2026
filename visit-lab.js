'use strict';
(()=>{
 const el=id=>document.getElementById(id);
 const node=(tag,text)=>{const n=document.createElement(tag);n.textContent=text;return n;};
 const names=Object.fromEntries(VisitMatch.topics.map(t=>[t.id,t.title]));
 function inspect(){const query=el('lab-query').value.trim();el('lab-explanation').replaceChildren();const matches=VisitMatch.match(query);el('lab-status').textContent=matches.length?'Matched reading only. This is not an assessment of a person.':'No matching words. This tells us nothing about someone’s health.';
  for(const t of matches){const d=VisitMatch.explain(query,t.id);el('lab-explanation').append(node('h3',t.title),node('p','Shared words: '+d.matched.join(', ')));}
  const evidence=VisitMatch.explain(query,matches[0]?.id);if(evidence.unrecognized.length)el('lab-explanation').append(node('p','Outside the catalog: '+evidence.unrecognized.join(', ')));
 }
 el('lab-match').addEventListener('click',inspect);
 el('lab-failure').addEventListener('click',()=>{el('lab-query').value='Why am I feeling washed out lately?';inspect();});
 el('lab-query').addEventListener('input',()=>{el('lab-status').textContent='Question changed. Select Inspect this match to update the explanation.';el('lab-explanation').replaceChildren();});
 el('lab-run').addEventListener('click',()=>{
  const predictions=VisitFixtures.map(([q,target])=>({q,target,got:VisitMatch.match(q)[0]?.id||null}));
  const correct=predictions.filter(x=>x.got===x.target).length;const baseline=VisitFixtures.filter(x=>x[1]==='symptoms').length;
  el('lab-results').replaceChildren();const heading=node('h3','Synthetic results: '+correct+'/'+predictions.length+' topic matches');
  el('lab-results').append(heading,node('p','Always-symptoms baseline: '+baseline+'/'+predictions.length+'. No-match outputs count as failures. Every query is shown below.'));
  const table=document.createElement('table');const caption=node('caption','Frozen synthetic retrieval benchmark — not patient data');table.append(caption);
  const head=document.createElement('thead'),hr=document.createElement('tr');for(const s of ['Fictional question','Expected topic','Returned topic','Result']){const th=node('th',s);th.scope='col';hr.append(th);}head.append(hr);table.append(head);
  const body=document.createElement('tbody');for(const x of predictions){const row=document.createElement('tr');row.className=x.got===x.target?'test-pass':'test-fail';for(const s of [x.q,names[x.target],names[x.got]||'No match',x.got===x.target?'Match':'Miss'])row.append(node('td',s));body.append(row);}table.append(body);
  const wrap=document.createElement('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Scrollable synthetic test results');wrap.append(table);el('lab-results').append(wrap);el('lab-status').textContent='All 15 synthetic queries tested. Results and failures are shown below.';
 });
})();
