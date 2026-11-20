/* Local-only demo authentication. Not suitable for production credentials. */
document.addEventListener("DOMContentLoaded", () => {
  const register = document.getElementById("registerForm");
  if (register) register.addEventListener("submit", event => {
    event.preventDefault();
    const data = getFormData(register);
    const feedback = document.getElementById("registerFeedback");
    if (data.password !== data.confirmPassword) { feedback.textContent = "Passwords do not match."; feedback.className = "form-feedback error"; return; }
    if (!validatePhone(data.phone)) { feedback.textContent = "Enter a valid 10-digit Indian mobile number."; feedback.className = "form-feedback error"; return; }
    const user = { id: generateId("USR"), name: data.name.trim(), email: data.email.trim().toLowerCase(), phone: data.phone.replace(/\D/g,""), password: data.password, role: "user", createdAt: new Date().toISOString() };
    const result = UserStorage.add(user);
    feedback.textContent = result.success ? "Account created. You can now sign in." : result.message;
    feedback.className = "form-feedback" + (result.success ? "" : " error");
    if (result.success) register.reset();
  });

  const login = document.getElementById("loginForm");
  if (login) login.addEventListener("submit", event => {
    event.preventDefault();
    const data = getFormData(login);
    const admin = Storage.get(STORAGE_KEYS.admin, null);
    let user = UserStorage.findByEmail(data.email);
    if (user && user.password === data.password) {
      SessionStorage.setCurrentUser(user); location.href = "dashboard.html"; return;
    }
    if (admin && admin.email === String(data.email).toLowerCase() && admin.password === data.password) {
      SessionStorage.setCurrentUser({ id:"ADMIN", name:admin.name, email:admin.email, role:"admin" }); location.href = "admin.html"; return;
    }
    const feedback = document.getElementById("loginFeedback");
    if (feedback) { feedback.textContent = "Email or password is incorrect."; feedback.className = "form-feedback error"; }
    else showToast("Email or password is incorrect.", "error");
  });
});
