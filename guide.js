// Preview only: no storage, network submission or email delivery.
(()=>{
 const form=document.querySelector('#guide-form'),email=document.querySelector('#email'),error=document.querySelector('#email-error'),request=document.querySelector('#guide-request'),success=document.querySelector('#guide-success');
 document.querySelector('#guide-submit').disabled=false;
 form.addEventListener('submit',event=>{
  event.preventDefault();
  email.value=email.value.trim();
  if(!email.checkValidity()){
   email.setAttribute('aria-invalid','true');error.hidden=false;email.focus();return;
  }
  email.removeAttribute('aria-invalid');error.hidden=true;
  form.reset();request.hidden=true;success.hidden=false;document.querySelector('.guide-panel').setAttribute('aria-labelledby','success-title');
  document.querySelector('#success-title').focus();
 });
 email.addEventListener('input',()=>{email.removeAttribute('aria-invalid');error.hidden=true});
 document.querySelector('#guide-reset').addEventListener('click',()=>{success.hidden=true;request.hidden=false;document.querySelector('.guide-panel').setAttribute('aria-labelledby','form-title');document.querySelector('#first-name').focus()});
})();
