createNewUserBtn.addEventListener("click", () => {
  loginPage.classList.add("hidden");
  registerPage.classList.remove("hidden");
});

registerReturnBtn.addEventListener("click", () => {
  loginPage.classList.remove("hidden");
  registerPage.classList.add("hidden");
});

proceedBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (loginForm.username.value !== "" && loginForm.password.value !== "") {
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const data = {
      username: username,
      password: password,
    };

    axios
      .post(`${url}/login`, data)
      .then((response) => {
        window.sessionStorage.setItem("token", response.data);
        loginPage.classList.add("hidden");
        nav.classList.remove("hidden");
        dashboard.classList.remove("hidden");
        render(currentView, currentlySortedAt, isAsc);
      })
      .catch((error) => {
        if (error.response.data.message === "Invalid username or password") {
          loginError.classList.remove("hidden");
          setTimeout(() => {
            loginError.classList.add("hidden");
          }, 8000);
        } else {
          loginError.textContent = error.response.data.message;
          loginError.classList.toggle("hidden");
        }
      });
  }
});
