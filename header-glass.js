(()=>{
  const header=document.querySelector('body[data-td-header="glass"] #header');
  if(!header)return;
  const sync=()=>header.classList.toggle('td-header-scrolled',window.scrollY>24);
  window.addEventListener('scroll',sync,{passive:true});
  window.addEventListener('pageshow',sync);
  sync();
})();
