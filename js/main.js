/* EstatePro shared page behaviour */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("mobileMenuToggle") || document.getElementById("mobile-menu-toggle") || document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNavigation");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  const closeAnnouncement = document.getElementById("closeAnnouncement");
  if (closeAnnouncement) {
    closeAnnouncement.addEventListener("click", () => {
      const announcementBar = closeAnnouncement.closest(".announcement-bar");
      if (announcementBar) announcementBar.hidden = true;
    });
  }
  document.querySelectorAll("[data-year], .current-year").forEach(el => el.textContent = new Date().getFullYear());
  const account = document.getElementById("navAccountLink");
  const user = window.SessionStorage?.getCurrentUser();
  if (account && user) { account.textContent = "My account"; account.href = "dashboard.html"; }
  document.querySelectorAll("[data-logout]").forEach(btn => btn.addEventListener("click", () => {
    SessionStorage.logout(); location.href = "index.html";
  }));
});
