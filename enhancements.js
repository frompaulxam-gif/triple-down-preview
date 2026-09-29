(()=>{
 const strip=document.querySelector('.td-clients');
 if(strip){const group=strip.querySelector('.td-logo-group'),copy=group.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.inert=true;copy.querySelectorAll('a').forEach(a=>a.tabIndex=-1);strip.querySelector('.td-logo-track').append(copy);const button=strip.querySelector('.td-motion');button.addEventListener('click',()=>{const paused=strip.classList.toggle('is-paused');button.setAttribute('aria-pressed',String(paused));button.innerHTML=paused?'Play logos <span aria-hidden="true">▷</span>':'Pause logos <span aria-hidden="true">Ⅱ</span>';});}
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const sync=()=>{if(reduce.matches)document.querySelectorAll('video[autoplay]').forEach(v=>v.pause());};reduce.addEventListener('change',sync);document.addEventListener('play',e=>{if(reduce.matches&&e.target.autoplay)e.target.pause()},true);sync();
})();
