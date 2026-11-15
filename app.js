/* Static UI. All lab calculations stay in this tab; no values are stored or sent. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const names={age:'Age',bgr:'Random blood glucose',bu:'Blood urea',sc:'Serum creatinine',hemo:'Hemoglobin',sg:'Urine specific gravity',al:'Urine albumin grade'};
  let model,examples,announceTimer;
  const percent=n=>(n*100).toFixed(1)+'%';
  const scoreText=n=>n<.001?'<0.1%':n>.999?'>99.9%':percent(n);
  function element(tag,className,text){const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
  function readInputs(){return Object.fromEntries(model.features.map(f=>[f,$(f).value===''?null:Number($(f).value)]));}
  function announce(text){clearTimeout(announceTimer);announceTimer=setTimeout(()=>{$('summary-announcement').textContent=text;},350);}
  function render(){
    if(!model)return;
    const inputs=readInputs(),quality=KidneyLens.assess(model,inputs);
    const count=model.features.filter(f=>inputs[f]!==null).length;
    $('completion').textContent=count+' / 7';$('completion-fill').style.width=count/7*100+'%';
    for(const f of model.features)$(f).setAttribute('aria-invalid',quality.errors?.includes(f)?'true':'false');
    $('score-section').hidden=true;$('explanations').hidden=true;$('quality').hidden=true;
    if(!quality.ready){
      $('result-card').className='result-card '+(count===0?'empty':'blocked');
      $('result-eyebrow').textContent=count===0?'START WITH A LAB PANEL':'INFORMATION BEFORE INFERENCE';
      $('result-heading').textContent=count===0?'The picture starts here.':quality.outside?'Outside study coverage.':quality.errors?.length?'Let’s check those values.':'The panel is incomplete.';
      $('result-message').textContent=count===0?'Add an age and lab results, or choose a synthetic example. We’ll show both the pattern and the gaps.':quality.reason;
      if(quality.outside){
        $('quality').hidden=false;$('quality').replaceChildren(element('strong','', 'No extrapolated score'),element('span','',quality.outside.map(f=>names[f]+': study training range '+model.observed_training_ranges[f].join('–')).join('; ')));
      }
      announce($('result-heading').textContent+' '+$('result-message').textContent);return;
    }
    const result=KidneyLens.predict(model,inputs),near=Math.abs(result.score-model.threshold)<=.10;
    $('result-card').className='result-card '+(result.flagged?'flagged':'');
    $('result-eyebrow').textContent=near?'NEAR THE MODEL’S DECISION BOUNDARY':result.flagged?'ABOVE THE STUDY MODEL’S THRESHOLD':'BELOW THE STUDY MODEL’S THRESHOLD';
    $('result-heading').textContent=near?'A mixed pattern. Look closer.':result.flagged?'A CKD-like pattern.':'No clear CKD-like pattern.';
    $('result-message').textContent=near?'Small input changes may change this flag. The model cannot resolve the clinical meaning of this panel. Review the actual results with a qualified professional.':result.flagged?'These inputs resemble the study’s CKD-labeled examples. This is a research-model flag—not a diagnosis, a disease stage, or an urgency assessment.':'These inputs fall below the model’s study threshold. A low score cannot rule out CKD or explain symptoms; this model has missed cases.';
    $('score-section').hidden=false;$('score-value').textContent=scoreText(result.score);
    $('score-fill').style.width=(result.score*100)+'%';$('threshold-marker').style.left=(model.threshold*100)+'%';
    $('score-caption').textContent='Study threshold: '+percent(model.threshold)+' · Model flag: '+(result.flagged?'CKD-like':'below threshold');
    if(result.imputed.length){
      $('quality').hidden=false;
      $('quality').replaceChildren(element('strong','','Missing results were estimated'),element('span','',result.imputed.map(x=>names[x.feature]+' → '+Number(x.value.toFixed(3))).join(' · ')),element('p','','These training-reference values are not your measured lab results. The score may change when the actual values are known.'));
    }
    $('explanations').hidden=false;
    $('factor-list').replaceChildren(...result.effects.slice(0,4).map(effect=>{
      const row=element('div','factor-row'),label=element('span','',names[effect.feature]);
      if(effect.imputed)label.append(element('small','','Estimated, not measured'));
      const direction=effect.contribution>.025?'Raises model score':effect.contribution<-.025?'Lowers model score':'Little contribution';
      row.append(label,element('span',effect.contribution>.025?'up':'',direction));return row;
    }));
    announce($('result-heading').textContent+' '+(result.imputed.length?'Some results were estimated.':''));
  }
  function renderEvidence(){
    const e=model.evaluation,t=e.test,b=e.baseline;
    const cards=[
      ['CASES CAUGHT',percent(t.recall),`${t.tp} of ${t.positives} CKD-labeled test examples; recall.`,false],
      ['FLAG PRECISION',percent(t.precision),`${t.tp} of ${t.tp+t.fp} flagged examples had the CKD label.`,false],
      ['MISSED CASES',String(t.fn),`False negatives in ${t.n} reserved test records.`,true],
      ['FALSE ALARMS',String(t.fp),`False positives among ${t.n-t.positives} non-CKD test records.`,true]
    ];
    $('metrics').replaceChildren(...cards.map(([title,value,description,warning])=>{const div=element('article','metric'+(warning?' warning':''));div.append(element('span','',title),element('strong','',value),element('p','',description));return div;}));
    const rows=[['Accuracy',percent(b.accuracy),percent(t.accuracy)],['Recall',percent(b.recall),percent(t.recall)],['Precision',percent(b.precision),percent(t.precision)],['Missed cases',b.fn,t.fn],['False alarms',b.fp,t.fp]];
    $('comparison-table').querySelector('tbody').replaceChildren(...rows.map(values=>{const tr=element('tr');values.forEach(value=>tr.append(element('td','',String(value))));return tr;}));
    $('test-description').textContent=`${e.split.train.n} training / ${e.split.validation.n} validation / ${e.split.test.n} test records. Model and threshold selected on validation only. Recall 95% interval: ${percent(t.recall_95ci[0])}–${percent(t.recall_95ci[1])}; precision: ${percent(t.precision_95ci[0])}–${percent(t.precision_95ci[1])}. Benchmark includes every test record with imputation; the app may withhold a result for incomplete or out-of-range panels.`;
    const stress=[['Original panel',t.recall,t.precision],['1 additional result hidden',e.missingness['1'].mean_recall,e.missingness['1'].mean_precision],['2 additional results hidden',e.missingness['2'].mean_recall,e.missingness['2'].mean_precision]];
    $('missingness-bars').replaceChildren(...stress.map(([label,recall,precision])=>{const row=element('div','stress-row'),head=element('div');head.append(element('span','',label),element('strong','',percent(recall)+' recall · '+percent(precision)+' precision'));row.append(head);for(const [value,type] of [[recall,'recall'],[precision,'precision']]){const track=element('div','stress-track '+type),bar=element('span');bar.style.width=(value*100)+'%';track.append(bar);row.append(track);}return row;}));
    const failure=$('failure-examples');
    failure.append(element('h4','','Where it failed'));
    if(e.errors.length){
      e.errors.forEach(error=>failure.append(element('p','',`Test example ${error.test_position+1}: ${error.actual_label?'a missed CKD label':'a false alarm'}, model score ${percent(error.score)}. Missing inputs: ${error.missing_features.length?error.missing_features.map(f=>names[f]).join(', '):'none'}.`)));
      failure.append(element('p','','These are test-set positions and aggregate explanations, not patient identifiers. All three initial errors had missing hemoglobin; that association is worth investigating, but does not prove why each error occurred.'));
    }else failure.append(element('p','','No errors in this small test sample would not establish clinical reliability.'));
  }
  async function start(){
    document.querySelectorAll('button[data-example]').forEach(button=>button.disabled=true);
    try{
      const responses=await Promise.all([fetch('model.json',{cache:'no-store'}),fetch('evaluation/parity_cases.json',{cache:'no-store'})]);
      if(responses.some(r=>!r.ok))throw Error('Model files could not be loaded.');
      [model,examples]=await Promise.all(responses.map(r=>r.json()));
      if(model.name!=='KidneyLens'||model.features.length!==7||!Number.isFinite(model.threshold))throw Error('Unexpected model format.');
      $('lab-form').addEventListener('submit',event=>event.preventDefault());
      $('lab-form').addEventListener('input',render);$('lab-form').addEventListener('change',render);
      $('reset').addEventListener('click',()=>{$('lab-form').reset();render();});
      document.querySelectorAll('button[data-example]').forEach(button=>{
        button.disabled=false;button.addEventListener('click',()=>{
          const sample=examples[Number(button.dataset.example)];
          model.features.forEach(f=>$(f).value=sample.inputs[f]===null?'':f==='sg'?Number(sample.inputs[f]).toFixed(3):sample.inputs[f]);render();
        });
      });
      renderEvidence();$('loading').hidden=true;$('result-content').hidden=false;render();
    }catch(error){$('loading').textContent='The model could not load. Refresh the page, or open it through the published website. No prediction is available.';$('loading').setAttribute('role','alert');console.error(error);}
  }
  start();
})();
