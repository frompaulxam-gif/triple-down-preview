'use strict';

const site = '../../assets/site/';
const projects = [
  {name:'Beastwang',slug:'beastwang',cover:site+'9622d6a402c2.jpg',position:'50% 50%',caption:'Underground music.\nA community built from the ground up.',category:'Music & events',description:'A Leicester-born underground dance music brand founded by Nico Singh in 2012. From intimate club nights to large multi-room events, Beastwang brings music, visual identity and a loyal community together.',focus:'Brand direction, artist booking, production, marketing and event operations.',images:['cd4618ce2ced.jpg','d44d269bda9b.jpg'],url:'https://tripledown.group/beastwang'},
  {name:'Doppler',slug:'doppler',cover:site+'4ffd9b1ea766.jpg',position:'50% 50%',caption:'A home for underground music.\nStudio, radio and community.',category:'Venue, radio & culture',description:'An independent underground music venue, online radio station and creative space in Leicester. A physical home and a wider platform for DJs, artists, broadcasters and the people around them.',focus:'Venue operations, radio programming, events, production, branding and community.',images:['d52b62913bb3.jpg','829f55322336.jpg'],url:'https://tripledown.group/doppler'},
  {name:'At One',slug:'at-one',cover:site+'ab90d04f9dd4.jpg',position:'50% 50%',caption:'House music, considered production.\nThe feeling of a room, made together.',category:'Music & events',description:'A Leicester house and electronic music event brand built around carefully selected line-ups, immersive production and a considered club experience. An approach shaped around the music and the people in the room.',focus:'Creative direction, event strategy, marketing, production and customer experience.',images:['a13c2b54109f.jpg','cce5c8059e5e.jpg'],url:'https://tripledown.group/at-one'},
  {name:'Wang Records',slug:'wang-records',cover:site+'7bfd5f6e3a84.jpg',position:'50% 50%',caption:'From the dancefloor to the record.\nIndependent sounds, a shared identity.',category:'Record label',description:'An independent UK dance music label born from Beastwang. The label takes the energy, musical knowledge and community of live events into recorded releases, giving new artists and underground sounds a platform.',focus:'A&R, release strategy, art direction, artist communication and marketing.',images:['7a7e6b77f963.jpg','39b53fb83512.png'],url:'https://tripledown.group/wang-records'},
  {name:'Audrey',slug:'audrey',cover:site+'a2c02697672f.jpg',position:'50% 50%',caption:'A bold idea, brought to life.\nHospitality with a personality.',category:'Hospitality',description:'A cocktail bar built around a distinctive identity and a complete hospitality experience. From the build and the brand to the team, drinks and customer journey, every detail helped bring Audrey to life.',focus:'Venue build, brand development, launch marketing, recruitment and operations.',images:['14a1c2a8cabc.jpg','2863087a9843.jpg'],url:'https://tripledown.group/audrey'},
  {name:'Sophy',slug:'sophy',cover:site+'44adbbdce239.jpg',position:'50% 50%',caption:'Mood, music and a little mischief.\nA bar designed to be remembered.',category:'Hospitality',description:'Our first cocktail bar build. A local property shaped into a fun, moody and memorable venue, through interior decisions, lighting, music, visual identity and the way people move through a room.',focus:'Design, venue positioning, marketing, atmosphere and customer experience.',images:['1d6997d0f6c0.jpg','1c388d9593be.jpg'],url:'https://tripledown.group/sophy'},
  {name:'Dig In',slug:'digin',cover:site+'d6f773a09da9.jpg',position:'50% 50%',caption:'Home-cooked food.\nA passion brought to the table.',category:'Food & content',description:'A short lockdown project built around food, branding and visual storytelling. Home-cooked food, photography, recipes and content became a way to explore a different kind of creative project.',focus:'Food photography, recipe ideas, branding and content creation.',images:['b89ce2662096.jpg','1ce589dc0f2a.jpg'],url:'https://tripledown.group/digin'},
  {name:'Moonshine',slug:'moonshine',cover:'../frieze/assets/moonshine.jpg',position:'50% 50%',caption:'Live music, cocktails\nand late nights in Leicester.',category:'Hospitality & content',description:'A Leicester cocktail bar and live music venue. A place where the drinks, the music and the atmosphere come together, captured through the people and moments that make a night.',focus:'Hospitality, creative content and venue marketing.',images:[],url:'https://moonshineleicester.co.uk'},
  {name:'Merchants Yard',slug:'merchants-yard',cover:'../frieze/assets/merchants-yard.webp',position:'50% 50%',caption:'Food, music and nights in the Yard.\nA gathering place with its own rhythm.',category:'Hospitality & content',description:'A gathering place for food, music and nights in the Yard. Creative content built around the setting, the people and the events that give Merchants Yard its character.',focus:'Creative content, events and venue marketing.',images:[],url:'https://merchantsyardleicester.co.uk'},
  {name:'Daal & Bass',slug:'daal-and-bass',cover:'../frieze/assets/daal-n-bass.jpg',position:'50% 44%',caption:'South Asian music culture.\nFrom Aisle by Aisle to the dancefloor.',category:'Music & content',description:'South Asian music culture brought into unexpected spaces. From Aisle by Aisle sessions to the dancefloor, Daal & Bass brings artists, DJs and audiences together.',focus:'Music, event content and creative production.',images:[],url:null}
];

