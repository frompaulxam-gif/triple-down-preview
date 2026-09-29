(()=>{
 const buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-category]')];
 function filterProjects(filter){
  let count=0;
  cards.forEach(card=>{
   card.hidden=filter!=='All'&&card.dataset.category!==filter;
   card.classList.toggle('is-wide',!card.hidden&&count%3===0);
   if(!card.hidden)count++;
  });
  buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===filter)));
  document.querySelector('#work-count').textContent=count+' '+(count===1?'project':'projects');
 }
 buttons.forEach(button=>button.addEventListener('click',()=>filterProjects(button.dataset.filter)));
 filterProjects('All');
})();
