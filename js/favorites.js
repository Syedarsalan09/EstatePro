document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("favoritesGrid");
  if (!target) return;
  const user = SessionStorage.getCurrentUser();
  if (!user) { target.innerHTML = renderEmptyState({title:"Sign in to see saved properties",message:"Your favourites are linked to your local demo account.",actionText:"Sign in",actionLink:"login.html"}); return; }
  const ids = FavoriteStorage.getByUser(user.id).map(x=>x.propertyId);
  const items = ids.map(getPropertyById).filter(Boolean);
  if (!items.length) { target.innerHTML = renderEmptyState({title:"No saved properties yet",message:"Save a property while browsing and it will appear here.",actionText:"Explore properties",actionLink:"properties.html"}); return; }
  target.innerHTML = items.map(p=>`<article class="property-card"><a href="property-details.html?id=${encodeURIComponent(p.id)}"><img src="${escapeHTML(getPropertyImage(p))}" alt="${escapeHTML(p.title)}" loading="lazy"></a><div class="property-card-body"><span class="eyebrow">${escapeHTML(getListingTypeLabel(p.listingType))}</span><h3><a href="property-details.html?id=${encodeURIComponent(p.id)}">${escapeHTML(p.title)}</a></h3><p>${escapeHTML(p.locality||"")}, ${escapeHTML(p.city||"")}</p><strong>${escapeHTML(getPropertyPrice(p))}</strong><button class="btn btn-outline remove-fav" data-id="${escapeHTML(p.id)}">Remove</button></div></article>`).join("");
  target.addEventListener("click",e=>{const b=e.target.closest(".remove-fav");if(!b)return;FavoriteStorage.remove(b.dataset.id,user.id);location.reload();});
});