const logoFiles=['beastwang.png','doppler.png','at-one.png','wang.jpg','audrey.png','sophy.png',null,'moonshine-cream.png','merchants-yard.png','daal-bass-mark.svg'];
projects.forEach((project,i)=>{project.logo=logoFiles[i]?'../../assets/'+logoFiles[i]:null;});

const gallery = document.querySelector('#gallery');
const stage = document.querySelector('#stage');
const title = document.querySelector('#project-title');
const projectBrand = document.querySelector('#project-brand');
const caption = document.querySelector('#project-caption');
const counter = document.querySelector('#current');
const counterGroup = document.querySelector('.counter');
const hint = document.querySelector('#gesture-hint');
const motionToggle = document.querySelector('#motion-toggle');
const projectLabel = document.querySelector('.project-label');
const dialog = document.querySelector('#project-dialog');
const about = document.querySelector('#about-dialog');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const tdgLogo=document.querySelector('#tdg-logo');
const introGroup=document.querySelector('#brand-intro');
const partnerRail=document.querySelector('#partner-rail');
const introCross=introGroup.querySelector('.intro-times');
const partnerWindow=introGroup.querySelector('.partner-window');
// The reference uses a horizontal optical smear: red and blue shift in
// opposite directions around a shared, horizontally blurred green channel.
// Fixed filter levels avoid rebuilding SVG primitives on every animation frame.
const photoFilters=document.createElementNS('http://www.w3.org/2000/svg','svg');
photoFilters.classList.add('photo-filters');
photoFilters.setAttribute('width','0');photoFilters.setAttribute('height','0');
photoFilters.setAttribute('aria-hidden','true');photoFilters.setAttribute('focusable','false');
photoFilters.innerHTML='<defs>'+Array.from({length:17},(_,i)=>{
  const level=i+1,strength=Math.pow(level/17,1.15);
  const blur=(16*strength).toFixed(5),offset=(13*strength).toFixed(5);
  return `<filter id="tdg-photo-smear-${level}" x="-45%" y="-30%" width="190%" height="160%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="${blur} 0" result="soft"/>
    <feOffset in="soft" dx="-${offset}" dy="0" result="red-offset"/>
    <feColorMatrix in="red-offset" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red"/>
    <feOffset in="soft" dx="${offset}" dy="0" result="blue-offset"/>
    <feColorMatrix in="blue-offset" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue"/>
    <feColorMatrix in="soft" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green"/>
    <feBlend in="red" in2="green" mode="screen" result="red-green"/>
    <feBlend in="red-green" in2="blue" mode="screen"/>
  </filter>`;
}).join('')+'</defs>';
document.body.prepend(photoFilters);
const introDuration=4500;
const count = projects.length;
const mod = (n,m) => ((n%m)+m)%m;
const introFirst=projects.findIndex(project=>project.slug==='moonshine');
const introPasses=3,introSteps=count*introPasses,introCardTurns=3;
const gatherStart=860,gatherDuration=1440,cardArrivalDuration=420;
const rushDuration=1000,brakeDuration=3500;
const motionDuration=gatherStart+gatherDuration+rushDuration+brakeDuration;
let position = reduce.matches ? 0 : introFirst;
let target = 0;
let introStart = performance.now();
let intro = !reduce.matches;
let assetsReady = reduce.matches;
let lastTime = introStart;
let selected = -1;
let cardSize = 230;
let spacing = 280;
let raf = 0;
let drag = null;
let moved = false;
let settleTimer;
let lastWheelDirection=0;
let wheelAnchor=0;
let lastWheelAt=0;
let dialogActive = false;
let returningFocus = null;
let activeFlight = null;
let flightTimer;
let closeInProgress = false;
let motionPaused=reduce.matches;
let driftVelocity=0;
let manualUntil=0;
let keyboardMode=false;

