'use strict';
const $=id=>document.getElementById(id);
let lastSummary='',revision=0,selected=null;
const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
function clearNotes(){VisitFeatures.reset();lastSummary='';$('summary').textContent='';$('summary-panel').hidden=true;$('copy-status').textContent='';}
function clearOutput(){revision++;selected=null;clearNotes();$('resources').replaceChildren();$('choices').replaceChildren();$('topic-search-panel').hidden=true;$('topic-search').value='';$('followup-panel').hidden=true;$('followup').value='';$('form-status').textContent='';$('status').textContent='Describe your concern, or browse the topics yourself. No condition is assumed.';$('find').disabled=false;}
function selectTopic(topic){selected=topic;$('resources').replaceChildren();$('followup-panel').hidden=false;
 $('followup-label').textContent=topic?topic.followup:'What else would you like the health professional to know?';
 $('status').textContent=topic?'You selected '+topic.title+'. This is reading you chose, not an AI diagnosis.':'No topic selected. You can still make visit notes in your own words.';
 if(topic){const a=make('article',undefined,'topic');a.append(make('h3',topic.title),make('p',topic.description),make('p','Question you could ask: '+topic.question,'question'));const link=make('a','Read the original health information ↗');link.href=topic.url;link.target='_blank';link.rel='noopener noreferrer';link.referrerPolicy='no-referrer';a.append(link);const details=make('details');details.append(make('summary','How was this topic chosen?'),make('p','You confirmed this topic. When AI suggestions are used, a pretrained sentence model compares the meaning of your description with our topic descriptions. It can still misread context, negation, or unfamiliar wording. There is no disease probability or symptom assessment.'));a.append(details);VisitFeatures.offer(a,topic);$('resources').append(a);}
 refreshNotes();
}
function showChoices(topics,heading){$('choices').replaceChildren();$('choices').append(make('h3',heading));for(const t of topics){const b=make('button',t.title);b.type='button';b.className='topic-choice';b.addEventListener('click',()=>selectTopic(t));$('choices').append(b);}const none=make('button','None of these / make notes without a topic');none.type='button';none.addEventListener('click',()=>selectTopic(null));$('choices').append(none);}
$('prep-form').addEventListener('submit',async e=>{e.preventDefault();const detail=$('followup').value.trim();const text=[$('concern').value.trim(),detail].filter(Boolean).join('\n');if(!text){$('form-status').textContent='Describe your concern first, or choose Browse all topics.';$('concern').focus();return;}clearOutput();$('followup').value=detail;const ticket=revision;const hadFocus=document.activeElement===$('find');$('find').disabled=true;$('status').textContent='Loading the local language model. First use downloads model files and can take a few minutes. You can browse topics while it loads.';
 try{const [ranked]=await SemanticClient.rank([text],ConcernCatalog.topics,msg=>{if(ticket===revision)$('status').textContent=msg;});if(ticket!==revision)return;const candidates=ranked.filter(x=>x.score>=0.30).slice(0,3).map(x=>ConcernCatalog.topics.find(t=>t.id===x.id));
  if(candidates.length){$('status').textContent='These are possible reading topics, not findings. Which, if any, fits what you meant?';showChoices(candidates,'Please confirm what you want to discuss');}
  else{$('status').textContent='I could not narrow that down reliably. What changed, where do you notice it, and how is it different from usual?';$('topic-search-panel').hidden=false;showChoices(ConcernCatalog.topics,'Choose a topic, or continue without one');$('followup-panel').hidden=false;$('followup-label').textContent='Can you add a little more detail about what you mean?';}
 }catch(error){if(ticket===revision){$('status').textContent=error.message;$('topic-search-panel').hidden=false;showChoices(ConcernCatalog.topics,'Choose a topic manually');}}
 finally{if(ticket===revision){$('find').disabled=false;if(hadFocus)focusChoices();}}
});
$('browse').addEventListener('click',()=>{revision++;$('find').disabled=false;$('status').textContent='Choose the topic you want to read about. These are not suggested diagnoses.';$('topic-search-panel').hidden=false;$('topic-search').value='';showChoices(ConcernCatalog.topics,'All available reading topics');});
$('topic-search').addEventListener('input',()=>{const found=ConcernCatalog.search($('topic-search').value);showChoices(found,found.length?found.length+' reading topics found':'No library match. Try another phrase or continue without a topic.');});
$('without-topic').addEventListener('click',()=>{revision++;$('find').disabled=false;selectTopic(null);});
$('make-notes').addEventListener('click',()=>{const concern=$('concern').value.trim();if(!concern&&!$('followup').value.trim()){$('status').textContent='Please enter your concern or an additional detail before making notes.';$('concern').focus();return;}
 VisitFeatures.start(buildBase(),concern);$('summary-panel').hidden=false;});
function buildBase(){const concern=$('concern').value.trim();return ['MY HEALTH VISIT NOTES','My own statements and selected questions — not a diagnosis or clinical assessment.','', 'My concern: '+(concern||'Not entered'),'When I first noticed it: '+($('duration').value||'Not entered'),'Context I want to share: '+($('context').value.trim()||'Not entered'),'Additional detail: '+($('followup').value.trim()||'Not entered'),'', 'Reading topic I selected: '+(selected?.title||'None'), 'A question I may ask: '+(selected?.question||'What information would help you assess my concern?'),...(selected?['Source: '+selected.url]:[]),'','This prototype does not identify a condition, rule anything out, assess urgency, or recommend treatment. Do not use it to decide whether care can wait.'].join('\n');}
// Changing a detail, the checklist or the topic updates existing notes and keeps the question agenda.
function refreshNotes(){VisitFeatures.update(buildBase);}
// The Suggest button is disabled while the model runs, which drops keyboard focus; move it to the results heading.
function focusChoices(){const heading=$('choices').querySelector('h3');if(heading&&document.activeElement===document.body){heading.tabIndex=-1;heading.focus();}}
$('followup').addEventListener('input',refreshNotes);
$('refine').addEventListener('click',()=>{$('prep-form').requestSubmit();});
$('clear').addEventListener('click',()=>{$('prep-form').reset();clearOutput();});
// Only a change to the concern text starts over. Timing, context and checklist changes just update the notes.
function formChanged(e){if(e.target===$('concern'))clearOutput();else refreshNotes();}
$('prep-form').addEventListener('input',formChanged);$('prep-form').addEventListener('change',formChanged);
$('print').addEventListener('click',()=>window.print());
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(lastSummary);$('copy-status').textContent='Notes copied. They may remain in your device clipboard.';}catch{$('copy-status').textContent='Copy unavailable. Select your notes manually or download the text file.';}});
$('example').addEventListener('click',()=>{$('prep-form').reset();$('concern').value='I feel completely worn out even after a quiet day.';$('context').value='Fictional example only.';clearOutput();$('prep-form').requestSubmit();});
clearOutput();
