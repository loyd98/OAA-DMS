createNewUserBtn.addEventListener("click", () => {
  loginPage.classList.add("hidden");
  registerPage.classList.remove("hidden");
});

registerReturnBtn.addEventListener("click", () => {
  loginPage.classList.remove("hidden");
  registerPage.classList.add("hidden");
});