function logoNode(project){
  if(!project.logo){const text=document.createElement('span');text.className='logo-fallback';text.textContent=project.name;return text;}
  const img=new Image();img.src=project.logo;img.alt=project.name;img.decoding='sync';img.className='client-logo';
  img.addEventListener('error',()=>{const text=document.createElement('span');text.className='logo-fallback';text.textContent=project.name;img.replaceWith(text);},{once:true});
  if(project.slug==='wang-records')img.classList.add('wang-logo');
  return img;
}
// Moonshine leads a repeated reel of the ten brands, including the honest
// Dig In text fallback. The reel leaves while the photographs slow down.
const introPartners=Array.from({length:count},(_,i)=>projects[mod(i+introFirst,count)]);
const introSequence=[...Array.from({length:introPasses},()=>introPartners).flat(),introPartners[0]];
introSequence.forEach(project=>{
  const cell=document.createElement('div');cell.className='partner-cell';
  const isMoonshine=project.slug==='moonshine';
  const mark=logoNode(isMoonshine?{...project,logo:'assets/moonshine-wordmark.png'}:project);
  if(isMoonshine)mark.classList.add('moonshine-intro-logo');
  cell.append(mark);partnerRail.append(cell);
});
partnerRail.dataset.cycles=String(introPasses);partnerRail.dataset.steps=String(introSteps);
let introWidth=0,introHeight=0,logoDestination={x:24,y:24,scale:.633333};

