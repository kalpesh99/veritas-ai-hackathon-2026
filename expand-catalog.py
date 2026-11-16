"""Reproducible authored reference-catalog expansion; no patient data or training."""
from pathlib import Path
import json
root=Path(__file__).resolve().parent
topics=json.loads((root/'evaluation/catalog-v1.json').read_text(encoding='utf-8'))
aliases={
'energy':['fatigue','worn out','low energy','exhausted','drained','tired all day','tiredness'],
'headache':['head pain','head ache','migraine questions','pounding head','headace','headaches','forehead pressure'],
'digestion':['tummy ache','belly pain','bloating','stomache','constipated','loose stools','heartburn'],
'cough':['coughing','hacking','throat clearing','lingering cough','dry cough','cought','airway irritation'],
'sleep':['insomnia','cannot sleep','waking at night','sleepless','poor sleep','cant sleep','restless night'],
'stress':['anxious','worry','on edge','nervous','overwhelmed','anxeity','uneasy'],
'diabetes':['blood sugar','A1C','diabetic questions','diabetis','glucose test','diabetes testing','family history of diabetes'],
'heart':['cardiovascular','heart attack information','chest discomfort','heart health','cardiac questions','heart disease','chest pressure'],
'stroke':['FAST awareness','stroke signs','one sided weakness','facial droop','slurred speech','stroke information','sudden speech change']}
# Navigation-oriented descriptions are authored paraphrases. Sources do not validate the model.
new=[
('dizziness','Dizziness and balance concerns','Feeling dizzy, lightheaded, unsteady, off balance or as though the room is spinning. Questions about vertigo and balance changes.','dizzinessandvertigo.html',['dizzy','room spinning','light headed','off balance','vertigo','dizzyness','unsteady'],'What do you mean by dizzy: spinning, faintness, unsteadiness, or something else?'),
('back','Back pain and stiffness','Pain, soreness, stiffness or aching in the upper or lower back. Back discomfort with sitting, standing or movement.','backpain.html',['lower back','back ache','backache','stiff back','lumbar pain','upper back','backpain'],'Where in your back do you notice the discomfort, and what activities affect it?'),
('joints','Joint pain and stiffness','Aching, stiffness, swelling or discomfort in joints such as knees, wrists, shoulders, hips or fingers. Questions about joint movement.','jointdisorders.html',['knees ache','joint pain','stiff fingers','aching joints','sore knee','wrist pain','joint stiffness'],'Which joint or joints are affected, and what changes have you noticed?'),
('skin','Skin rash and itching','A rash, itchy skin, red patches, irritated skin, bumps or a change in skin appearance. Questions about skin rashes.','rashes.html',['itchy skin','red patches','rash','skin bumps','itching','rashes','skin irritation'],'Where is the skin change, and when did you first notice it?'),
('urinary','Urination and bladder concerns','Changes in urination, discomfort or burning while passing urine, urinary frequency, leakage or questions about bladder habits.','urineandurination.html',['peeing','burning pee','passing urine','bladder','urinary frequency','urination','urine changes'],'What change in urination would you like to describe to a health professional?'),
('fever','Fever and temperature questions','A raised body temperature, fever, feeling feverish, chills or questions about a measured temperature.','fever.html',['feverish','high temperature','chills','temperature reading','feaver','raised temperature','fever'],'Have you measured a temperature, and what would you like to discuss about it?'),
('allergy','Allergy information','Questions about allergies, sneezing, itchy or watery eyes, runny nose and symptoms noticed around pollen, pets or other exposures.','allergy.html',['sneezing','pollen','hay fever','allergies','alergies','runny nose','watery eyes'],'Have you noticed any pattern with places, seasons or exposures? This does not identify an allergy.'),
('ears','Ear and hearing concerns','Ear discomfort, earache, ringing in the ears, reduced hearing, blocked ears or changes in hearing.','eardisorders.html',['earache','ear pain','blocked ear','ringing ears','hearing change','tinnitus questions','ear pressure'],'Is your concern discomfort, hearing, ringing, or another ear change?'),
('eyes','Eye and vision concerns','Changes in eyesight, blurry vision, irritated or dry eyes, eye discomfort, difficulty seeing clearly or questions about eye health.','eyediseases.html',['blurry vision','dry eyes','eye pain','eyesight','vision change','blured vision','eye irritation'],'What has changed in your vision or eye comfort, and when did it begin?'),
('teeth','Tooth and dental concerns','Toothache, tooth sensitivity, pain with hot or cold food, dental discomfort or questions about teeth.','toothdisorders.html',['toothache','sensitive tooth','teeth hurt','dental pain','tooth pain','tooth sensitivity','teeth questions'],'Which tooth or area is affected, and what do you notice when eating or drinking?'),
('periods','Menstrual and period questions','Questions about menstrual periods, cycle timing, period cramps, changes in menstrual flow or irregular periods.','menstruation.html',['period cramps','menstrual cycle','irregular periods','period changes','menstruation','monthly cycle','menstral'],'What change in your cycle or period would you like to discuss?'),
('weight','Unintentional weight loss','Losing weight without trying, clothes becoming looser, unexplained weight loss or questions about a drop in body weight.','ency/article/003107.htm',['losing weight','unplanned weight loss','clothes loose','weight dropped','unintentional loss','weight loss','unexplained weight'],'What weight change have you noticed, over what period, and was it intentional?'),
('medicines','Medicine and side-effect questions','Questions to ask a doctor or pharmacist about medicines, prescriptions, possible side effects, medication lists or medicine instructions.','medicines.html',['medication questions','prescription','side effects','pharmacist','medicine list','medecine','meds'],'Which medicine question do you want to ask your doctor or pharmacist? Do not change treatment based on this app.'),
('throat','Sore throat concerns','Throat soreness, pain when swallowing, a scratchy throat, throat irritation or questions about a sore throat.','sorethroat.html',['scratchy throat','swallowing hurts','sore throat','throat pain','sorethroat','painful swallowing','throat soreness'],'What does the throat discomfort feel like, and how long has it been happening?'),
('tingling','Numbness and tingling concerns','Pins and needles, tingling sensations, reduced sensation or numbness in hands, feet or other parts of the body.','ency/article/003206.htm',['pins and needles','tingling','numb fingers','numbness','numbnes','hands tingle','reduced sensation'],'Where do you notice the sensation, and how would you describe the change? Sudden stroke signs need immediate help, not this app.')]
for id,title,text,path,words,prompt in new:
 topics.append(dict(id=id,title=title,text=text,description='This reference offers general information about '+title.lower()+'. It does not identify the cause of your concern, assess urgency or recommend treatment.',url='https://medlineplus.gov/'+path,question='What details about '+title.lower()+' would help a health professional assess my concern?',followup=prompt))
 aliases[id]=words
