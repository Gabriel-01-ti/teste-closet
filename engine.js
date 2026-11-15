(function(root){
 'use strict';
 const COLORS={orig:null,red:'vermelho',blue:'azul',pink:'rosa',green:'verde',lilac:'lilás',terracotta:'terracota',navy:'azul-marinho',cream:'creme',teal:'verde-petróleo'};
 const SHAPES={
  nicole:{top:'Cropped',own:'branco',bottom:'white',ownBlack:false},
  livia:{top:'Camiseta cropped',own:'branca',bottom:'black',ownBlack:false},
  ana:{top:'Body mesh',own:'estampado',bottom:'denim',ownBlack:false},
  sophia:{top:'Blusa ciganinha',own:'branca',bottom:'skirt',ownBlack:false},
  isadora:{top:'Cropped alça',own:'preto',bottom:'mini',ownBlack:true}
 };
 const VARIANTS={
  nicole:{red:'vermelho',blue:'listrado marinho',pink:'rosa',green:'verde sálvia',lilac:'bolinhas lilás',terracotta:'terracota',navy:'azul-marinho',cream:'creme',teal:'verde-petróleo'},
  livia:{red:'vermelha',blue:'azul jeans',pink:'bolinhas rosa',green:'listrada verde',lilac:'lilás',terracotta:'terracota',navy:'azul-marinho',cream:'creme',teal:'verde-petróleo'},
  ana:{red:'vermelho',blue:'azul cobalto',pink:'rosa',green:'verde',lilac:'lilás',terracotta:'terracota',navy:'azul-marinho',cream:'creme',teal:'verde-petróleo'},
  sophia:{red:'vermelha',blue:'xadrez azul',pink:'rosa',green:'bolinhas verdes',lilac:'lilás',terracotta:'terracota',navy:'azul-marinho',cream:'creme',teal:'verde-petróleo'},
  isadora:{red:'vermelho',blue:'azul',pink:'xadrez rosa',green:'verde',lilac:'bolinhas lilás',terracotta:'terracota',navy:'azul-marinho',cream:'creme',teal:'verde-petróleo'}
 };
 const STYLE_LABELS={stripe:'listrada azul',polka:'poá rosa',check:'xadrez verde',wrap:'transpassada terracota'};
 const topBase=[
  {id:'orig',color:'#d9d3cc',price:85,formal:true,kind:'top',tags:['date','cafe','graduation','fashion']},
  {id:'red',color:'#c42638',red:true,price:70,formal:true,kind:'top',tags:['party','date','show']},
  {id:'blue',color:'#4676c8',price:60,formal:false,kind:'top',tags:['travel','cafe','show']},
  {id:'pink',color:'#eb96af',price:55,formal:false,kind:'top',tags:['date','cafe','travel']},
  {id:'green',color:'#569668',price:95,formal:true,kind:'top',tags:['graduation','fashion','travel']},
  {id:'lilac',color:'#a082cd',price:80,formal:false,kind:'top',tags:['party','show','fashion']},
  {id:'terracotta',color:'#be5b41',price:75,formal:true,kind:'top',tags:['party','date','fashion']},
  {id:'navy',color:'#23375e',price:65,formal:false,kind:'top',tags:['travel','cafe','show']},
  {id:'cream',color:'#e0d3b8',price:75,formal:true,kind:'top',tags:['graduation','date','cafe']},
  {id:'teal',color:'#368980',price:70,formal:false,kind:'top',tags:['travel','cafe','fashion']},
  {id:'stripe',color:'#4676c8',price:78,formal:false,kind:'top',style:'stripe',tags:['travel','cafe','show','fashion']},
  {id:'polka',color:'#eb96af',price:72,formal:false,kind:'top',style:'polka',tags:['date','cafe','party']},
  {id:'check',color:'#569668',price:82,formal:true,kind:'top',style:'check',tags:['graduation','fashion','travel']},
  {id:'wrap',color:'#be5b41',price:88,formal:true,kind:'top',style:'wrap',tags:['party','date','fashion']}
 ];
 const items={
  top:[],
  bottom:[
   {id:'white',name:'Calça wide leg branca',color:'#f1ece4',price:90,formal:true,kind:'pants',tags:['travel','cafe','fashion','date']},
   {id:'black',name:'Calça jeans preta wide leg',color:'#26262a',black:true,price:70,formal:false,kind:'pants',tags:['travel','cafe','show']},
   {id:'denim',name:'Short jeans claro',color:'#bcc4c4',price:60,formal:false,kind:'shorts',tags:['travel','cafe','show','party']},
   {id:'skirt',name:'Saia longa branca',color:'#f4efe8',price:100,formal:true,kind:'skirt',tags:['graduation','date','fashion']},
   {id:'mini',name:'Saia mini preta',color:'#2a2a2e',black:true,price:75,formal:true,kind:'skirt',tags:['party','show','date']},
   {id:'white_blue',name:'Calça wide leg azul',color:'#4676c8',price:85,formal:false,kind:'pants',tags:['travel','cafe','show']},
   {id:'skirt_red',name:'Saia longa vermelha',color:'#c42638',red:true,price:110,formal:true,kind:'skirt',tags:['party','graduation','date']}
  ],
  shoe:[
   {id:'white',name:'Tênis branco',color:'#f4efe8',open:true,price:80,formal:false,kind:'sneaker',tags:['travel','cafe','show','fashion']},
   {id:'black',name:'Tênis preto',color:'#26262a',black:true,price:85,formal:true,kind:'sneaker',tags:['party','fashion','date','graduation']},
   {id:'red',name:'Tênis vermelho',color:'#c42638',red:true,price:90,formal:false,kind:'sneaker',tags:['party','show','travel']}
  ],
  accessory:[
   {id:'none',name:'Sem acessório',color:'#eee8f7',price:0,kind:'none',tags:[]},
   {id:'band',name:'Bracelete de flores',color:'#c42638',red:true,price:45,kind:'band',tags:['party','date','show']},
   {id:'necklace',name:'Colar dourado',color:'#c5a15e',price:35,kind:'necklace',tags:['graduation','party','date']},
   {id:'bag-red',name:'Bolsa vermelha',color:'#b92e49',red:true,price:60,kind:'bag',tags:['fashion','date','cafe']},
   {id:'bag-cream',name:'Bolsa creme',color:'#e6dac4',price:85,kind:'bag',tags:['travel','graduation','cafe']},
   {id:'bracelets',name:'Pulseiras prateadas',color:'#b9bcc4',price:30,kind:'bracelets',tags:['cafe','travel','party']}
  ]
 };
 const categories=Object.keys(items);
 let activeCharacter='nicole';
 function topsFor(id){const sh=SHAPES[id]||SHAPES.nicole;const vr=VARIANTS[id]||VARIANTS.nicole;return topBase.map(t=>({...t,tags:[...t.tags],name:sh.top+' '+(t.id==='orig'?sh.own:(STYLE_LABELS[t.id]||vr[t.id])),black:t.id==='orig'&&sh.ownBlack}));}
 function setCharacter(id){if(!SHAPES[id])id='nicole';activeCharacter=id;items.top.splice(0,items.top.length,...topsFor(id));}
 function characterProfile(id){return SHAPES[id]?id:'nicole';}
 function ownBottom(id){return (SHAPES[id]||SHAPES.nicole).bottom;}
 setCharacter('nicole');
 const occasions=[{id:'party',name:'Festa',icon:'🪩',desc:'Brilhe até o último flash.'},{id:'date',name:'Primeiro encontro',icon:'💌',desc:'A primeira impressão é sua.'},{id:'travel',name:'Viagem',icon:'✈️',desc:'Pronta para o próximo destino.'},{id:'show',name:'Show',icon:'🎤',desc:'Seu look também é o headliner.'},{id:'graduation',name:'Formatura',icon:'🎓',desc:'Uma noite para guardar.'},{id:'cafe',name:'Café',icon:'☕',desc:'Um café. Muitos olhares.'},{id:'fashion',name:'Fashion Week',icon:'📸',desc:'A rua é sua passarela.'}];
 const rules=[{id:'elegant',name:'Precisa ser elegante',icon:'✨',help:'Ao menos 2 peças elegantes entre blusa, parte de baixo e sapato.'},{id:'red',name:'Uma peça vermelha',icon:'♥',help:'Vermelho na blusa, parte de baixo, sapato ou acessório.'},{id:'noBlack',name:'Nada de preto',icon:'✕',help:'Nenhuma peça preta: blusa, parte de baixo, sapato ou acessório.'}];
 const cards=[{id:'ripped',icon:'💔',title:'Sua saia rasgou.',desc:'Todas as saias estão bloqueadas.',short:'Sem saias'},{id:'rain',icon:'🌧️',title:'Começou a chover.',desc:'O tênis branco está bloqueado: ele sujaria na poça.',short:'Sem tênis branco'},{id:'friend',icon:'👯',title:'Look repetido!',desc:'Sua amiga apareceu com a mesma blusa. Essa peça está bloqueada.',short:'Blusa bloqueada'},{id:'budget',icon:'💳',title:'Cartão recusado.',desc:'Agora cada peça precisa custar até R$ 90.',short:'Até R$ 90 por peça'},{id:'paparazzi',icon:'📸',title:'Paparazzi!',desc:'Agora é obrigatório usar um acessório.',short:'Acessório obrigatório'}];
 const pick=(arr,rng=Math.random)=>arr[Math.floor(rng()*arr.length)];
 function available(round,category){return items[category].filter(p=>{const c=round.chaos;if(!c)return true;if(c.id==='ripped'&&p.kind==='skirt')return false;if(c.id==='rain'&&p.open)return false;if(c.id==='friend'&&p.id===c.blockedId)return false;if(c.id==='budget'&&p.price>90)return false;if(c.id==='paparazzi'&&p.id==='none')return false;return true;});}
 function ruleOK(id,look){if(id==='elegant')return ['top','bottom','shoe'].filter(c=>look[c]?.formal).length>=2;if(id==='red')return categories.some(c=>look[c]?.red);if(id==='noBlack')return !categories.some(c=>look[c]?.black);return true;}
 function complete(look){return categories.every(c=>!!look[c]);}
 function valid(round,look){return complete(look)&&round.rules.every(r=>ruleOK(r.id,look))&&categories.every(c=>available(round,c).some(p=>p.id===look[c].id));}
 function enumerate(round){const a=categories.map(c=>available(round,c));const result=[];for(const top of a[0])for(const bottom of a[1])for(const shoe of a[2])for(const accessory of a[3]){const l={top,bottom,shoe,accessory};if(valid(round,l))result.push(l);}return result;}
 function countBreakdown(round){
  const pools=Object.fromEntries(categories.map(c=>[c,available(round,c)]));
  const baseTotal=categories.reduce((n,c)=>n*items[c].length,1),total=categories.reduce((n,c)=>n*pools[c].length,1);
  const steps=round.rules.map(rule=>({id:rule.id,name:rule.name,before:0,discount:0,after:0}));
  for(const top of pools.top)for(const bottom of pools.bottom)for(const shoe of pools.shoe)for(const accessory of pools.accessory){
   const look={top,bottom,shoe,accessory};
   for(let i=0;i<steps.length;i++){if(!ruleOK(steps[i].id,look)){steps[i].discount++;break;}}
  }
  let remaining=total;for(const step of steps){step.before=remaining;remaining-=step.discount;step.after=remaining;}
  return {pools:Object.fromEntries(categories.map(c=>[c,pools[c].length])),baseTotal,total,blockedByChaos:baseTotal-total,steps,discounted:total-remaining,valid:remaining};
 }
 function createRound(rng=Math.random){const sorted=[...rules];const first=pick(sorted,rng);const second=pick(sorted.filter(r=>r!==first),rng);return {occasion:pick(occasions,rng),rules:[first,second],chaos:null};}
 function chaosOptions(round,look={}){const before=enumerate(round).length;return cards.map(c=>({...c,blockedId:c.id==='friend'?(look.top?.id||'pink'):null})).filter(c=>{const n=enumerate({...round,chaos:c}).length;return n>0&&n<before;});}
 function applyChaos(round,card){return {...round,chaos:card};}
 function answers(n,rng=Math.random){const s=new Set([n]);for(const v of [n+6,Math.max(1,n-6),n*2,Math.max(1,Math.floor(n/2)),n+12]){if(s.size===4)break;s.add(v);}const a=[...s];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function score(round,look,remaining,correct,total=60){const filled=categories.filter(c=>look[c]).length;const hits=round.rules.filter(r=>ruleOK(r.id,look)).length;const fit=['top','bottom','shoe'].filter(c=>look[c]?.tags.includes(round.occasion.id)).length;const legal=categories.every(c=>!look[c]||available(round,c).some(p=>p.id===look[c].id));const style=legal?Math.round(60*hits/round.rules.length+30*fit/3+10*filled/4):0;const speed=complete(look)?Math.round(60+40*Math.max(0,Math.min(total,remaining))/total):0;const iq=correct?100:0;return {style,speed,iq,total:style+speed+iq};}
 function rank(total){return total<=120?'Fashion Disaster 💀':total<=200?'Closet Rookie':total<=260?'It Girl ✨':'CHER WOULD APPROVE 💅';}
 const api={ownBottom,characterProfile,countBreakdown,setCharacter,items,categories,occasions,rules,cards,pick,available,ruleOK,complete,valid,enumerate,createRound,chaosOptions,applyChaos,answers,score,rank};if(typeof module!=='undefined')module.exports=api;else root.ClosetEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);