function logoGeometry(){
  const bounds=document.querySelector('.wordmark').getBoundingClientRect();
  introWidth=gallery.clientWidth;introHeight=gallery.clientHeight;
  logoDestination={x:bounds.left,y:bounds.top,scale:bounds.width/120};
}
const clamp01=value=>Math.max(0,Math.min(1,value));
const smoothstep=value=>{const p=clamp01(value);return p*p*(3-2*p);};
// Gather every card with a modest speed increase, then accelerate immediately
// from the last arrival. The brake ends at a positive speed, shared with idle
// drift, so the logo's corner flight never leaves the photographs stationary.
function introMotion(elapsed){
  let t=Math.max(0,(elapsed-gatherStart)/1000);
  const initial=.8,gathered=1.6,peak=14,drift=.2/introCardTurns;
  const gather=gatherDuration/1000,ramp=rushDuration/1000,brake=brakeDuration/1000;
  const phases=[[initial,gathered,gather],[gathered,peak,ramp],[peak,drift,brake]];
  let distance=0,speed=initial;
  for(const [from,to,duration] of phases){
    const q=Math.min(1,t/duration);
    distance+=duration*(from*q+(to-from)*(q*q*q-.5*q*q*q*q));
    speed=from+(to-from)*q*q*(3-2*q);
    if(t<=duration)break;
    t-=duration;
    if(to===drift)distance+=t*drift;
  }
  if(elapsed<gatherStart)speed=0;
  return {distance,speed,normalisedSpeed:speed/peak};
}
const idleSpeed=introMotion(motionDuration).speed*introCardTurns;
function cardEntrance(elapsed,rank){
  const stagger=(gatherDuration-cardArrivalDuration)/(count-1);
  return clamp01((elapsed-gatherStart-rank*stagger)/cardArrivalDuration);
}
function syncMotionControl(){
  motionToggle.disabled=reduce.matches;
  motionToggle.textContent=motionPaused?'▶':'Ⅱ';
  motionToggle.setAttribute('aria-pressed',String(motionPaused));
  const label=reduce.matches?'Motion paused for reduced motion':motionPaused?'Resume motion':'Pause motion';
  motionToggle.setAttribute('aria-label',label);motionToggle.title=label;
}
// Evaluate the reference's cubic-bezier(.22,1,.36,1) on the same RAF clock.
function lockupEase(progress){
  const p=clamp01(progress);
  if(p===0||p===1)return p;
  let u=p;
  for(let i=0;i<5;i++){
    const x=3*(1-u)*(1-u)*u*.22+3*(1-u)*u*u*.36+u*u*u;
    const dx=.66*(1-u)*(1-u)+.84*(1-u)*u+1.92*u*u;
    u=clamp01(u-(x-p)/dx);
  }
  return 1-Math.pow(1-u,3);
}
function setLogoAtRest(){
  tdgLogo.style.transform=`translate3d(${logoDestination.x}px,${logoDestination.y}px,0) scale(${logoDestination.scale})`;
  tdgLogo.style.opacity='1';tdgLogo.style.filter='brightness(0) invert(1)';
  introGroup.hidden=true;
  document.body.classList.remove('intro-running');
  document.documentElement.classList.remove('intro-pending');
}
function drawIntro(elapsed,motion=introMotion(elapsed)){
  const width=introWidth,height=introHeight,mobile=width<=700;
  const startScale=(mobile?104:210)/120;
  const centreX=width/2-60*startScale;
  const centreY=height*.29-36*startScale;
  const entrance=1-Math.pow(1-clamp01(elapsed/250),3);
  const shift=lockupEase((elapsed-380)/380);
  const flight=lockupEase((elapsed-3900)/600);
  const leftX=centreX-(mobile?80:130)*shift;
  const x=leftX+(logoDestination.x-leftX)*flight;
  const y=centreY+8*(1-entrance)+(logoDestination.y-centreY)*flight;
  const scale=startScale*(.9+.1*entrance)+(logoDestination.scale-startScale)*flight;
  tdgLogo.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;
  tdgLogo.style.opacity=String(entrance);
  tdgLogo.style.filter=`brightness(0) invert(1) blur(${(7*(1-entrance)).toFixed(2)}px)`;
  const exit=1-Math.pow(1-clamp01((elapsed-3500)/240),3);
  const crossEnter=1-Math.pow(1-clamp01((elapsed-720)/140),3);
  const partnerEnter=1-Math.pow(1-clamp01((elapsed-800)/60),3);
  introGroup.style.opacity='1';
  introCross.style.opacity=String(crossEnter*(1-exit));
  introCross.style.transform=`translate(${-8*(1-crossEnter)}px,${-5*exit}px)`;
  introCross.style.filter=`blur(${(motion.normalisedSpeed*.8).toFixed(2)}px)`;
  partnerWindow.style.opacity=String(partnerEnter*(1-exit));
  partnerWindow.style.transform=`translateY(${-9*exit}px)`;
  partnerWindow.style.filter=`blur(${(3*exit).toFixed(2)}px)`;
  partnerRail.style.transform=`translate3d(0,${-Math.min(introSteps,motion.distance)*(mobile?80:100)}px,0)`;
  partnerRail.style.filter=`blur(${(motion.normalisedSpeed*3.2).toFixed(2)}px)`;
  if(elapsed>=introDuration)setLogoAtRest();
}
if(intro)document.body.classList.add('intro-running');
else introGroup.hidden=true;

const cards = projects.map((project,index) => {
  const button=document.createElement('button');
  button.className='project-card';
  button.type='button';
  button.setAttribute('aria-label',`Open ${project.name} case study`);
  button.dataset.index=index;
  button.tabIndex=index===0?0:-1;
  const img=document.createElement('img');
  img.src=project.cover;
  img.alt=project.name;
  img.draggable=false;
  img.decoding='sync';
  img.style.objectPosition=project.position;
  const fallback=document.createElement('span');fallback.className='photo-fallback';fallback.textContent=project.name;fallback.setAttribute('aria-hidden','true');
  button.append(fallback,img);
  const markLoaded=()=>{if(img.naturalWidth)button.classList.add('image-ready');};
  img.addEventListener('load',markLoaded);markLoaded();
  img.addEventListener('error',()=>{img.style.visibility='hidden';});
  button.addEventListener('click',event => {
    if(moved){event.preventDefault();return;}
    openProject(index);
  });
  stage.append(button);
  return button;
});
const cardImages=cards.map(card=>card.querySelector('img'));
const filterLevels=Array(count).fill(-1);

