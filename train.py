"""Train KidneyLens from public UCI data. No private practice code is imported.

Run: python train.py
The selected model and thresholds are frozen before evaluation of reserved test rows.
"""
from pathlib import Path
import hashlib
import json
import urllib.request
import platform
import numpy as np
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, roc_auc_score, average_precision_score, precision_recall_curve, brier_score_loss
from sklearn.model_selection import StratifiedGroupKFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

ROOT=Path(__file__).resolve().parent
URL='https://archive.ics.uci.edu/static/public/336/data.csv'
SHA='0eeea8d17f5ad8792d854999d6ddf1602ec4e116616f6ccdfdaef0ba8109e694'
NUM=['age','bgr','bu','sc','hemo']
CAT=['sg','al']
FEATURES=NUM+CAT

def wilson(numerator,denominator):
    if not denominator:return None
    p=numerator/denominator;z=1.95996398454;d=1+z*z/denominator
    middle=(p+z*z/(2*denominator))/d
    width=z*np.sqrt(p*(1-p)/denominator+z*z/(4*denominator*denominator))/d
    return [float(middle-width),float(middle+width)]

def measure(y,p,threshold):
    y=np.asarray(y,dtype=int);p=np.asarray(p,dtype=float)
    tn,fp,fn,tp=confusion_matrix(y,p>=threshold,labels=[0,1]).ravel()
    return {'n':len(y),'positives':int(y.sum()),'threshold':float(threshold),
            'tp':int(tp),'fp':int(fp),'fn':int(fn),'tn':int(tn),
            'accuracy':float((tp+tn)/len(y)),
            'precision':float(tp/(tp+fp)) if tp+fp else 0.,
            'recall':float(tp/(tp+fn)) if tp+fn else 0.,
            'precision_95ci':wilson(tp,tp+fp),'recall_95ci':wilson(tp,tp+fn),
            'roc_auc':float(roc_auc_score(y,p)) if len(set(y))==2 else None,
            'average_precision':float(average_precision_score(y,p)) if y.sum() else None,
            'brier_score':float(brier_score_loss(y,p))}

def get_data():
    path=ROOT/'.cache/uci_336.csv';path.parent.mkdir(exist_ok=True)
    if not path.exists():
        with urllib.request.urlopen(URL,timeout=30) as response:path.write_bytes(response.read())
    assert hashlib.sha256(path.read_bytes()).hexdigest()==SHA,'Dataset version changed; investigate before accepting.'
    raw=pd.read_csv(path,na_values=['?','\t?'],skipinitialspace=True)
    assert raw.shape==(400,25)
    for f in FEATURES:raw[f]=pd.to_numeric(raw[f],errors='coerce')
    labels=raw['class'].astype(str).str.strip().map({'ckd':1,'notckd':0})
    assert not labels.isna().any()
    # Adult-only scope; unknown ages cannot establish adult eligibility.
    keep=raw.age.notna()&(raw.age>=18)
    frame=raw.loc[keep,FEATURES].copy();target=labels.loc[keep].astype(int)
    metadata={'raw_rows':len(raw),'adult_rows':len(frame),'under_18_excluded':int((raw.age<18).sum()),
              'missing_age_excluded':int(raw.age.isna().sum()),'positive_rows':int(target.sum()),
              'missing_by_feature':frame.isna().sum().astype(int).to_dict()}
    return frame,target,metadata

def partitions(x,y):
    groups=pd.util.hash_pandas_object(x,index=False).to_numpy()
    a,test=next(StratifiedGroupKFold(5,shuffle=True,random_state=15112026).split(x,y,groups))
    b,c=next(StratifiedGroupKFold(4,shuffle=True,random_state=15112027).split(x.iloc[a],y.iloc[a],groups[a]))
    splits={'train':a[b],'validation':a[c],'test':test}
    gs={n:set(groups[ix]) for n,ix in splits.items()}
    assert all(not gs[a]&gs[b] for a,b in [('train','validation'),('train','test'),('validation','test')])
    details={n:{'n':len(ix),'positives':int(y.iloc[ix].sum()),'input_profile_groups':len(gs[n]),
                'index_sha256':hashlib.sha256(np.asarray(ix,dtype='<i8').tobytes()).hexdigest()}
             for n,ix in splits.items()}
    return splits,details

def pipeline(c):
    preprocess=ColumnTransformer([
        ('numbers',Pipeline([('impute',SimpleImputer(strategy='median')),('scale',StandardScaler())]),NUM),
        ('categories',Pipeline([('impute',SimpleImputer(strategy='most_frequent')),
                                ('encode',OneHotEncoder(categories=[[1.005,1.010,1.015,1.020,1.025],[0,1,2,3,4,5]],handle_unknown='error',sparse_output=False))]),CAT)
    ])
    return Pipeline([('preprocess',preprocess),('classifier',LogisticRegression(C=c,max_iter=2000,random_state=15))])

