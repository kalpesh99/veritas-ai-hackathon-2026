(function(root){
const cases=[
 ['I am drinking water all the time','symptoms'],
 ['My vision is blurry lately','symptoms'],
 ['I keep getting up to pee','symptoms'],
 ['I feel exhausted and hungry','symptoms'],
 ['Can a home glucose meter diagnose me?','testing'],
 ['What does an HbA1c result mean?','testing'],
 ['My mother has diabetes should I get screened?','testing'],
 ['Do I need to fast before a blood test?','testing'],
 ['What should I ask about my insulin prescription?','management'],
 ['How do I plan my meals?','management'],
 ['Can I talk to my care team about exercise?','management'],
 ['I was diagnosed and want a daily routine','management'],
 ['Why am I feeling washed out lately?','symptoms'],
 ['What should I eat for supper?','management'],
 ['Can heredity matter?','testing']
];
if(typeof module==='object'&&module.exports)module.exports=cases;else root.VisitFixtures=cases;
})(typeof globalThis!=='undefined'?globalThis:this);
