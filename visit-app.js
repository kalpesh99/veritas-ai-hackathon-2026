'use strict';
const $=id=>document.getElementById(id);
let lastSummary='';
function renderTopics(matches,heading){
 $('status').textContent=heading;$('resources').replaceChildren();
 for(const t of matches){const article=document.createElement('article');article.className='topic';
 const h=document.createElement('h3');h.textContent=t.title;
 const p=document.createElement('p');p.textContent=t.description;
 const q=document.createElement('p');q.className='question';q.textContent='Ask: '+t.question;
 const a=document.createElement('a');a.href=t.url;a.target='_blank';a.rel='noopener noreferrer';a.referrerPolicy='no-referrer';a.textContent='Read the NIDDK source ↗';
 article.append(h,p,q,a);$('resources').append(article);}
}
function clearOutput(){lastSummary='';$('summary').textContent='';$('summary-panel').hidden=true;$('copy-status').textContent='';renderTopics([],'Your matched reading will appear here. You can also browse every topic.');}
$('prep-form').addEventListener('submit',e=>{e.preventDefault();
 const concern=$('concern').value.trim();const chosen=[...document.querySelectorAll('input[name=change]:checked')].map(x=>x.value);
 if(!concern&&!chosen.length){$('form-status').textContent='Write a question or select a change first.';$('concern').focus();return;}
 $('form-status').textContent='';
 const matches=VisitMatch.match(concern+' '+chosen.join(' ')).slice(0,2);
 renderTopics(matches,matches.length?'Reading matched to your words. A match is not a diagnosis or a likelihood.':'No matching words found. Try a diabetes question, or browse all topics. No medical conclusion can be drawn.');
 lastSummary=['MY DIABETES VISIT NOTES','Prepared by me — not a diagnosis or clinical assessment.','', 'My question: '+(concern||'Not entered'), 'Changes I selected: '+(chosen.join('; ')||'None selected (does not rule out diabetes)'), 'When I first noticed this: '+($('duration').value||'Not entered'), 'Context I want to share: '+($('context').value.trim()||'Not entered'),'', 'Questions I may ask:',...(matches.length?matches.map(t=>'• '+t.question):['• What could explain my concern, and what should we discuss next?']),'','Optional reading (word matches only):',...matches.map(t=>t.title+' — '+t.url),'','This student prototype cannot diagnose diabetes, rule it out, assess urgency or recommend treatment. Bring these notes to a qualified health professional.'].join('\n');
 $('summary').textContent=lastSummary;$('summary-panel').hidden=false;$('copy-status').textContent='';
});
$('browse').addEventListener('click',()=>renderTopics(VisitMatch.topics,'All three educational topics — no personal assessment.'));
$('clear').addEventListener('click',()=>{$('prep-form').reset();$('form-status').textContent='';clearOutput();});
// Invalidate old notes whenever answers change, so the printable summary cannot silently go stale.
$('prep-form').addEventListener('input',clearOutput);$('prep-form').addEventListener('change',clearOutput);
$('print').addEventListener('click',()=>window.print());
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(lastSummary);$('copy-status').textContent='Notes copied. They may remain in your device clipboard.';}catch{$('copy-status').textContent='Copy is unavailable here. Select the notes manually, or use Print.';}});
$('example').addEventListener('click',()=>{$('prep-form').reset();$('concern').value='I feel thirsty and keep going to the bathroom. What should I ask about testing?';$('duration').value='About a week';$('context').value='Synthetic demonstration only — not a real person.';clearOutput();$('prep-form').requestSubmit();});
clearOutput();
