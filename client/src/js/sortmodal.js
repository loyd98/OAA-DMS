sortByBtn.addEventListener("click", () => {
  sortByModal.classList.toggle("hidden");
  const { bottom, left } = sortByMenu.getBoundingClientRect();
  sortByModal.style.top = bottom + "px";
  sortByModal.style.left = left + "px";

  sortByModal.innerHTML = "";
  sortMenuOptions.forEach((option) => {
    sortByModal.insertAdjacentHTML("beforeend", `<button>${option}</button>`);
  });
});

sortByModal.addEventListener("click", (e) => {
  currentlySortedAt = e.target.innerText;
  if (currentView === "donors") {
    render(currentView, currentlySortedAt, true);
  }
  sortByModal.classList.add("hidden");
});
