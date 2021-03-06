document.addEventListener("click", (e) => {
  if (
    (e.target && e.target.id == "table__view") ||
    (e.target && e.target.id == "table__view--icon")
  ) {
    console.log(e.target.dataset.id);
  }
});
