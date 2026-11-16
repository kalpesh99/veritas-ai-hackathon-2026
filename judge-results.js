(()=>{
'use strict';
const target=document.getElementById('recorded-evidence');
const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
const r=ExpandedRecordedResults,m=ConcernEvidence.summarize(r);
target.append(node('p','Current 24-topic catalog: actual browser inference on 60 new, frozen, fictional descriptions. Search aliases support manual browsing and are not clinical training data. No threshold, encoder or catalog changes followed this evaluation. This small author-labeled test is not independent or clinical validation.'));
const list=node('dl');list.className='evidence-metrics';
for(const [label,value] of [
 ['Same-task comparison: intended topic ranked first','MiniLM '+r.top1Correct+'/'+r.supportedCount+' · TF-IDF baseline '+r.lexicalTop1Correct+'/'+r.supportedCount],
 ['Intended topic actually offered after cutoff',r.top3ContainsTarget+'/'+r.supportedCount],
 ['Missed intended topics',m.missedTargets+'/'+m.supported],
 ['Non-target suggestions on supported descriptions',m.extraTopicSuggestions+' extras across '+m.queriesWithExtraTopics+'/'+m.supported+' descriptions'],
 ['Vague or unrelated descriptions receiving suggestions',m.unrelatedOrVagueWithSuggestions+'/'+m.unrelatedOrVague]
 ]){list.append(node('dt',label),node('dd',value));}
target.append(list,node('p','“Missed” means the author’s intended reading topic was absent from the shortlist. “Non-target” means a different topic from the single author label; it may still be relevant. These are retrieval errors, not missed diseases or clinical false alarms.'));
const details=node('details');details.append(node('summary','See results by reading topic'));
const table=node('table'),head=node('thead'),header=node('tr');
for(const h of ['Topic','Tested','Target offered','Target missed','Offered for a different target']){const th=node('th',h);th.scope='col';header.append(th);}head.append(header);table.append(head);
const body=node('tbody');for(const row of m.perTopic){const tr=node('tr');for(const v of [ConcernCatalog.topics.find(t=>t.id===row.id).title,row.tested,row.offered,row.missed,row.nonTargetOffers])tr.append(node('td',String(v)));body.append(tr);}table.append(body);
const wrap=node('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Recorded results by reading topic');wrap.append(table);details.append(wrap);target.append(details);
const failures=node('details');failures.append(node('summary','See all six missed intended topics'));for(const row of r.rows.filter(x=>x.expected&&!x.offered.includes(x.expected)))failures.append(node('p',row.query+' — intended '+row.expected+'; raw first topic '+row.top1+' ('+row.topScore.toFixed(3)+'); offered: '+(row.offered.join(', ')||'none')));target.append(failures);
target.append(node('p','Not established: demographic fairness, real-user benefit, multilingual performance, mixed intent, negation, spelling robustness, diagnosis or urgency detection. No patient data or demographic labels were collected.'));
const history=node('details');history.append(node('summary','Original nine-topic evaluation (historical)'));const old=HealthNotesRecordedResults;history.append(node('p','Original catalog and 25 original fictional questions: raw top rank '+old.top1Correct+'/'+old.supportedCount+', target offered '+old.top3ContainsTarget+'/'+old.supportedCount+', lexical baseline '+old.lexicalTop1Correct+'/'+old.supportedCount+'. These figures do not measure the current catalog.'));const link=node('a','Original raw outputs');link.href='evaluation/semantic-results.json';link.target='_blank';link.rel='noopener';history.append(link);target.append(history);
})();