function dimensions(){
  const width=gallery.clientWidth,height=gallery.clientHeight;
  cardSize=width<=700?Math.min(width*.58,height*.315):Math.min(width*.155,height*.32);
  cardSize=Math.max(155,Math.min(cardSize,340));
  spacing=width<=700?cardSize*1.18:width*.19;
  stage.style.setProperty('--card-size',`${cardSize}px`);
  logoGeometry();
  if(!intro)setLogoAtRest();
  else if(!assetsReady)drawIntro(0);
  requestRender();
}

function updateLabel(index){
  if(index===selected)return;
  selected=index;
  title.textContent=projects[index].name;
  projectBrand.replaceChildren(logoNode(projects[index]));
  caption.replaceChildren(...projects[index].caption.split('\n').flatMap((line,i)=>i?[document.createElement('br'),document.createTextNode(line)]:[document.createTextNode(line)]));
  counter.textContent=String(index+1).padStart(2,'0');
  gallery.setAttribute('aria-label',`${projects[index].name}. Use left and right arrow keys to explore our work.`);
  cards.forEach((card,i)=>{card.tabIndex=i===index?0:-1;card.setAttribute('aria-current',i===index?'true':'false');});
}

function render(now){
  raf=0;
  if(document.hidden)return;
  const dt=Math.min(48,now-lastTime);lastTime=now;
  const before=position;
  let introElapsed=Infinity,motion=null;
  if(intro){
    introElapsed=Math.max(0,now-introStart);
    motion=introMotion(introElapsed);
    position=introFirst+motion.distance*introCardTurns;
    drawIntro(introElapsed,motion);
    if(introElapsed>=motionDuration){intro=false;target=position;driftVelocity=idleSpeed;setLogoAtRest();}
  }else{
    const focusedCard=keyboardMode&&document.activeElement?.closest('.project-card');
    const canDrift=!reduce.matches&&!motionPaused&&!dialogActive&&!drag&&!focusedCard&&now>=manualUntil;
    if(canDrift){
      // Integrate the recovery to idle velocity too; never snap to a new card
      // or reintroduce the old target after the opening / a manual gesture.
      const seconds=dt/1000,decay=Math.exp(-seconds/.45);
      position+=idleSpeed*seconds+(driftVelocity-idleSpeed)*.45*(1-decay);
      driftVelocity=idleSpeed+(driftVelocity-idleSpeed)*decay;
      target=position;
    }else{
      driftVelocity=0;
      const smoothing=reduce.matches?1:1-Math.exp(-dt/105);
      position+=(target-position)*smoothing;
      if(Math.abs(target-position)<.0001)position=target;
    }
  }
  const speed=Math.abs(position-before)/Math.max(dt,1)*16;
  const gatherProgress=smoothstep((introElapsed-gatherStart)/gatherDuration);
  const expansion=intro?smoothstep((introElapsed-gatherStart-gatherDuration)/rushDuration):1;
  // Keep the whole small strip on screen while cards arrive. Expand only once
  // the last fade has completed, together with the stronger acceleration.
  const compactSpread=Math.min(.38,gallery.clientWidth/(spacing*(count+1))*.8);
  const gatheredSpread=compactSpread*(.78+.22*gatherProgress);
  const spread=intro?gatheredSpread+(1-gatheredSpread)*expansion:1;
  cards.forEach((card,i)=>{
    const distance=mod(i-position+count/2,count)-count/2;
    const a=Math.abs(distance);
    const rank=mod(i-introFirst,count);
    const entrance=intro?cardEntrance(introElapsed,rank):1,arrived=smoothstep(entrance);
    const visibilityLimit=3.65+(count/2-3.65)*(1-expansion);
    const edgeFade=1-smoothstep((a-visibilityLimit+.65)/.65);
    const visible=edgeFade>.001&&entrance>0;
    card.style.visibility=visible?'visible':'hidden';
    card.style.opacity=String(arrived*edgeFade);
    if(!visible)return;
    const depth=a*22*spread;
    const yaw=Math.max(-78,Math.min(78,-distance*24));
    const x=distance*spacing*spread;
    const scale=(1+Math.min(a,3.4)*.1)*(intro?(.92+.08*arrived)*(.5+.5*spread):1);
    let y=0;
    if(intro){
      // Keep entering photographs below the lockup, including their tallest
      // projected corner. Release this guard as the TDG mark joins the header.
      const mobile=introWidth<=700,perspective=mobile?1000:1300;
      const originY=introHeight*(mobile?.54:.52);
      const centreY=introHeight*(mobile?.57:introHeight<=590?.6:.55);
      const lockupBottom=introHeight*.29+(mobile?50:65)+12;
      const nearDepth=depth+cardSize*.5*scale*Math.abs(Math.sin(yaw*Math.PI/180));
      const minimumY=originY+(lockupBottom-originY)*(1-nearDepth/perspective)-centreY+cardSize*.95*scale*.5;
      y=Math.max(-(1-arrived)*28,minimumY)*(1-lockupEase((introElapsed-3900)/600));
    }
    card.style.transform=`translate(-50%,-50%) translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,${depth.toFixed(3)}px) rotateY(${yaw.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
    card.style.zIndex=String(20-Math.round(a*3));
    const speedContribution=Math.min(intro?17:6,speed*(intro?24:18));
    const filterLevel=reduce.matches?0:Math.max(0,Math.min(17,Math.round(Math.max(0,(a-1.45)*7)+speedContribution)));
    // The rapid opening uses a small native blur so new photographs do not
    // compete with first-use multi-pass SVG rasterisation. The settled and
    // interactive gallery keeps the verified reference optical filter intact.
    const introBlur=(motion?motion.normalisedSpeed*2:0).toFixed(1);
    const filterKey=intro&&!reduce.matches?`intro-${introBlur}`:filterLevel;
    if(filterLevels[i]!==filterKey){
      cardImages[i].style.filter=intro&&!reduce.matches?`blur(${introBlur}px)`:(filterLevel?`url("#tdg-photo-smear-${filterLevel}")`:'none');
      filterLevels[i]=filterKey;
    }
  });
  projectLabel.setAttribute('aria-live',now<manualUntil?'polite':'off');
  const labelReady=!intro||(introElapsed>=introDuration&&motion.speed*introCardTurns<=2);
  projectLabel.style.opacity=labelReady?'':'0';counterGroup.style.opacity=labelReady?'':'0';
  updateLabel(labelReady?mod(Math.round(position),count):introFirst);
  const ambientPending=!reduce.matches&&!motionPaused&&!dialogActive&&!(keyboardMode&&document.activeElement?.closest('.project-card'));
  if(intro||ambientPending||Math.abs(target-position)>.0001||drag)requestRender(true);
}
function requestRender(continuing=false){if(assetsReady&&!raf){if(!continuing)lastTime=performance.now();raf=requestAnimationFrame(render);}}
function interact(){
  if(intro){intro=false;target=position;setLogoAtRest();}
  projectLabel.style.opacity='';counterGroup.style.opacity='';
  updateLabel(mod(Math.round(position),count));
  driftVelocity=0;
  manualUntil=performance.now()+1800;
  hint.classList.add('used');
  clearTimeout(settleTimer);
}
function goBy(amount){if(dialogActive)return;interact();target=Math.round(target)+amount;requestRender();}
function settle(){settleTimer=setTimeout(()=>{
  const nearest=Math.round(target);
  // A single mouse-wheel notch must advance a project, while tiny trackpad
  // movements can still return to the current photograph.
  if(nearest===wheelAnchor&&Math.abs(target-wheelAnchor)>.14&&lastWheelDirection){
    target=lastWheelDirection>0?Math.ceil(target):Math.floor(target);
  }else target=nearest;
  requestRender();
},160);}

gallery.addEventListener('wheel',event=>{
  if(dialogActive||event.ctrlKey)return;
  const now=performance.now();
  if(now-lastWheelAt>190)wheelAnchor=Math.round(target);
  lastWheelAt=now;
  event.preventDefault();interact();
  const raw=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
  lastWheelDirection=Math.sign(raw);
  const scale=event.deltaMode===1?16:event.deltaMode===2?gallery.clientWidth:1;
  target+=raw*scale/Math.max(spacing,190)*.68;
  requestRender();settle();
},{passive:false});

gallery.addEventListener('pointerdown',event=>{
  if(event.button!==0||dialogActive||event.target.closest('.gallery-footer'))return;
  keyboardMode=false;
  interact();moved=false;
  drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,lastX:event.clientX,lastTime:performance.now(),velocity:0,target};
  gallery.classList.add('dragging');
});
gallery.addEventListener('pointermove',event=>{
  if(!drag||event.pointerId!==drag.id)return;
  const dx=event.clientX-drag.startX;
  if(Math.abs(dx)>5){moved=true;gallery.setPointerCapture(event.pointerId);}
  if(!moved)return;
  const now=performance.now();
  drag.velocity=(event.clientX-drag.lastX)/Math.max(now-drag.lastTime,1);
  drag.lastX=event.clientX;drag.lastTime=now;
  manualUntil=now+1800;
  target=drag.target-dx/spacing;
  requestRender();
});
function endDrag(event){
  if(!drag||event.pointerId!==drag.id)return;
  manualUntil=performance.now()+1800;
  if(moved){target-=Math.max(-2,Math.min(2,drag.velocity*.24));target=Math.round(target);}
  drag=null;
  gallery.classList.remove('dragging');
  if(gallery.hasPointerCapture(event.pointerId))gallery.releasePointerCapture(event.pointerId);
  requestRender();
  setTimeout(()=>{moved=false;},0);
}
gallery.addEventListener('pointerup',endDrag);
gallery.addEventListener('pointercancel',endDrag);
gallery.addEventListener('lostpointercapture',()=>{drag=null;manualUntil=performance.now()+1800;gallery.classList.remove('dragging');requestRender();});
document.querySelector('#previous').addEventListener('click',()=>goBy(-1));
document.querySelector('#next').addEventListener('click',()=>goBy(1));
motionToggle.addEventListener('click',()=>{
  if(reduce.matches)return;
  if(intro){intro=false;setLogoAtRest();}
  motionPaused=!motionPaused;driftVelocity=0;target=position;manualUntil=0;
  clearTimeout(settleTimer);syncMotionControl();requestRender();
});
gallery.addEventListener('focusin',event=>{
  if(keyboardMode&&event.target.closest('.project-card')){interact();target=position;requestRender();}
});
gallery.addEventListener('focusout',()=>requestRender());
document.addEventListener('keydown',event=>{if(event.key==='Tab')keyboardMode=true;});
gallery.addEventListener('keydown',event=>{
  keyboardMode=true;
  if(dialogActive)return;
  if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(event.key)){
    event.preventDefault();
    if(event.key==='Home'){interact();target=0;requestRender();}
    else if(event.key==='End'){interact();target=count-1;requestRender();}
    else goBy(['ArrowRight','ArrowDown'].includes(event.key)?1:-1);
  }else if((event.key==='Enter'||event.key===' ')&&event.target===gallery){event.preventDefault();openProject(intro?mod(Math.round(position),count):selected);}
});

function makeFlight(image,start,end,done){
  clearTimeout(flightTimer);
  activeFlight?.remove();
  if(reduce.matches){done();return;}
  const clone=image.cloneNode();
  clone.className='flight-image';clone.alt='';clone.setAttribute('aria-hidden','true');clone.style.visibility='visible';clone.style.filter='none';
  Object.assign(clone.style,{left:`${start.left}px`,top:`${start.top}px`,width:`${start.width}px`,height:`${start.height}px`});
  dialog.append(clone);activeFlight=clone;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    clone.style.transform=`translate(${end.left-start.left}px,${end.top-start.top}px) scale(${end.width/start.width},${end.height/start.height})`;
  }));
  flightTimer=setTimeout(()=>{clone.remove();if(activeFlight===clone)activeFlight=null;done();},680);
}

function openProject(index){
  if(dialogActive||index<0)return;
  interact();
  const project=projects[index],card=cards[index];
  const start=card.getBoundingClientRect();
  target=position;
  returningFocus=card;
  const cover=document.querySelector('#detail-cover');
  cover.src=project.cover;cover.alt=project.name;cover.style.objectPosition=project.position;
  document.querySelector('#detail-title').textContent=project.name;
  document.querySelector('#detail-category').textContent=project.category;
  document.querySelector('#detail-description').textContent=project.description;
  document.querySelector('#detail-focus').textContent=project.focus;
  const link=document.querySelector('#detail-link');link.hidden=!project.url;
  if(project.url)link.href=project.url;else link.removeAttribute('href');
  const extra=document.querySelector('#detail-gallery');extra.replaceChildren();extra.hidden=!project.images.length;
  project.images.forEach((src,i)=>{const img=new Image();img.src=site+src;img.alt=`${project.name} project photography ${i+1}`;img.loading='lazy';img.decoding='async';extra.append(img);});
  dialogActive=true;dialog.showModal();dialog.scrollTop=0;
  const end=cover.getBoundingClientRect();
  cover.style.visibility='hidden';
  dialog.classList.add('ready');
  makeFlight(card.querySelector('img'),start,end,()=>{cover.style.visibility='visible';});
  document.querySelector('#detail-close').focus({preventScroll:true});
}

function closeProject(){
  if(!dialog.open||closeInProgress)return;
  closeInProgress=true;
  const cover=document.querySelector('#detail-cover');
  const complete=()=>{
    dialog.close();dialog.classList.remove('ready');cover.style.visibility='visible';
    dialogActive=false;closeInProgress=false;returningFocus?.focus({preventScroll:true});requestRender();
  };
  if(dialog.scrollTop>100||reduce.matches){clearTimeout(flightTimer);activeFlight?.remove();activeFlight=null;complete();return;}
  const start=cover.getBoundingClientRect(),end=returningFocus.getBoundingClientRect();
  cover.style.visibility='hidden';
  makeFlight(cover,start,end,complete);
}
document.querySelector('#detail-close').addEventListener('click',closeProject);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeProject();});
document.querySelector('#about-open').addEventListener('click',()=>{interact();dialogActive=true;about.showModal();document.querySelector('#about-close').focus();});
function closeAbout(){about.close();dialogActive=false;document.querySelector('#about-open').focus();requestRender();}
document.querySelector('#about-close').addEventListener('click',closeAbout);
about.addEventListener('cancel',event=>{event.preventDefault();closeAbout();});
document.querySelector('.wordmark').addEventListener('click',event=>{event.preventDefault();if(dialogActive)return;interact();target=position+((count-mod(position,count))%count);requestRender();});
addEventListener('resize',dimensions);
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden){
    if(intro){intro=false;target=position;driftVelocity=0;setLogoAtRest();}
    requestRender();
  }
});
reduce.addEventListener('change',()=>{
  if(reduce.matches){intro=false;target=position;motionPaused=true;driftVelocity=0;setLogoAtRest();}
  syncMotionControl();requestRender();
});
syncMotionControl();
dimensions();

async function warmFirstPaint(){
  if(!intro||reduce.matches||document.hidden)return;
  const unit=Math.min(cardSize,gallery.clientWidth/6,gallery.clientHeight/5);
  cards.forEach((card,i)=>{
    card.style.visibility='visible';
    card.style.transform=`translate(-50%,-50%) translate3d(${(i%5-2)*unit}px,${(Math.floor(i/5)-.5)*unit}px,0) scale(${unit/cardSize})`;
    cardImages[i].style.filter='blur(1px)';
  });
  document.documentElement.classList.add('intro-warmup');
  let timer;
  await Promise.race([
    new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))),
    new Promise(resolve=>{timer=setTimeout(resolve,120);})
  ]);
  clearTimeout(timer);
  document.documentElement.classList.remove('intro-warmup');
  filterLevels.fill(-1);
}

// The animation clock begins only when the actual photographs and logos can
// paint. A slow or failed request skips the flourish rather than spinning blanks.
async function beginWhenReady(){
  const started=performance.now();
  const essential=[tdgLogo,...cards.map(card=>card.querySelector('img')),...partnerRail.querySelectorAll('img')];
  let timer;
  const decode=image=>image.decode?image.decode().catch(()=>{}):new Promise(resolve=>{if(image.complete)resolve();else{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});}});
  const decoded=Promise.all(essential.map(decode)).then(()=>true);
  const allFinished=await Promise.race([decoded,new Promise(resolve=>{timer=setTimeout(()=>resolve(false),1800);})]);
  clearTimeout(timer);
  const allPaintable=allFinished&&essential.every(image=>image.complete&&image.naturalWidth>0);
  cards.forEach(card=>{const image=card.querySelector('img');if(image.complete&&!image.naturalWidth)image.style.visibility='hidden';});
  if(allPaintable)await warmFirstPaint();
  assetsReady=true;
  document.documentElement.classList.remove('gallery-failed');
  document.documentElement.dataset.galleryReady='true';
  document.documentElement.dataset.assetWaitMs=String(Math.round(performance.now()-started));
  clearTimeout(window.__tdgIntroWatchdog);
  if(!allPaintable||reduce.matches||!intro){intro=false;position=target=0;setLogoAtRest();}
  else{introStart=lastTime=performance.now();drawIntro(0);}
  render(performance.now());
  document.documentElement.classList.remove('intro-pending');
  requestRender();
}
beginWhenReady();
