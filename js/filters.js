/* Shared property filtering helpers for listing pages */
window.EstateProFilters = {
  apply(items, filters={}) {
    const q = String(filters.q||"").trim().toLowerCase();
    return items.filter(p => {
      const text = [p.title,p.city,p.locality,p.address,p.type].join(" ").toLowerCase();
      if (q && !text.includes(q)) return false;
      if (filters.listingType && filters.listingType !== "all" && p.listingType !== filters.listingType) return false;
      if (filters.type && filters.type !== "all" && p.type !== filters.type) return false;
      if (filters.minPrice && Number(p.price)<Number(filters.minPrice)) return false;
      if (filters.maxPrice && Number(p.price)>Number(filters.maxPrice)) return false;
      if (filters.bedrooms && Number(p.bedrooms)<Number(filters.bedrooms)) return false;
      return p.status !== "rejected";
    });
  },
  sort(items, sort="newest") {
    const copy=[...items];
    if(sort==="price-low") return copy.sort((a,b)=>a.price-b.price);
    if(sort==="price-high") return copy.sort((a,b)=>b.price-a.price);
    if(sort==="area") return copy.sort((a,b)=>(b.area||0)-(a.area||0));
    return copy.sort((a,b)=>String(b.postedDate||"").localeCompare(String(a.postedDate||"")));
  }
};
