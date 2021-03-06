searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchField.classList.toggle("dashboard__search--expand");
    searchBtn.classList.toggle("dashboard__search--invert");
});
