document.addEventListener("DOMContentLoaded", () => {
  const user=SessionStorage.getCurrentUser();
  if(!user){location.href="login.html";return;}
  const welcome=document.getElementById("dashboardWelcome"); if(welcome)welcome.textContent=`Welcome back, ${user.name}.`;
  const mine=PropertyStorage.getByUser(user.id);
  const favs=FavoriteStorage.getByUser(user.id);
  const inquiries=InquiryStorage.getByUser(user.id);
  const stats=document.getElementById("dashboardStats");
  if(stats)stats.innerHTML=[["My listings",mine.length],["Saved properties",favs.length],["My enquiries",inquiries.length]].map(([l,v])=>`<div class="stat-card"><strong>${v}</strong><span>${l}</span></div>`).join("");
  const list=document.getElementById("myProperties");
  if(list)list.innerHTML=mine.length?mine.map(p=>`<article class="property-card"><img src="${escapeHTML(getPropertyImage(p))}" alt=""><div class="property-card-body"><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.city)} · ${escapeHTML(p.status||"pending")}</p><strong>${escapeHTML(getPropertyPrice(p))}</strong></div></article>`).join(""):renderEmptyState({title:"No listings yet",message:"Your properties will appear here after you post them.",actionText:"Post a property",actionLink:"post-property.html"});
  const inquiryBox=document.getElementById("myInquiries");
  if(inquiryBox)inquiryBox.innerHTML=inquiries.length?`<table class="data-table"><thead><tr><th>Property</th><th>Status</th><th>Date</th></tr></thead><tbody>${inquiries.map(i=>`<tr><td>${escapeHTML(i.propertyTitle||i.propertyId||"General enquiry")}</td><td>${escapeHTML(i.status)}</td><td>${formatDate(i.createdAt)}</td></tr>`).join("")}</tbody></table>`:"<p class='muted'>No enquiries recorded yet.</p>";
  document.getElementById("logoutButton")?.addEventListener("click",()=>{SessionStorage.logout();location.href="index.html";});
});
