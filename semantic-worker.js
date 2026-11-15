// Sentence embeddings run locally. No concern text is sent in a fetch request.
import {pipeline,env} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0/dist/transformers.min.js';
env.allowLocalModels=false;
env.backends.onnx.wasm.numThreads=1;
let extractorPromise;
function extractor(){
 if(!extractorPromise)extractorPromise=pipeline('feature-extraction','Xenova/all-MiniLM-L6-v2',{
  device:'wasm',dtype:'q8',revision:'751bff37182d3f1213fa05d7196b954e230abad9',
  progress_callback:p=>{if(p.status==='progress'&&Number.isFinite(p.progress))postMessage({type:'progress',text:'Loading language model: '+Math.round(p.progress)+'% of '+p.file});}
 }).catch(e=>{extractorPromise=null;throw e;});
 return extractorPromise;
}
let docs=null,docKey='';
self.onmessage=async({data})=>{
 const {id,texts,catalog}=data;
 try{
  const embed=await extractor();const key=JSON.stringify(catalog);
  if(key!==docKey){docs=(await embed(catalog.map(t=>t.title+'. '+t.text),{pooling:'mean',normalize:true})).tolist();docKey=key;}
  const queryVectors=(await embed(texts,{pooling:'mean',normalize:true})).tolist();
  const results=queryVectors.map(q=>catalog.map((t,i)=>({id:t.id,score:q.reduce((s,v,j)=>s+v*docs[i][j],0)})).sort((a,b)=>b.score-a.score));
  postMessage({type:'result',id,results});
 }catch(e){postMessage({type:'error',id,error:'The local language model could not load or run. Check your connection or choose a topic manually.'});}
};
