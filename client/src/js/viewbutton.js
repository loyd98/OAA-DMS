document.addEventListener("click", (e) => {
  if (
    (e.target && e.target.id == "table__view") ||
    (e.target && e.target.id == "table__view--icon")
  ) {
    const id = e.target.dataset.id;
    getDonorById(id);
  }
});
