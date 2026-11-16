const SemanticClient=(()=>{
 let worker,serial=0;const pending=new Map();
 function fail(){for(const p of pending.values()){clearTimeout(p.timer);p.reject(new Error('Language model unavailable. Choose a topic manually; no medical conclusion has been made.'));}pending.clear();worker?.terminate();worker=null;}
 // The 180-second limit restarts whenever download progress arrives, so a slow but moving download is not cut off.
 function arm(id){const p=pending.get(id);if(!p)return;clearTimeout(p.timer);p.timer=setTimeout(()=>{pending.delete(id);p.reject(new Error('Model loading is taking too long. You can retry or choose a topic manually.'));if(!pending.size){worker?.terminate();worker=null;}},180000);}
 function rank(texts,catalog,onProgress=()=>{}){
  if(location.protocol==='file:')return Promise.reject(new Error('AI suggestions need the hosted website or a local web server. Use the live-site link below; manual browsing and notes still work here.'));
  if(!worker){worker=new Worker(new URL('semantic-worker.js?v=4',document.baseURI),{type:'module'});worker.onerror=fail;worker.onmessage=({data})=>{if(data.type==='progress'){for(const [id,p] of pending){arm(id);p.onProgress(data.text);}return;}const p=pending.get(data.id);if(!p)return;clearTimeout(p.timer);pending.delete(data.id);data.type==='error'?p.reject(new Error(data.error)):p.resolve(data.results);};}
  return new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject,timer:0,onProgress});arm(id);worker.postMessage({id,texts,catalog});});
 }
 return {rank};
})();
