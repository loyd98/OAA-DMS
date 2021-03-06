let timeOutID;
const popup = document.querySelector(".popup");

document.querySelectorAll("button").forEach((el) => {
  el.addEventListener("mouseenter", (e) => {
    const target = e.currentTarget.id;
    if (!timeOutID) {
      timeOutID = window.setTimeout(() => {
        timeOutID = null;

        if (target === "coldropdownbtn") {
          popup.textContent = "Change tables";
        } else if (target === "navmenubtn") {
          popup.textContent = !isCollapsed ? "Collapse menu" : "Expand menu";
        } else if (target === "homebtn") {
          popup.textContent = "Home";
        } else if (target === "historybtn") {
          popup.textContent = "History";
        } else if (target === "analyticsbtn") {
          popup.textContent = "Analytics";
        } else if (target === "settingsbtn") {
          popup.textContent = "Settings";
        } else if (target === "searchbtn") {
          popup.textContent = "Search";
        } else if (target === "leftPageBtn") {
          popup.textContent = "Previous";
        } else if (target === "rightPageBtn") {
          popup.textContent = "Next";
        } else if (target === "btn--sort") {
          popup.textContent = "Sort dropdown";
        } else if (target === "btn--asc") {
          popup.textContent = "Sort in ascending order";
        } else if (target === "btn--desc") {
          popup.textContent = "Sort in descending order";
        } else if (target === "btn--import") {
          popup.textContent = "Import";
        } else if (target === "btn--export") {
          popup.textContent = "Export";
        }

        popup.style.left = `${e.pageX}px`;
        popup.style.top = `${e.pageY}px`;
        popup.classList.remove("hidden");
      }, 1500);
    }
  });
});

document.querySelectorAll("button").forEach((el) => {
  el.addEventListener("mouseleave", () => {
    window.clearTimeout(timeOutID);
    timeOutID = null;
    popup.classList.add("hidden");
  });
});
