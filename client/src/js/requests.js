const axios = require("axios");
const { set } = require("grunt");

function displayHeaders(widths) {
  columns.forEach((col) => {
    let width = 10 * col.length + 20 + "px";
    if (col === "emailAddress") {
      width = 10 * col.length + 80 + "px";
    } else if (col === "salutation") {
      width = 10 * col.length + "px";
    }

    if (col === "id") {
      col = "#";
    }

    thead.children[0].insertAdjacentHTML(
      "beforeend",
      `<td style="width: ${width};">${col}</td>`
    );
    widths.push(width);
  });
  thead.children[0].insertAdjacentHTML(
    "beforeend",
    `<td class="table__action--width"></td>`
  );
}

function displayRows(result, widths, wrapper) {
  wrapper.innerHTML = "";
  result.forEach((data) => {
    let content = "";
    columns.forEach((key, i) => {
      let text = data[key];

      if (typeof text === "string") {
        if (
          key !== "accountName" &&
          key !== "accountNumber" &&
          key !== "cellphoneNumber" &&
          (key !== "emailAddress") & (key !== "salutation")
        ) {
          text = truncate(text, 10);
        }
      }
      content += `<td style="width: ${widths[i]};">${text}</td>`;
    });

    wrapper.insertAdjacentHTML(
      "beforeend",
      `<tr>${content}${`<td class="table__action--width table__actionbtns">
      <div class=" flex-horizontal">
          <button class="table__view table__btn flex-horizontal" id="table__view" data-id="${data["id"]}"><i class="fas fa-table" id="table__view--icon" data-id="${data["id"]}"></i>View</button>
          <button class="table__delete table__btn flex-horizontal" id="table_delete" data-id="${data["id"]}""><i class="far fa-trash-alt" data-id="${data["id"]}"></i>Delete</button>
      </div>
  </td>`}</tr>`
    );
  });
}

function truncate(string, num) {
  return `${string.slice(0, num)}...`;
}

function displayTotalPages(pageSize) {
  pageSizeEl.textContent = `of ${pageSize} pages`;
}

function displayTotalEntries(length) {
  totalEntitiesEl.textContent = `Total of ${length} entries`;
}

function displayTable(items, wrapper, widths, rowsPerPage, page) {
  page--;
  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let paginatedItems = items.slice(start, end);
  displayRows(paginatedItems, widths, wrapper);
}

function getRowsPerPage(totalEntries, pageSize) {
  return Math.ceil(totalEntries / pageSize);
}

function getPageSize(totalEntries, requiredPages) {
  return Math.ceil(totalEntries / requiredPages);
}

function getRequiredPages(viewableHeight) {
  return Math.floor(viewableHeight / 50);
}

function getViewableHeight() {
  return window.innerHeight - 340;
}

function displayColumnsSelection(columns, otherColumns) {
  selectViewMenu.classList.toggle("hidden");
  selectViewMenu.innerHTML = "";
  columns.forEach((col) => {
    selectViewMenu.insertAdjacentHTML(
      "beforeend",
      `<li class="col__selection" data-id="${col}"><i class="fas fa-check-square green" data-id="${col}"></i>${col}</li>`
    );
  });
  selectViewMenu.append = otherColumns.forEach((col) => {
    selectViewMenu.insertAdjacentHTML(
      "beforeend",
      `<li class="col__selection" data-id="${col}"><i class="fas fa-check-square red" data-id="${col}"></i>${col}</li>`
    );
  });
}

function getAlignedTableHeight() {
  return (
    nav.getBoundingClientRect().bottom -
    tableContainer.getBoundingClientRect().top +
    "px"
  );
}

function clear() {
  document.querySelector("#header tr").innerHTML = "";
  tbody.innerHTML = "";
}

function initView(result) {
  clear();
  const totalEntries = result.length;

  let viewableHeight = getViewableHeight();
  let requiredPages = getRequiredPages(viewableHeight);
  let pageSize = getPageSize(totalEntries, requiredPages);
  let rowsPerPage = getRowsPerPage(totalEntries, pageSize);
  let currentPage = 1;
  const widths = [];

  displayTotalEntries(totalEntries);
  displayTotalPages(pageSize);

  displayHeaders(widths);
  displayTable(result, tbody, widths, rowsPerPage, currentPage);

  tableContainer.style.height = getAlignedTableHeight();

  currentPage = leftPageClick(currentPage, result, widths, rowsPerPage);

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
    }
  });

  window.addEventListener("resize", () => {
    tableContainer.style.height = getAlignedTableHeight();
    viewableHeight = getViewableHeight();
    requiredPages = getRequiredPages(viewableHeight);
    pageSize = getPageSize(totalEntries, requiredPages);
    rowsPerPage = getRowsPerPage(totalEntries, pageSize);
    displayTotalPages(pageSize);
    displayTable(result, tbody, widths, rowsPerPage, currentPage);
  });
}

const getDonors = () => {
  currentSortItem = "#";
  sortBySpan.textContent = currentSortItem;
  axios
    .get(`${url}/donors`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

window.addEventListener("load", () => {
  getDonors();
});