for t in topics:
 t['aliases']=aliases[t['id']]
 t['sourceChecked']='2026-11-15'
 t['sourceOrganization']='MedlinePlus / U.S. National Library of Medicine' if 'medlineplus.gov' in t['url'] else ('CDC' if 'cdc.gov' in t['url'] else 'NIDDK')
script='''(function(root){
const topics=CATALOG;
const normalize=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const stop=new Set('a an the and or my i am have is of in to with'.split(' '));
function search(query){const terms=normalize(query).split(' ').filter(w=>w&&!stop.has(w));if(!terms.length)return topics;return topics.filter(t=>{const words=normalize([t.title,t.text,...t.aliases].join(' ')).split(' ');return terms.every(q=>words.some(w=>w.startsWith(q)));});}
const api={topics,search,version:'24-topics-v2'};if(typeof module==='object'&&module.exports)module.exports=api;else root.ConcernCatalog=api;
})(typeof globalThis!=='undefined'?globalThis:this);
'''.replace('CATALOG',json.dumps(topics,ensure_ascii=False,indent=2))
(root/'concern-catalog.js').write_text(script,encoding='utf-8')
manifest={'version':'24-topics-v2','checked':'2026-11-15','scope':'Authored educational navigation catalog, NOT clinical research data or patient training data','aliasScope':'Authored search phrases and misspellings, not source-endorsed medical labels; aliases affect manual search only','topicCount':len(topics),'aliasCount':sum(len(t['aliases']) for t in topics),'topics':topics}
(root/'evaluation/catalog-v2.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(topics),'topics;',manifest['aliasCount'],'authored search phrases; original nine embedding descriptions unchanged.')
