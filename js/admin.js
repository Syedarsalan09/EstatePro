document.addEventListener("DOMContentLoaded", () => {
  const loginPanel=document.getElementById("adminLoginPanel"), panel=document.getElementById("adminPanel");
  const admin=Storage.get(STORAGE_KEYS.admin,null);
  const isAdmin=()=>SessionStorage.getCurrentUser()?.role==="admin";
  const render=()=>{
    if(!isAdmin()){loginPanel.hidden=false;panel.hidden=true;return;}
    loginPanel.hidden=true;panel.hidden=false;
    const props=getAllProperties(), users=UserStorage.getAll(), messages=ContactStorage.getAll();
    document.getElementById("adminStats").innerHTML=[["Properties",props.length],["Users",users.length],["Messages",messages.length]].map(([a,b])=>`<div class="stat-card"><strong>${b}</strong><span>${a}</span></div>`).join("");
    document.getElementById("adminProperties").innerHTML=table(["Property","Owner","Status","Action"],props.map(p=>[escapeHTML(p.title),escapeHTML(p.postedBy||"EstatePro"),`<span class="status-pill ${escapeHTML(p.status)}">${escapeHTML(p.status||"available")}</span>`,p.ownerId?`<div class="admin-actions"><button data-id="${escapeHTML(p.id)}" data-status="available">Approve</button><button data-id="${escapeHTML(p.id)}" data-status="rejected">Reject</button></div>`:"Seed listing"]));
    document.getElementById("adminMessages").innerHTML=table(["Name","Email","Subject","Status"],messages.map(m=>[escapeHTML(m.name),escapeHTML(m.email),escapeHTML(m.subject),escapeHTML(m.status)]));
    document.getElementById("adminUsers").innerHTML=table(["Name","Email","Phone","Created"],users.map(u=>[escapeHTML(u.name),escapeHTML(u.email),escapeHTML(u.phone||""),formatDate(u.createdAt)]));
  };
  function table(headers,rows){return `<table class="data-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.length?rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${headers.length}">No records found.</td></tr>`}</tbody></table>`;}
  document.getElementById("adminLoginForm")?.addEventListener("submit",e=>{
    e.preventDefault();const d=getFormData(e.currentTarget);
    if(admin&&d.email.toLowerCase()===admin.email&&d.password===admin.password){
      SessionStorage.setCurrentUser({id:"ADMIN",name:admin.name,email:admin.email,role:"admin"});render();
    }else{document.getElementById("adminFeedback").textContent="Invalid admin credentials.";}
  });
  document.getElementById("adminProperties")?.addEventListener("click",e=>{
    const b=e.target.closest("button[data-id]");if(!b||!isAdmin())return;
    PropertyStorage.update(b.dataset.id,{status:b.dataset.status,verified:b.dataset.status==="available"});render();
  });
  render();
});
