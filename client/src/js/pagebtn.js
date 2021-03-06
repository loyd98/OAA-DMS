function leftPageClick(currentPage, result, widths, rowsPerPage) {
  leftPageBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    leftPageBtn.classList.add("active-blue");
  });

  leftPageBtn.addEventListener("mouseup", (e) => {
    e.preventDefault();
    leftPageBtn.classList.remove("active-blue");
    if (currentPage > 1) {
      currentPage--;
      currentPageNumEL.textContent = currentPage;
      displayTable(result, tbody, widths, rowsPerPage, currentPage);
      console.log(currentPage);
    }
  });
  return currentPage;
}

function rightPageClick(currentPage, pageSize, result, widths, rowsPerPage) {
  rightPageBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    rightPageBtn.classList.add("active-blue");
  });

  rightPageBtn.addEventListener("mouseup", (e) => {
    e.preventDefault();
    rightPageBtn.classList.remove("active-blue");
    if (currentPage < pageSize) {
      currentPage++;
      currentPageNumEL.textContent = currentPage;
      displayTable(result, tbody, widths, rowsPerPage, currentPage);
      console.log(currentPage);
    }
  });
  return currentPage;
}