def choose_threshold(y,p):
    precision,recall,threshold=precision_recall_curve(y,p)
    eligible=np.flatnonzero(recall[:-1]>=.90)
    index=max(eligible,key=lambda i:(precision[i],recall[i],-threshold[i]))
    return float(threshold[index])

def export_model(model,threshold,train,results):
    pre=model['preprocess'];numeric=pre.named_transformers_['numbers'];categorical=pre.named_transformers_['categories']
    return {'name':'KidneyLens','version':'2026-11-15.1','target':'CKD label in the UCI study; not future risk or diagnosis',
            'source':'https://archive.ics.uci.edu/dataset/336/chronic+kidney+disease',
            'features':FEATURES,'numeric_features':NUM,'categorical_features':CAT,
            'numeric_medians':numeric['impute'].statistics_.tolist(),
            'numeric_means':numeric['scale'].mean_.tolist(),'numeric_scales':numeric['scale'].scale_.tolist(),
            'categorical_modes':categorical['impute'].statistics_.tolist(),
            'categories':[v.tolist() for v in categorical['encode'].categories_],
            'coefficients':model['classifier'].coef_[0].tolist(),'intercept':float(model['classifier'].intercept_[0]),
            'threshold':threshold,'observed_training_ranges':{f:[float(train[f].min()),float(train[f].max())] for f in NUM},
            'ui_policy':{'max_missing':2,'minimum_observed':5,'max_age':90,
                         'note':'Missingness and input-range guardrails are product heuristics, not validated clinical rules.'},
            'evaluation':results}

def synthetic_cases(model):
    profiles=[{'name':'Routine-looking example','age':40,'bgr':95,'bu':25,'sc':.9,'hemo':14.2,'sg':1.025,'al':0},
              {'name':'CKD-like example','age':62,'bgr':180,'bu':70,'sc':2.4,'hemo':10.2,'sg':1.010,'al':2},
              {'name':'One missing result','age':62,'bgr':None,'bu':70,'sc':2.4,'hemo':10.2,'sg':1.010,'al':2},
              {'name':'Missing urine tests','age':40,'bgr':95,'bu':25,'sc':.9,'hemo':14.2,'sg':None,'al':None}]
    cases=[]
    for profile in profiles:
        x=pd.DataFrame([{f:np.nan if profile[f] is None else profile[f] for f in FEATURES}])
        cases.append({'name':profile['name'],'inputs':{f:profile[f] for f in FEATURES},
                      'expected_score':float(model.predict_proba(x)[0,1])})
    # A synthetic boundary case: no real participant records are exported.
    lo=profiles[0];hi=profiles[1]
    # Keep categories fixed; sweep continuous labs to find a useful illustration.
    grid=pd.DataFrame([{**{f:lo[f]+t*(hi[f]-lo[f]) for f in NUM},'sg':1.015,'al':1} for t in np.linspace(0,1,501)])
    p=model.predict_proba(grid)[:,1]
    index=int(np.argmin(abs(p-.5)))
    inputs={f:float(grid.iloc[index][f]) for f in FEATURES}
    cases.append({'name':'Mixed-pattern example','inputs':inputs,'expected_score':float(p[index])})
    return cases

def chart(results):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    fig,axes=plt.subplots(1,2,figsize=(10,4),layout='constrained')
    names=['Majority baseline','KidneyLens'];x=np.arange(2)
    for j,key in enumerate(['precision','recall']):
        axes[0].bar(x+(j-.5)*.32,[results['baseline'][key]*100,results['test'][key]*100],.32,label=key,color=['#266755','#a2b987'][j])
    axes[0].set_xticks(x,names);axes[0].set(ylim=(0,105),ylabel='Percent',title='Reserved test: baseline vs model');axes[0].legend(frameon=False)
    labels=['Original','1 hidden','2 hidden']
    positions=np.arange(3)
    for j,key in enumerate(['recall','precision']):
        values=[results['test'][key]*100]+[results['missingness'][str(k)]['mean_'+key]*100 for k in [1,2]]
        axes[1].bar(positions+(j-.5)*.32,values,.32,label=key,color=['#266755','#c5ab6d'][j])
    axes[1].set_xticks(positions,labels);axes[1].legend(frameon=False)
    axes[1].set(ylim=(0,105),ylabel='Percent',title='Randomly hidden lab results (20 trials)')
    fig.suptitle('KidneyLens · small adult study sample, not clinical validation')
    fig.savefig(ROOT/'evaluation/summary.png',dpi=160);plt.close(fig)

