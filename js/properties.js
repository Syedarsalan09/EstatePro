/* User-submitted property workflow */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("propertyForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const user = SessionStorage.getCurrentUser();
    if (!user) { showToast("Please sign in before posting a property.", "warning"); location.href = "login.html"; return; }
    const d = getFormData(form);
    const property = {
      id: generateId("USRPROP"), title:d.title.trim(), slug:d.title.toLowerCase().replace(/[^a-z0-9]+/g,"-"),
      type:d.type, listingType:d.listingType, category:["commercial","office"].includes(d.type)?"Commercial":"Residential",
      price:Number(d.price), area:Number(d.area), areaUnit:"sq.ft.", bedrooms:Number(d.bedrooms)||0, bathrooms:Number(d.bathrooms)||0,
      city:d.city.trim(), state:d.state.trim(), locality:d.locality.trim(), address:d.address.trim(), pincode:d.pincode,
      description:d.description.trim(), furnishing:d.furnishing, images:d.coverImage?[d.coverImage]:[], coverImage:d.coverImage||"https://placehold.co/900x650?text=EstatePro",
      features:[], amenities:[], ownerId:user.id, postedBy:user.name, postedDate:new Date().toISOString().slice(0,10),
      status:"pending", verified:false, featured:false
    };
    const result = PropertyStorage.add(property);
    const feedback = document.getElementById("propertyFeedback");
    feedback.textContent = result.success ? "Your property has been saved and is pending admin review in this browser." : result.message;
    feedback.className = "form-feedback" + (result.success ? "" : " error");
    if (result.success) form.reset();
  });
});
