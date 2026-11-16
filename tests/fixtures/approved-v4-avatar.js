/* CLOSET.exe — avatares: cada personagem é a própria imagem enviada, em camadas recortadas e ajustadas ao corpo. */
(function(root){'use strict';
const W=640,H=1000,K=.625;
const characters=[
 {id:'nicole',label:'Nicole',subtitle:'Cropped e wide leg'},
 {id:'livia',label:'Lívia',subtitle:'Camiseta e jeans'},
 {id:'ana',label:'Ana',subtitle:'Provador fotográfico'},
 {id:'sophia',label:'Sophia',subtitle:'Ciganinha e saia'},
 {id:'isadora',label:'Isadora',subtitle:'Cropped e saia mini'}
];
const OWN={nicole:'white',livia:'black',ana:'white',sophia:'skirt',isadora:'mini'};
// pontos de referência do corpo, já no espaço normalizado (mesmo tamanho/eixo para todas)
const LM={
 nicole:{N:[512, 361],SR:[644, 371],hL:[393, 751],WL:[307, 789],WR:[723, 789],hR:[628, 751]},
 livia:{N:[512, 363],SR:[686, 373],hL:[393, 751],WL:[312, 830],WR:[729, 830],hR:[657, 751]},
 ana:{N:[814, 472],SR:[1014, 488],hL:[571, 1200],WL:[537, 1230],WR:[1112, 1275],hR:[1030, 1200]},
 sophia:{N:[512, 359],SR:[703, 393],hL:[390, 771],WL:[296, 840],WR:[743, 842],hR:[633, 771]},
 isadora:{N:[512, 351],SR:[700, 381],hL:[368, 819],WL:[299, 804],WR:[740, 829],hR:[681, 819]}
};
const getCharacter=id=>characters.find(c=>c.id===id)||characters[0];
const profile=id=>getCharacter(id).id;
const src=(id,layer)=>'assets/c/'+id+'_'+layer+'.webp';
const cache=new Map();
function image(path){if(!cache.has(path))cache.set(path,new Promise((ok,fail)=>{const i=new Image();i.decoding='async';i.onload=()=>ok(i);i.onerror=()=>fail(new Error('Falha ao carregar '+path));i.src=path;}));return cache.get(path);}
function layerList(look,id){
 if(id==='ana'){
  const list=['assets/ana/base.png'];
  if(look.dress)list.push('assets/ana/dress_'+look.dress.id+'.png');
  else {if(look.bottom)list.push('assets/ana/bottom_'+look.bottom.id+'.png');if(look.top)list.push('assets/ana/top_'+look.top.id+'.png');}
  if(look.shoe)list.push('assets/ana/shoe_'+look.shoe.id+'.png');
  const acc=look.accessory?.id||'none';
  // Hands and forearms occlude lower garments; hair is a separate foreground mask.
  list.push('assets/ana/arms.png','assets/ana/hair-front.png');
  if(acc!=='none')list.push('assets/ana/accessory_'+acc+'.png');
  return {list,acc:'none',head:null};
 }

 const top=look.top?.id||'orig',bottom=look.bottom?.id||OWN[id],shoe=look.shoe?.id||'white',acc=look.accessory?.id||'none';
 const bare=look.bottom?(look.bottom.kind==='shorts'||look.bottom.id==='mini'):(bottom==='denim'||bottom==='mini');
 const pair=bottom==='mini'?'mini':'denim';
 const sh=src(id,'shoe_'+shoe+(bare?'_n':'')),bt=src(id,'bot_'+bottom),longSkirt=bottom==='skirt'||bottom==='skirt_red';
 const list=(bare?[src(id,'legs_'+pair),src(id,'natlegs')]:[]).concat([src(id,'nat')],longSkirt?[sh,bt]:[bt,sh],[src(id,'top_'+top)]);
 if(acc==='band')list.push(src(id,'acc_band'));
 return {list,acc,head:src(id,'head')};
}
function drawAccessory(ctx,acc,id){
 const p=LM[id];if(!p||acc==='none'||acc==='band')return;const s=K;
 ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
 if(acc==='necklace'){
  const [x,y]=p.N;ctx.strokeStyle='#d9b56a';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo((x-44)*s,(y-18)*s);ctx.quadraticCurveTo(x*s,(y+92)*s,(x+44)*s,(y-18)*s);ctx.stroke();
  ctx.fillStyle='#f3d98d';ctx.strokeStyle='#b98f3f';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x*s,(y+38)*s,5.2,0,7);ctx.fill();ctx.stroke();
 }else if(acc==='bracelets'){
  for(const k of ['WL','WR']){const [x,y]=p[k];ctx.strokeStyle='#cfd3dc';ctx.lineWidth=3;for(let i=0;i<2;i++){ctx.beginPath();ctx.ellipse(x*s,(y+8+i*9)*s,12*s*1.5,4.2*s*1.5,0,0,7);ctx.stroke();}}
 }else if(acc==='bag-red'||acc==='bag-cream'){
  const red=acc==='bag-red',c1=red?'#b92e49':'#e6dac4',c2=red?'#7f2036':'#b69f82';
  const sx=(p.SR[0]-30)*s,sy=(p.SR[1]+4)*s,bx=(p.hL[0]+5)*s,by=(p.hL[1]+40)*s;
  ctx.strokeStyle=c2;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(sx,sy);ctx.quadraticCurveTo((sx+bx)/2+10,(sy+by)/2-10,bx,by);ctx.stroke();
  const w=86*s,h=62*s,x=bx-w*.55,y=by-h*.1;
  const g=ctx.createLinearGradient(x,y,x,y+h);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.strokeStyle=c2;ctx.lineWidth=1.5;
  ctx.beginPath();ctx.roundRect(x,y,w,h,9);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(x+1,y+h*.38);ctx.lineTo(x+w-1,y+h*.38);ctx.stroke();
  ctx.fillStyle=red?'#e6c066':'#9c8566';ctx.beginPath();ctx.arc(x+w/2,y+h*.38,4,0,7);ctx.fill();
 }
 ctx.restore();
}
async function compose(look,id){
 const {list,acc,head}=layerList(look,id);
 const imgs=await Promise.all(list.map(image)),headImg=head?await image(head):null;
 const c=document.createElement('canvas');c.width=id==='ana'?1024:W;c.height=id==='ana'?1536:H;const ctx=c.getContext('2d');ctx.imageSmoothingQuality='high';
 imgs.forEach((i,n)=>{
  ctx.drawImage(i,0,0,c.width,c.height);
 });drawAccessory(ctx,acc,id);if(headImg)ctx.drawImage(headImg,0,0,W,H);
 return c;
}
class DressingRoom{
 constructor(host){this.host=host;this.version=0;}
 async setLook(look,id){
  const token=++this.version;this.host.setAttribute('aria-busy','true');
  try{
   const canvas=await compose(look,id);if(token!==this.version)return;
   canvas.className='rig-canvas';canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Personagem '+getCharacter(id).label+' com as roupas escolhidas');
   this.host.replaceChildren(canvas);this.host.dataset.renderer='canvas';
  }catch(error){console.error('CLOSET:',error);}
  finally{if(token===this.version)this.host.setAttribute('aria-busy','false');}
 }
}
const icons={
 band:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="14" fill="none" stroke="#5b8a4a" stroke-width="3"/><circle cx="14" cy="18" r="5" fill="#c42638"/><circle cx="30" cy="12" r="5" fill="#c42638"/><circle cx="35" cy="28" r="5" fill="#c42638"/></svg>',
 necklace:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 10Q24 44 40 10" fill="none" stroke="#d9b56a" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="30" r="4.5" fill="#f3d98d" stroke="#b98f3f"/></svg>',
 'bag-red':'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 20Q24 2 36 20" fill="none" stroke="#7f2036" stroke-width="3"/><rect x="8" y="20" width="32" height="22" rx="5" fill="#b92e49" stroke="#7f2036" stroke-width="2"/><circle cx="24" cy="27" r="2.5" fill="#e6c066"/></svg>',
 'bag-cream':'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 20Q24 2 36 20" fill="none" stroke="#9c8566" stroke-width="3"/><rect x="8" y="20" width="32" height="22" rx="5" fill="#e6dac4" stroke="#b69f82" stroke-width="2"/><circle cx="24" cy="27" r="2.5" fill="#9c8566"/></svg>',
 bracelets:'<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="20" rx="14" ry="5" fill="none" stroke="#b9bcc4" stroke-width="3"/><ellipse cx="24" cy="30" rx="14" ry="5" fill="none" stroke="#b9bcc4" stroke-width="3"/></svg>'
};
function thumbnail(item,category,id='nicole'){
 if(item.id==='none')return '<span class="empty-accessory" aria-hidden="true">∅</span>';
 if(id==='ana')return '<img class="item-photo" src="assets/ana/thumbs/'+category+'_'+item.id+'.png" alt="" loading="lazy" decoding="async">';
 if(category==='accessory')return '<span class="item-photo item-icon">'+(icons[item.id]||'')+'</span>';
 const file=category==='top'?'top_'+profile(id)+'_'+item.id:category==='bottom'?'bot_'+item.id:'shoe_'+item.id;
 return '<img class="item-photo" src="assets/t/'+file+'.webp" alt="" loading="lazy" decoding="async">';
}
function portrait(id){if(id==='ana')return '<img src="assets/ana/portrait.png" alt="" draggable="false">';return '<img src="assets/t/portrait_'+profile(id)+'.webp" alt="" draggable="false">';}
const paintThumbnails=()=>{};
const api={characters,getCharacter,profile,portrait,thumbnail,paintThumbnails,DressingRoom,compose,layerList,OWN,LM};
if(typeof module!=='undefined')module.exports=api;else root.ClosetAvatar=api;
})(typeof globalThis!=='undefined'?globalThis:this);