def main():
    x,y,data_info=get_data();split,split_info=partitions(x,y)
    tr,va,te=(split[k] for k in ['train','validation','test'])
    models={};validation={}
    for c in [.1,1.,10.]:
        m=pipeline(c).fit(x.iloc[tr],y.iloc[tr]);p=m.predict_proba(x.iloc[va])[:,1]
        threshold=choose_threshold(y.iloc[va],p);models[str(c)]=m
        validation[str(c)]=measure(y.iloc[va],p,threshold)
    # Freeze model and threshold before accessing test performance.
    winner=max(models,key=lambda k:(validation[k]['precision'],validation[k]['recall'],-float(k)))
    model=models[winner];threshold=validation[winner]['threshold']
    print('Frozen validation choice: C=',winner,'threshold=',threshold,flush=True)
    probability=model.predict_proba(x.iloc[te])[:,1]
    majority=int(y.iloc[tr].mean()>=.5)
    results={'created':'2026-11-15','source_url':URL,'source_sha256':SHA,
             'versions':{'python':platform.python_version(),'numpy':np.__version__,'pandas':pd.__version__,'sklearn':sklearn.__version__},
             'data':data_info,'split':split_info,'split_seeds':[15112026,15112027],
             'validation_policy':'Choose threshold with recall >=90%, maximizing precision then recall. Compare C=0.1/1/10 by validation precision, recall, then smaller C. Test untouched until choice frozen.',
             'validation':validation,'selected_C':float(winner),
             'test':measure(y.iloc[te],probability,threshold),
             'baseline':measure(y.iloc[te],np.full(len(te),majority,dtype=float),.5),
             'baseline_rule':f'Always predict the training majority class ({majority})',
             'missingness':{},'subgroups':{}}
    # Stress test is evaluation only: it does not change model or threshold.
    for hidden in [1,2]:
        trial=[]
        for seed in range(20):
            modified=x.iloc[te].copy();rng=np.random.default_rng(1000+seed)
            for row in range(len(modified)):
                available=[f for f in FEATURES if f!='age' and pd.notna(modified.iloc[row][f])]
                for f in rng.choice(available,size=min(hidden,len(available)),replace=False):
                    modified.iat[row,modified.columns.get_loc(f)]=np.nan
            trial.append(measure(y.iloc[te],model.predict_proba(modified)[:,1],threshold))
        results['missingness'][str(hidden)]={'mean_precision':float(np.mean([t['precision'] for t in trial])),
                                            'mean_recall':float(np.mean([t['recall'] for t in trial])),
                                            'recall_range':[min(t['recall'] for t in trial),max(t['recall'] for t in trial)],
                                            'trials':trial,'note':'Randomly mask additional observed lab values, not age. All test rows included, even beyond UI missingness guardrail. Not clinical validation.'}
    for name,mask in [('18–44',x.iloc[te].age<45),('45–64',(x.iloc[te].age>=45)&(x.iloc[te].age<65)),('65+',x.iloc[te].age>=65)]:
        if mask.any():results['subgroups'][name]=measure(y.iloc[te][mask],probability[mask],threshold)
    errors=np.flatnonzero((probability>=threshold)!=y.iloc[te].to_numpy())
    results['errors']=[{'test_position':int(i),'actual_label':int(y.iloc[te].iloc[i]),'score':float(probability[i]),
                       'missing_features':[f for f in FEATURES if pd.isna(x.iloc[te].iloc[i][f])]} for i in errors]
    results['limitations']=['Small single-source retrospective dataset; no external or prospective validation.',
                           'CKD is the existing dataset label, not future disease or urgency.',
                           'Serum creatinine and urine measurements are related to diagnostic assessment; apparent accuracy may not represent early screening.',
                           'Train-fitted imputation and missingness patterns can create shortcuts. Random masking does not capture all real-world missingness.',
                           'No sex/race variables are available for this feature set; subgroup sample sizes are small.',
                           'Model scores are not calibrated clinical probabilities; confidence intervals are ordinary binomial intervals.']
    (ROOT/'evaluation').mkdir(exist_ok=True)
    (ROOT/'evaluation/results.json').write_text(json.dumps(results,indent=2,ensure_ascii=False,allow_nan=False),encoding='utf-8')
    bundle=export_model(model,threshold,x.iloc[tr],results)
    (ROOT/'model.json').write_text(json.dumps(bundle,indent=2,ensure_ascii=False,allow_nan=False),encoding='utf-8')
    examples=synthetic_cases(model)
    (ROOT/'evaluation/parity_cases.json').write_text(json.dumps(examples,indent=2,allow_nan=False),encoding='utf-8')
    chart(results)
    print(json.dumps({k:results[k] for k in ['data','split','test','baseline','subgroups','errors']},indent=2),flush=True)

if __name__=='__main__':main()
