'use strict';
// All state is session-only. This module adds no network requests or storage.
const VisitFeatures=(()=>{
 let current=null,agenda=[];
 const el=id=>document.getElementById(id);
 const node=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 function announce(text){el('agenda-status').textContent=text;}
 function reset(){current=null;agenda=[];el('agenda').replaceChildren();el('custom-question').value='';el('agenda-count').textContent='0 questions';announce('');}
 function render(focus){
  el('agenda').replaceChildren();el('agenda-count').textContent=agenda.length+' question'+(agenda.length===1?'':'s');
  agenda.forEach((text,i)=>{const li=node('li');li.append(node('span',text));const controls=node('div',undefined,'agenda-controls');
   for(const [label,action,disabled] of [['Move up',()=>{[agenda[i-1],agenda[i]]=[agenda[i],agenda[i-1]];render([i-1,'Move up']);announce('Question moved to position '+i+'.');},i===0],['Move down',()=>{[agenda[i+1],agenda[i]]=[agenda[i],agenda[i+1]];render([i+1,'Move down']);announce('Question moved to position '+(i+2)+'.');},i===agenda.length-1],['Remove',()=>{agenda.splice(i,1);render([Math.min(i,agenda.length-1),'Remove']);announce('Question removed.');},false]]){const b=node('button',label);b.type='button';b.disabled=disabled;b.setAttribute('aria-label',label+' question '+(i+1));b.addEventListener('click',action);controls.append(b);}li.append(controls);el('agenda').append(li);});
  if(current)writeSummary();
  if(focus)restoreFocus(focus);
 }
 // After a move or remove the list is rebuilt, so put keyboard focus back on the matching button.
 function restoreFocus([index,label]){const row=el('agenda').children[index];if(!row){el('custom-question').focus();return;}const buttons=[...row.querySelectorAll('button')];(buttons.find(b=>b.textContent===label&&!b.disabled)||buttons.find(b=>!b.disabled))?.focus();}
 // Two questions count as the same if they differ only by case, spacing, Unicode form or ending punctuation.
 const sameKey=text=>text.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').replace(/[\s?!.]+$/,'').trim();
 function add(text){text=text.trim();if(text.length>300){text=text.slice(0,300);if(/[\uD800-\uDBFF]$/.test(text))text=text.slice(0,-1);}if(!text){announce('Enter a question first.');return;}if(agenda.some(q=>sameKey(q)===sameKey(text))){announce('That question is already in your agenda.');return;}if(agenda.length>=8){announce('Your agenda has eight questions. Remove one before adding another.');return;}agenda.push(text);render();announce('Question added. Use Move up to put your most important question first.');}
 function writeSummary(){
  const checks=[...document.querySelectorAll('input[name=bring]:checked')].map(x=>x.value);
  lastSummary=[current.base,'','MY PRIORITIZED QUESTION AGENDA',...(agenda.length?agenda.map((q,i)=>(i+1)+'. '+q):['No additional questions selected.']),'','MY PREPARATION CHECKLIST',...(checks.length?checks.map(x=>'• '+x):['No checklist items selected.']),'','The agenda and checklist reflect my selections, not a clinical recommendation.'].join('\n');el('summary').textContent=lastSummary;el('copy-status').textContent='';
 }
 // The agenda is emptied only by reset(), so making notes again or changing a detail keeps the questions.
 function start(base,query){current={base,query};render();}
 function update(makeBase){if(!current)return;current.base=makeBase();writeSummary();}
 function offer(article,topic){const b=node('button','Add this question to my agenda');b.type='button';b.addEventListener('click',()=>{if(!current){el('status').textContent='Make your visit notes first, then add questions to your agenda.';return;}add(topic.question);});article.append(b);}
 function download(){if(!lastSummary)return;const url=URL.createObjectURL(new Blob([lastSummary],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='my-visit-notes.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);el('copy-status').textContent='Download requested. If saved, keep or delete that file as you choose.';}
 el('add-question').addEventListener('click',()=>{const before=agenda.length;add(el('custom-question').value);if(agenda.length>before)el('custom-question').value='';});
 el('custom-question').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();el('add-question').click();}});
 el('download').addEventListener('click',download);
 return {reset,start,update,offer};
})();
