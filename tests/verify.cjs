const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const E=require('../engine.js'),A=require('../avatar.js'),{QuizCountdown}=require('../timer.js');let checks=0;function ok(x,m){assert(x,m);checks++;}
for(const id of A.characters.map(c=>c.id)){
 E.setCharacter(id);ok(E.items.top.length===14,'14 tops '+id);ok(E.items.bottom.length===7,'7 bottoms '+id);ok(E.items.dress.length===1,'Dress for '+id);
 for(const c of E.wardrobeCategories())for(const p of E.items[c])ok(p.price===Math.round(p.originalPrice*.75),'25% source price: '+p.name);
 for(let i=0;i<E.rules.length;i++)for(let j=i+1;j<E.rules.length;j++){
  const r={occasion:E.occasions[0],rules:[E.rules[i],E.rules[j]],chaos:null};
  const expected=(14*7+1)*3*6;ok(E.countBreakdown(r).baseTotal===expected,'Independent alternatives: '+id);
  for(const card of [null,...E.cards.map(c=>({...c,blockedId:'pink',limit:70}))]){
   const round={...r,chaos:card},looks=E.enumerate(round),b=E.countBreakdown(round);
   ok(looks.length===b.valid,'count matches enumeration '+id+' '+card?.id);ok(b.total-b.steps.reduce((n,s)=>n+s.discount,0)===b.valid,'no double subtraction');
   for(const l of looks){ok(E.valid(round,l),'every enumerated look legal');ok(!(l.dress&&(l.top||l.bottom)),'dress never combined with separates');if(card?.id==='budget')ok(E.outfitPieces(l).every(p=>p.price<=70),'valid pieces only under budget');}
  }
 }
 for(const c of E.wardrobeCategories())for(const p of E.items[c]){
  const look={top:E.items.top[0],bottom:E.items.bottom[0],shoe:E.items.shoe[0],accessory:E.items.accessory[0]};if(c==='dress'){delete look.top;delete look.bottom;}look[c]=p;
  const layers=A.layerList(look,id);for(const rel of [...layers.list,...(layers.head?[layers.head]:[])])ok(fs.existsSync(path.join(__dirname,'..',rel)),'existing sprite '+rel);
 }
 const budget={rules:[],chaos:{id:'budget',limit:70}};ok(E.available(budget,'bottom').some(p=>p.kind==='pants'),'budget leaves pants');ok(E.available(budget,'top').some(p=>p.red),'budget leaves red top');ok(E.available(budget,'shoe').some(p=>p.formal),'budget leaves elegant shoe');
}
E.setCharacter('ana');const dress=E.items.dress[0],shoe=E.items.shoe[0],accessory=E.items.accessory[0];ok(E.complete({dress,shoe,accessory}),'dress fills top and bottom');ok(!E.complete({dress,shoe}),'accessory slot required');ok(E.ruleOK('elegant',{dress,shoe,accessory}),'elegant dress covers two slots');
const empty=A.layerList({},'ana').list;ok(!empty.some(p=>/top_|bottom_|dress_/.test(p)),'removing garments truly removes their layers');
let t=0,ticks=[],expired=0;const q=new QuizCountdown({seconds:18,now:()=>t,schedule:()=>1,cancel:()=>{},onTick:s=>ticks.push(s),onExpire:()=>expired++}).start();t=17999;q.pulse();ok(expired===0&&q.remainingMs===1,'review lasts full 18 s');t=18000;q.pulse();q.pulse();ok(expired===1&&q.state==='expired','expires exactly once at 18 s');
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/ana/manifest.json')));ok(Object.keys(manifest.layers).length===33,'33 individual alpha assets');for(const [k,l]of Object.entries(manifest.layers))ok(l.alpha&&fs.existsSync(path.join(__dirname,'../assets/ana',l.file)),'asset '+k);
const preservation=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/preservation.json')));for(const [rel,expected]of Object.entries({...preservation.ana,...preservation.sourcePhotos})){const actual=crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',rel))).digest('hex');ok(actual===expected,'preserved source '+rel);}
for(const [id,p]of Object.entries(A.fitted)){ok(Object.keys(p.layers).length===33,'33 layers '+id);for(const [file,r]of Object.entries(p.layers)){const bytes=fs.readFileSync(path.join(__dirname,'..',file));ok(bytes.readUInt32BE(16)===r.w&&bytes.readUInt32BE(20)===r.h,'native sprite geometry '+file);}const list=A.layerList({},id).list;ok(!list.some(s=>/top_|bottom_|dress_/.test(s)),'empty wardrobe '+id);}
console.log('PASS · '+checks+' assertions: prices, all characters, every chaos/rule pair, dress alternatives, alpha asset references and 18 s clock.');
