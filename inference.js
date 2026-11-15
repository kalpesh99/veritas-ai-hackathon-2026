/* The same preprocessing and logistic equation exported by train.py. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.KidneyLens=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function value(raw){return raw===null||raw===undefined||raw===''?null:Number(raw);}
  function assess(model,inputs){
    const values={},missing=[],errors=[],outside=[];
    for(const feature of model.features){
      const n=value(inputs[feature]);values[feature]=n;
      if(n===null)missing.push(feature);
      else if(!Number.isFinite(n))errors.push(feature);
    }
    if(values.age===null)return{ready:false,reason:'Enter an adult age to begin.',missing,errors};
    if(!Number.isFinite(values.age)||values.age<18||values.age>model.ui_policy.max_age)errors.push('age');
    for(const f of model.numeric_features){
      const n=values[f];if(n===null||!Number.isFinite(n))continue;
      const [min,max]=model.observed_training_ranges[f];if(n<min||n>max)outside.push(f);
    }
    for(let i=0;i<model.categorical_features.length;i++){
      const f=model.categorical_features[i],n=values[f];
      if(n!==null&&!model.categories[i].some(v=>Math.abs(v-n)<1e-8))errors.push(f);
    }
    if(errors.length)return{ready:false,reason:'Check the highlighted values. Use the units shown.',missing,errors:[...new Set(errors)]};
    if(outside.length)return{ready:false,reason:'A value is outside the training study’s observed range. No score is shown.',missing,errors:outside,outside};
    if(missing.length>model.ui_policy.max_missing)return{ready:false,reason:'Add more lab results. At least five of seven inputs are needed for this demo.',missing,errors:[]};
    return{ready:true,values,missing,errors:[]};
  }
  function predict(model,inputs){
    const vector=[],effects=[],imputed=[];
    for(let i=0;i<model.numeric_features.length;i++){
      const f=model.numeric_features[i];let n=value(inputs[f]);
      if(n===null){n=model.numeric_medians[i];imputed.push({feature:f,value:n});}
      if(!Number.isFinite(n))throw Error('Invalid numeric input: '+f);
      const z=(n-model.numeric_means[i])/model.numeric_scales[i];vector.push(z);
      effects.push({feature:f,contribution:z*model.coefficients[vector.length-1],imputed:imputed.some(x=>x.feature===f)});
    }
    for(let i=0;i<model.categorical_features.length;i++){
      const f=model.categorical_features[i];let n=value(inputs[f]);
      if(n===null){n=model.categorical_modes[i];imputed.push({feature:f,value:n});}
      const categories=model.categories[i],selected=categories.findIndex(v=>Math.abs(v-n)<1e-8);
      if(selected<0)throw Error('Invalid category: '+f);
      const offset=vector.length;
      categories.forEach((v,j)=>vector.push(j===selected?1:0));
      const reference=categories.findIndex(v=>Math.abs(v-model.categorical_modes[i])<1e-8);
      effects.push({feature:f,contribution:model.coefficients[offset+selected]-model.coefficients[offset+reference],imputed:imputed.some(x=>x.feature===f)});
    }
    const logit=vector.reduce((sum,v,i)=>sum+v*model.coefficients[i],model.intercept);
    const score=logit>=0?1/(1+Math.exp(-logit)):Math.exp(logit)/(1+Math.exp(logit));
    return{score,logit,flagged:score>=model.threshold,imputed,effects:effects.sort((a,b)=>Math.abs(b.contribution)-Math.abs(a.contribution))};
  }
  return{assess,predict};
});
