function collapse() {
  nav.classList.add("nav--shrink");
  navLogoContainer.classList.add("nav__container--vertical");

  navBtnSpans.forEach((element) => element.classList.add("hidden"));

  navBtnIcons.forEach((element) => {
    element.classList.add("navButtonIcon--shrink");
    element.classList.remove("h-flex--center");
  });

  dashboard.style.width = "95%";
}

function uncollapse() {
  nav.classList.remove("nav--shrink");
  navLogoContainer.classList.remove("nav__container--vertical");

  navBtnSpans.forEach((element) => element.classList.remove("hidden"));

  navBtnIcons.forEach((element) => {
    element.classList.remove("navButtonIcon--shrink");
    element.classList.add("h-flex--center");
  });

  dashboard.style.width = "87%";
}

dashboard.style.width = "87%";
function timedCollapse() {
  if (!isCollapsed) {
    window.setTimeout(() => {
      collapse();
      isCollapsed = true;
    }, 2000);
  }
  window.setTimeout(() => {}, 3000);
}

function select(e, activeButton) {
  e.currentTarget.classList.add("active-white");
  if (activeButton != null && activeButton != e.currentTarget) {
    activeButton.classList.remove("active-white");
  }
}

timedCollapse();

navHomeBtn.classList.add("active-white");

navMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isCollapsed) {
    // collapse
    collapse();
    isCollapsed = true;
  } else {
    // uncollapse
    uncollapse();
    isCollapsed = false;
  }
});

navBtns.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    select(e, activeButton);
    activeButton = e.currentTarget;
  });
});
