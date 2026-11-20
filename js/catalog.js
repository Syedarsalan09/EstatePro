/* Render the local property catalogue on every browse and detail page. */
document.addEventListener("DOMContentLoaded", () => {
  const properties = getAllProperties().filter(property =>
    property.status !== "rejected" && property.status !== "pending"
  );
  const currentUser = SessionStorage.getCurrentUser();

  const cleanListingType = value => {
    if (value === "sale") return "buy";
    return value;
  };

  const cleanPropertyType = value => {
    if (value === "house") return "independent-house";
    if (value === "shop") return "commercial";
    return value;
  };

  const isCommercial = property =>
    property.category === "Commercial" ||
    property.type === "commercial" ||
    property.type === "office";

  const imageURL = property => {
    const url = getPropertyImage(property);
    return /^https?:\/\//i.test(url)
      ? url
      : "https://placehold.co/800x600?text=EstatePro";
  };

  const propertyCard = property => {
    const id = String(property.id);
    const href = `property-details.html?id=${encodeURIComponent(id)}`;
    const title = escapeHTML(property.title || "Property listing");
    const location = escapeHTML(
      [property.locality, property.city].filter(Boolean).join(", ") || "India"
    );
    const image = escapeHTML(imageURL(property));
    const typeLabel = escapeHTML(getPropertyTypeLabel(property.type));
    const price = escapeHTML(getPropertyPrice(property));
    const isFavorite = Boolean(
      currentUser && FavoriteStorage.isFavorite(id, currentUser.id)
    );
    const specs = [
      Number(property.bedrooms) > 0
        ? `<span>${Number(property.bedrooms)} bed</span>`
        : "",
      Number(property.bathrooms) > 0
        ? `<span>${Number(property.bathrooms)} bath</span>`
        : "",
      Number(property.area) > 0
        ? `<span>${formatNumber(property.area)} ${escapeHTML(property.areaUnit || "sq.ft.")}</span>`
        : ""
    ].filter(Boolean).join("");

    return `
      <article class="property-card">
        <div class="property-image-wrapper">
          <a href="${href}" aria-label="View ${title}">
            <img class="property-image" src="${image}" alt="${title}" loading="lazy">
          </a>
          <span class="property-badge ${property.listingType === "rent" ? "rent" : "featured"}">
            ${escapeHTML(getListingTypeLabel(property.listingType))}
          </span>
          <button class="property-favorite${isFavorite ? " active" : ""}" type="button"
            data-favorite-id="${escapeHTML(id)}" aria-label="${isFavorite ? "Remove from" : "Add to"} saved properties"
            aria-pressed="${isFavorite}">♡</button>
        </div>
        <div class="property-content">
          <p class="property-location"><span aria-hidden="true">⌖</span>${location}</p>
          <h3 class="property-title"><a href="${href}">${title}</a></h3>
          <div class="property-price">${price}</div>
          <div class="property-specifications">${specs || `<span>${typeLabel}</span>`}</div>
          <div class="property-card-footer">
            <span class="property-type">${typeLabel}</span>
            <a class="btn btn-outline btn-sm" href="${href}">View details</a>
          </div>
        </div>
      </article>
    `;
  };

  const renderGrid = (target, items, emptyState) => {
    if (!target) return;
    target.innerHTML = items.map(propertyCard).join("");
    if (emptyState) emptyState.hidden = items.length > 0;
  };

  const registerFavoriteButtons = root => {
    if (!root || root.dataset.favoriteHandler) return;
    root.dataset.favoriteHandler = "true";
    root.addEventListener("click", event => {
      const button = event.target.closest("[data-favorite-id]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();

      const user = SessionStorage.getCurrentUser();
      if (!user) {
        showToast("Sign in to save properties to your favourites.", "info");
        return;
      }

      const result = FavoriteStorage.toggle(button.dataset.favoriteId, user.id);
      if (!result.success) {
        showToast(result.message || "Unable to update saved properties.", "error");
        return;
      }

      const saved = result.isFavorite;
      button.classList.toggle("active", saved);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", `${saved ? "Remove from" : "Add to"} saved properties`);
      showToast(saved ? "Property saved to your favourites." : "Property removed from your favourites.", "success");
    });
  };

  const allGridRoots = document.querySelectorAll(
    "#featuredProperties, #recentProperties, #buyPropertiesGrid, #rentPropertiesGrid, #commercialPropertiesGrid, #propertiesGrid, #similarPropertiesGrid"
  );
  allGridRoots.forEach(registerFavoriteButtons);

  const featuredGrid = document.getElementById("featuredProperties");
  if (featuredGrid) {
    const featured = properties.filter(property => property.featured).slice(0, 6);
    renderGrid(featuredGrid, featured.length ? featured : properties.slice(0, 6));
  }

  const recentGrid = document.getElementById("recentProperties");
  if (recentGrid) {
    const recent = [...properties].sort((a, b) =>
      String(b.postedDate || "").localeCompare(String(a.postedDate || ""))
    ).slice(0, 6);
    renderGrid(recentGrid, recent);
  }

  document.querySelectorAll("[data-counter]").forEach(counter => {
    const value = Number(counter.dataset.counter);
    if (Number.isFinite(value)) counter.textContent = formatNumber(value);
  });

  const landingPages = [
    {
      gridId: "buyPropertiesGrid",
      emptyId: "buyEmptyState",
      formId: "buySearchForm",
      listingType: "buy",
      locationId: "buyLocation",
      typeId: "buyPropertyType",
      budgetId: "buyBudget",
      sectionId: "buyProperties"
    },
    {
      gridId: "rentPropertiesGrid",
      emptyId: "rentEmptyState",
      formId: "rentSearchForm",
      listingType: "rent",
      locationId: "rentLocation",
      typeId: "rentPropertyType",
      budgetId: "rentBudget",
      sectionId: "rentalProperties"
    },
    {
      gridId: "commercialPropertiesGrid",
      emptyId: "commercialEmptyState",
      formId: "commercialSearchForm",
      commercial: true,
      locationId: "commercialLocation",
      typeId: "commercialPropertyType",
      listingTypeId: "commercialListingType",
      sectionId: "commercialProperties"
    }
  ];

  landingPages.forEach(config => {
    const grid = document.getElementById(config.gridId);
    if (!grid) return;
    const emptyState = document.getElementById(config.emptyId);
    const form = document.getElementById(config.formId);

    const draw = (criteria = {}) => {
      const location = String(criteria.location || "").trim().toLowerCase();
      const selectedType = cleanPropertyType(criteria.type || "");
      const maxPrice = Number(criteria.maxPrice) || 0;
      const listingType = cleanListingType(criteria.listingType || config.listingType || "");
      const matches = properties.filter(property => {
        if (config.commercial ? !isCommercial(property) : property.listingType !== listingType) return false;
        if (criteria.listingType && config.commercial &&
            listingType !== "all" && property.listingType !== listingType) return false;
        if (selectedType && cleanPropertyType(property.type) !== selectedType) return false;
        if (location && ![property.city, property.locality, property.address]
          .join(" ").toLowerCase().includes(location)) return false;
        return !maxPrice || Number(property.price) <= maxPrice;
      });

      renderGrid(grid, matches, emptyState);
    };

    draw();

    if (form) {
      form.addEventListener("submit", event => {
        event.preventDefault();
        const data = getFormData(form);
        draw({
          location: data.location,
          type: data.propertyType,
          maxPrice: data.budget,
          listingType: data.listingType
        });
        document.getElementById(config.sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  });

  const homeSearch = document.getElementById("heroSearchForm");
  if (homeSearch) {
    const tabs = document.getElementById("searchTabs");
    let activeListing = tabs?.querySelector(".search-tab.active")?.dataset.type || "buy";

    tabs?.addEventListener("click", event => {
      const tab = event.target.closest(".search-tab");
      if (!tab) return;
      tabs.querySelectorAll(".search-tab").forEach(item => item.classList.remove("active"));
      tab.classList.add("active");
      activeListing = tab.dataset.type || "buy";
    });

    homeSearch.addEventListener("submit", event => {
      event.preventDefault();
      const data = getFormData(homeSearch);
      const params = {
        location: data.location,
        type: cleanPropertyType(data.propertyType),
        listing: activeListing === "commercial" ? "commercial" : activeListing,
        maxPrice: data.budget
      };
      navigateWithParams("properties.html", params);
    });
  }

  const listingGrid = document.getElementById("propertiesGrid");
  if (listingGrid) {
    const searchForm = document.getElementById("propertySearchForm");
    const sidebar = document.querySelector(".properties-sidebar");
    const count = document.getElementById("propertyResultsCount");
    const emptyState = document.getElementById("propertiesEmptyState");
    const pagination = document.getElementById("propertiesPagination");
    const pageSize = 9;
    let currentPage = 1;
    let state = {
      location: getURLParam("location") || "",
      listing: getURLParam("listing") || "",
      type: getURLParam("type") || "",
      minPrice: getURLParam("minPrice") || "",
      maxPrice: getURLParam("maxPrice") || "",
      bedrooms: [],
      bathrooms: "",
      sort: document.getElementById("sortProperties")?.value || "newest"
    };

    if (searchForm) {
      searchForm.elements.location.value = state.location;
      searchForm.elements.listingType.value = state.listing === "buy" ? "sale" : state.listing;
      searchForm.elements.propertyType.value = state.type;
    }

    const listingFilter = cleanListingType(state.listing);
    document.querySelectorAll("[name='filterListingType']").forEach(input => {
      input.checked = listingFilter === "commercial"
        ? input.value === "commercial"
        : Boolean(listingFilter && cleanListingType(input.value) === listingFilter);
    });
    document.querySelectorAll("[name='filterPropertyType']").forEach(input => {
      input.checked = Boolean(state.type && cleanPropertyType(input.value) === cleanPropertyType(state.type));
    });
    const minPriceInput = document.getElementById("minPrice");
    const maxPriceInput = document.getElementById("maxPrice");
    if (minPriceInput) minPriceInput.value = state.minPrice;
    if (maxPriceInput) maxPriceInput.value = state.maxPrice;

    const readSidebar = () => {
      const selectedListing = [...document.querySelectorAll("[name='filterListingType']:checked")]
        .map(input => cleanListingType(input.value));
      const selectedTypes = [...document.querySelectorAll("[name='filterPropertyType']:checked")]
        .map(input => cleanPropertyType(input.value));
      const bedrooms = [...document.querySelectorAll("[name='bedrooms']:checked")]
        .map(input => Number(input.value));
      state = {
        ...state,
        listings: selectedListing,
        types: selectedTypes,
        minPrice: document.getElementById("minPrice")?.value || "",
        maxPrice: document.getElementById("maxPrice")?.value || "",
        bedrooms,
        bathrooms: document.getElementById("filterBathrooms")?.value || ""
      };
    };

    const getResults = () => {
      const location = String(state.location || "").trim().toLowerCase();
      const listing = cleanListingType(state.listing);
      const type = cleanPropertyType(state.type);

      let results = properties.filter(property => {
        const searchable = [
          property.title, property.city, property.locality, property.address,
          property.type, property.category
        ].join(" ").toLowerCase();
        if (location && !searchable.includes(location)) return false;
        if (listing === "commercial" && !isCommercial(property)) return false;
        if (listing && listing !== "commercial" && property.listingType !== listing) return false;
        if (type && cleanPropertyType(property.type) !== type) return false;
        if (state.minPrice && Number(property.price) < Number(state.minPrice)) return false;
        if (state.maxPrice && Number(property.price) > Number(state.maxPrice)) return false;
        if (state.bedrooms?.length && !state.bedrooms.some(value =>
          value === 4 ? Number(property.bedrooms) >= 4 : Number(property.bedrooms) === value
        )) return false;
        if (state.bathrooms && Number(property.bathrooms) < Number(state.bathrooms)) return false;
        if (state.listings?.length && !state.listings.some(value =>
          value === "commercial" ? isCommercial(property) : property.listingType === value
        )) return false;
        if (state.types?.length && !state.types.includes(cleanPropertyType(property.type))) return false;
        return true;
      });

      if (state.sort === "price-low") results.sort((a, b) => Number(a.price) - Number(b.price));
      else if (state.sort === "price-high") results.sort((a, b) => Number(b.price) - Number(a.price));
      else results.sort((a, b) => String(b.postedDate || "").localeCompare(String(a.postedDate || "")));
      return results;
    };

    const drawResults = () => {
      const results = getResults();
      const pageCount = Math.ceil(results.length / pageSize);
      currentPage = Math.max(1, Math.min(currentPage, pageCount || 1));
      const visible = results.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      renderGrid(listingGrid, visible);
      if (count) count.textContent = `${results.length} ${results.length === 1 ? "property" : "properties"} found`;
      if (emptyState) emptyState.hidden = results.length > 0;

      if (pagination) {
        pagination.innerHTML = pageCount > 1
          ? `<nav class="pagination" aria-label="Property result pages">${Array.from({ length: pageCount }, (_, index) =>
              `<button type="button" class="${index + 1 === currentPage ? "active" : ""}" data-page="${index + 1}" aria-current="${index + 1 === currentPage ? "page" : "false"}">${index + 1}</button>`
            ).join("")}</nav>`
          : "";
      }
    };

    const syncURL = () => {
      const params = new URLSearchParams();
      if (state.location) params.set("location", state.location);
      if (state.listing) params.set("listing", state.listing);
      if (state.type) params.set("type", state.type);
      if (state.minPrice) params.set("minPrice", state.minPrice);
      if (state.maxPrice) params.set("maxPrice", state.maxPrice);
      const query = params.toString();
      history.replaceState({}, "", query ? `${location.pathname}?${query}` : location.pathname);
    };

    searchForm?.addEventListener("submit", event => {
      event.preventDefault();
      const data = getFormData(searchForm);
      state = {
        ...state,
        location: data.location || "",
        listing: data.listingType || "",
        type: data.propertyType || ""
      };
      currentPage = 1;
      syncURL();
      drawResults();
    });

    document.getElementById("applyFilters")?.addEventListener("click", () => {
      readSidebar();
      currentPage = 1;
      drawResults();
    });

    document.getElementById("clearFilters")?.addEventListener("click", () => {
      searchForm?.reset();
      document.querySelectorAll(
        "[name='filterListingType'], [name='filterPropertyType'], [name='bedrooms']"
      ).forEach(input => { input.checked = false; });
      ["minPrice", "maxPrice", "filterBathrooms"].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = "";
      });
      state = {
        ...state,
        location: "",
        listing: "",
        type: "",
        listings: [],
        types: [],
        minPrice: "",
        maxPrice: "",
        bedrooms: [],
        bathrooms: "",
        sort: "newest"
      };
      const sort = document.getElementById("sortProperties");
      if (sort) sort.value = "newest";
      currentPage = 1;
      syncURL();
      drawResults();
    });

    document.getElementById("resetPropertySearch")?.addEventListener("click", () => {
      document.getElementById("clearFilters")?.click();
    });

    document.getElementById("sortProperties")?.addEventListener("change", event => {
      state.sort = event.target.value;
      currentPage = 1;
      drawResults();
    });

    document.getElementById("mobileFilterToggle")?.addEventListener("click", event => {
      const open = sidebar.classList.toggle("is-open");
      event.currentTarget.setAttribute("aria-expanded", String(open));
    });

    pagination?.addEventListener("click", event => {
      const button = event.target.closest("[data-page]");
      if (!button) return;
      currentPage = Number(button.dataset.page);
      drawResults();
      document.querySelector(".properties-results")?.scrollIntoView({ behavior: "smooth" });
    });

    drawResults();
  }

  const detailsContent = document.getElementById("propertyDetailsContent");
  if (detailsContent) {
    const loading = document.getElementById("propertyDetailsLoading");
    const notFound = document.getElementById("propertyNotFound");
    const id = getURLParam("id");
    const property = getPropertyById(id);

    if (!property || property.status === "rejected") {
      if (loading) loading.hidden = true;
      if (notFound) notFound.hidden = false;
      const similarSection = document.querySelector(".similar-properties-section");
      if (similarSection) similarSection.hidden = true;
    } else {
      if (loading) loading.hidden = true;
      detailsContent.hidden = false;
      if (notFound) notFound.hidden = true;

      const setText = (elementId, value) => {
        const element = document.getElementById(elementId);
        if (element) element.textContent = value == null || value === "" ? "Not provided" : String(value);
      };
      const title = property.title || "Property details";
      const propertyLocation = [property.locality, property.city, property.state].filter(Boolean).join(", ");
      const images = property.images?.length ? property.images : [getPropertyImage(property)];

      document.title = `${title} | EstatePro`;
      setText("propertyListingBadge", getListingTypeLabel(property.listingType));
      setText("propertyTitle", title);
      setText("propertyLocation", propertyLocation);
      setText("propertyPrice", getPropertyPrice(property));
      setText("propertyStatus", property.verified ? "Verified listing" : property.status || "Available");
      setText("propertyBedrooms", Number(property.bedrooms) > 0 ? property.bedrooms : "N/A");
      setText("propertyBathrooms", Number(property.bathrooms) > 0 ? property.bathrooms : "N/A");
      setText("propertyArea", `${formatNumber(property.area)} ${property.areaUnit || "sq.ft."}`);
      setText("propertyType", getPropertyTypeLabel(property.type));
      setText("propertyDescription", property.description || "Contact the owner for more information.");
      setText("propertyId", property.id);
      setText("propertyListingType", getListingTypeLabel(property.listingType));
      setText("propertyInformationType", getPropertyTypeLabel(property.type));
      setText("propertyInformationLocation", propertyLocation);

      ["mainPropertyImage", "propertyImageTwo", "propertyImageThree"].forEach((imageId, index) => {
        const image = document.getElementById(imageId);
        if (image) {
          image.src = imageURL({ ...property, coverImage: images[index] || images[0] });
          image.alt = `${title} photo ${index + 1}`;
        }
      });

      const features = document.getElementById("propertyFeatures");
      if (features) {
        features.innerHTML = (property.features || []).length
          ? property.features.map(feature => `<div class="property-feature-item"><span>✓</span>${escapeHTML(feature)}</div>`).join("")
          : `<p>${escapeHTML(property.furnishing || "Property details available on request.")}</p>`;
      }

      const amenities = document.getElementById("propertyAmenities");
      if (amenities) {
        amenities.innerHTML = (property.amenities || []).length
          ? property.amenities.map(amenity => `<span class="property-feature-item"><span>✓</span>${escapeHTML(amenity)}</span>`).join("")
          : `<p>Contact the owner for amenity details.</p>`;
      }

      const favoriteButton = document.getElementById("favoritePropertyBtn");
      const updateFavoriteButton = () => {
        const user = SessionStorage.getCurrentUser();
        const saved = Boolean(user && FavoriteStorage.isFavorite(property.id, user.id));
        if (favoriteButton) {
          favoriteButton.textContent = saved ? "♥ Saved" : "♡ Save";
          favoriteButton.setAttribute("aria-pressed", String(saved));
        }
      };
      updateFavoriteButton();
      favoriteButton?.addEventListener("click", () => {
        const user = SessionStorage.getCurrentUser();
        if (!user) {
          showToast("Sign in to save properties to your favourites.", "info");
          return;
        }
        const result = FavoriteStorage.toggle(property.id, user.id);
        if (!result.success) {
          showToast(result.message || "Unable to update saved properties.", "error");
          return;
        }
        updateFavoriteButton();
        showToast(result.isFavorite ? "Property saved to your favourites." : "Property removed from your favourites.", "success");
      });

      document.getElementById("sharePropertyBtn")?.addEventListener("click", async () => {
        const shareData = { title, text: `View ${title} on EstatePro`, url: window.location.href };
        try {
          if (navigator.share) await navigator.share(shareData);
          else await copyToClipboard(shareData.url);
        } catch (error) {
          if (error.name !== "AbortError") showToast("Unable to share this property.", "error");
        }
      });

      const inquiryForm = document.getElementById("propertyInquiryForm");
      const user = SessionStorage.getCurrentUser();
      if (user) {
        const name = document.getElementById("inquiryName");
        const email = document.getElementById("inquiryEmail");
        const phone = document.getElementById("inquiryPhone");
        if (name) name.value = user.name || "";
        if (email) email.value = user.email || "";
        if (phone) phone.value = user.phone || "";
      }

      inquiryForm?.addEventListener("submit", event => {
        event.preventDefault();
        const data = getFormData(inquiryForm);
        const result = InquiryStorage.add({
          propertyId: property.id,
          propertyTitle: property.title,
          userId: SessionStorage.getCurrentUser()?.id || "",
          name: String(data.name || "").trim(),
          email: String(data.email || "").trim(),
          phone: String(data.phone || "").trim(),
          message: String(data.message || "").trim()
        });
        const feedback = document.getElementById("inquiryFormMessage");
        if (feedback) {
          feedback.textContent = result.success
            ? "Your enquiry has been saved. The property owner can follow up with you."
            : result.message || "Unable to save your enquiry.";
          feedback.classList.toggle("error", !result.success);
        }
        if (result.success) inquiryForm.reset();
      });

      const similarGrid = document.getElementById("similarPropertiesGrid");
      if (similarGrid) {
        const similar = properties.filter(item =>
          String(item.id) !== String(property.id) &&
          (item.type === property.type || item.category === property.category)
        ).slice(0, 3);
        renderGrid(similarGrid, similar);
      }
    }
  }
});
