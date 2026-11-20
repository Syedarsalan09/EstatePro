document.addEventListener("DOMContentLoaded", () => {
  const form=document.getElementById("contactForm"); if(!form)return;
  form.addEventListener("submit",e=>{
    e.preventDefault();const d=getFormData(form);
    if(!validateEmail(d.email)){showToast("Please enter a valid email address.","error");return;}
    const result=ContactStorage.add({...d,email:d.email.trim().toLowerCase()});
    const feedback=document.getElementById("contactFeedback");
    feedback.textContent=result.success?"Thank you. Your message has been saved in this browser demo.":"Unable to save your message.";
    feedback.className="form-feedback"+(result.success?"":" error");
    if(result.success)form.reset();
  });
});
