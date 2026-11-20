
/* =========================================================
   ESTATEPRO - UTILITY FUNCTIONS
   File: js/utils.js
   ========================================================= */


/* ---------- DOM selectors ---------- */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

function getElement(id) {
    return document.getElementById(id);
}


/* ---------- Currency formatting ---------- */

function formatCurrency(amount, options = {}) {
    const {
        compact = false,
        maximumFractionDigits = 0
    } = options;

    const value = Number(amount) || 0;

    if (compact) {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
        }

        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2).replace(/\.?0+$/, "")} Lac`;
        }
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits
    }).format(value);
}


/* ---------- Number formatting ---------- */

function formatNumber(number) {
    return new Intl.NumberFormat("en-IN").format(
        Number(number) || 0
    );
}


/* ---------- Date formatting ---------- */

function formatDate(date, options = {}) {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...options
    }).format(parsedDate);
}


function timeAgo(date) {
    if (!date) return "";

    const timestamp = new Date(date).getTime();

    if (Number.isNaN(timestamp)) return "";

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(months / 12);

    return `${years} year${years > 1 ? "s" : ""} ago`;
}


/* ---------- Unique ID generation ---------- */

function generateId(prefix = "EP") {
    const randomPart = Math.random().toString(36).slice(2, 9).toUpperCase();

    return `${prefix}-${Date.now()}-${randomPart}`;
}


/* ---------- HTML escaping ---------- */

function escapeHTML(value) {
    const characters = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };

    return String(value ?? "").replace(
        /[&<>"']/g,
        (character) => characters[character]
    );
}


/* ---------- URL parameter helpers ---------- */

function getURLParam(name) {
    const params = new URLSearchParams(window.location.search);

    return params.get(name);
}


function setURLParams(values = {}) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(values).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
    });

    const query = params.toString();
    const newURL = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

    window.history.replaceState({}, "", newURL);
}


function navigateWithParams(page, values = {}) {
    const params = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params.set(key, value);
        }
    });

    const query = params.toString();

    window.location.href = query
        ? `${page}?${query}`
        : page;
}


/* ---------- Toast notifications ---------- */

function showToast(message, type = "success", duration = 3500) {
    let container = getElement("toastContainer");

    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const icons = {
        success: "✓",
        error: "✕",
        warning: "!",
        info: "i"
    };

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "status");

    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.textContent = icons[type] || icons.info;

    const text = document.createElement("span");
    text.className = "toast-message";
    text.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.className = "toast-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close notification");
    closeButton.textContent = "×";

    closeButton.addEventListener("click", () => {
        toast.remove();
    });

    toast.append(icon, text, closeButton);
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    const timeout = window.setTimeout(() => {
        toast.classList.remove("show");

        window.setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);

    closeButton.addEventListener("click", () => {
        window.clearTimeout(timeout);
    });

    return toast;
}


/* ---------- Loading indicators ---------- */

function showLoading(element, message = "Loading...") {
    if (!element) return;

    element.dataset.previousContent = element.innerHTML;

    element.innerHTML = `
        <div class="loading-state">
            <span class="loader"></span>
            <p>${escapeHTML(message)}</p>
        </div>
    `;

    element.setAttribute("aria-busy", "true");
}


function hideLoading(element, restoreContent = false) {
    if (!element) return;

    if (
        restoreContent &&
        element.dataset.previousContent !== undefined
    ) {
        element.innerHTML = element.dataset.previousContent;
        delete element.dataset.previousContent;
    }

    element.removeAttribute("aria-busy");
}


/* ---------- Empty state ---------- */

function renderEmptyState(options = {}) {
    const {
        title = "Nothing here yet",
        message = "There is no data to display right now.",
        icon = "⌕",
        actionText = "",
        actionLink = ""
    } = options;

    return `
        <div class="empty-state">
            <div class="empty-state-icon">${escapeHTML(icon)}</div>
            <h3>${escapeHTML(title)}</h3>
            <p>${escapeHTML(message)}</p>
            ${
                actionText && actionLink
                    ? `<a href="${escapeHTML(actionLink)}" class="btn btn-primary">${escapeHTML(actionText)}</a>`
                    : ""
            }
        </div>
    `;
}


/* ---------- Property helpers ---------- */

function getAllProperties() {
    const defaultProperties = Array.isArray(window.PROPERTIES)
        ? window.PROPERTIES
        : [];

    const userProperties = window.PropertyStorage
        ? window.PropertyStorage.getAll()
        : [];

    return [...userProperties, ...defaultProperties];
}


function getPropertyById(id) {
    if (!id) return null;

    return getAllProperties().find(
        (property) => String(property.id) === String(id)
    ) || null;
}


function getPropertyImage(property) {
    if (!property) {
        return "https://placehold.co/800x600?text=EstatePro";
    }

    return (
        property.coverImage ||
        property.images?.[0] ||
        "https://placehold.co/800x600?text=EstatePro"
    );
}


function getPropertyPrice(property) {
    if (!property) return "";

    if (property.priceLabel) {
        return property.priceLabel;
    }

    return formatCurrency(property.price);
}


function getListingTypeLabel(type) {
    const labels = {
        buy: "For Sale",
        rent: "For Rent",
        commercial: "Commercial"
    };

    return labels[type] || "Property";
}


function getPropertyTypeLabel(type) {
    const labels = {
        apartment: "Apartment",
        villa: "Villa",
        "independent-house": "Independent House",
        plot: "Residential Plot",
        commercial: "Commercial",
        office: "Office Space"
    };

    return labels[type] || "Property";
}


/* ---------- Form helpers ---------- */

function getFormData(form) {
    if (!form) return {};

    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }

            data[key].push(value);
        } else {
            data[key] = value;
        }
    }

    return data;
}


function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        String(email || "").trim()
    );
}


function validatePhone(phone) {
    const cleaned = String(phone || "").replace(/\D/g, "");

    return /^[6-9]\d{9}$/.test(cleaned);
}


function setFieldError(input, message) {
    if (!input) return;

    const field = input.closest(".form-group") || input.parentElement;

    let error = field.querySelector(".field-error");

    if (!error) {
        error = document.createElement("small");
        error.className = "field-error";
        field.appendChild(error);
    }

    error.textContent = message;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
}


function clearFieldError(input) {
    if (!input) return;

    const field = input.closest(".form-group") || input.parentElement;
    const error = field.querySelector(".field-error");

    if (error) error.remove();

    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
}


/* ---------- Scroll helpers ---------- */

function scrollToElement(selector, offset = 90) {
    const element = typeof selector === "string"
        ? $(selector)
        : selector;

    if (!element) return;

    const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

    window.scrollTo({
        top,
        behavior: "smooth"
    });
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ---------- Debounce helper ---------- */

function debounce(callback, delay = 300) {
    let timeout;

    return function (...args) {
        window.clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}


/* ---------- Copy to clipboard ---------- */

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(String(text));

        showToast("Copied to clipboard!", "success");

        return true;
    } catch (error) {
        console.error("Clipboard error:", error);

        showToast("Unable to copy text.", "error");

        return false;
    }
}


/* ---------- Make utilities globally available ---------- */

window.$ = $;
window.$$ = $$;
window.getElement = getElement;

window.formatCurrency = formatCurrency;
window.formatNumber = formatNumber;
window.formatDate = formatDate;
window.timeAgo = timeAgo;

window.generateId = generateId;
window.escapeHTML = escapeHTML;

window.getURLParam = getURLParam;
window.setURLParams = setURLParams;
window.navigateWithParams = navigateWithParams;

window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.renderEmptyState = renderEmptyState;

window.getAllProperties = getAllProperties;
window.getPropertyById = getPropertyById;
window.getPropertyImage = getPropertyImage;
window.getPropertyPrice = getPropertyPrice;
window.getListingTypeLabel = getListingTypeLabel;
window.getPropertyTypeLabel = getPropertyTypeLabel;

window.getFormData = getFormData;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.setFieldError = setFieldError;
window.clearFieldError = clearFieldError;

window.scrollToElement = scrollToElement;
window.scrollToTop = scrollToTop;
window.debounce = debounce;
window.copyToClipboard = copyToClipboard;
