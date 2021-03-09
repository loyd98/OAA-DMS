function htmlToElement(html) {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const dashboard = document.querySelector(".dashboard");
const nav = document.querySelector(".nav");
const navMenuBtn = document.querySelector("#navmenubtn");
const navLogoContainer = document.querySelector(".nav__container");
const navBtns = document.querySelectorAll(".nav__btns button");
const navBtnSpans = document.querySelectorAll(".nav__btn span");
const navBtnIcons = document.querySelectorAll(".nav__btn");
const navHomeBtn = document.querySelector("#homebtn");
const navHistoryBtn = document.querySelector("#historybtn");
const navAnalyticsBtn = document.querySelector("#analayticsbtn");
const navSettingsBtn = document.querySelector("#settingsbtn");
const leftPageBtn = document.querySelector("#leftPageBtn");
const rightPageBtn = document.querySelector("#rightPageBtn");
const pageNum = document.querySelector("#pageNum");
const searchBtn = document.querySelector(".dashboard__searchbar button");
const searchField = document.querySelector(".dashboard__searchbar input");
const tableContainer = document.querySelector(".table__container");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");
const thead = document.querySelector("#header");
const bar1 = document.querySelector(".dashboard__bar1");
const bar2 = document.querySelector(".dashboard__bar2");
const pageSizeEl = document.querySelector("#totalPages");
const totalEntitiesEl = document.querySelector("#totalModels");
const currentPageNumEL = document.querySelector("#pageNum");
const selectViewBtn = document.querySelector("#selectViewBtn");
const selectViewMenu = document.querySelector(".dahsboard__select-view-menu");
const sortBySpan = document.querySelector("#sortBy");
const sortByMenu = document.querySelector(".dashboard__sortbtn");
const sortByBtn = document.querySelector(".dashboard__sortbtn button");
const sortByModal = document.querySelector(".dahsboard__sortbtn--modal");
const ascBtn = document.querySelector("#btn--asc");
const descBtn = document.querySelector("#btn--desc");

const loginPage = document.querySelector(".login");
const createNewUserBtn = document.querySelector("#createNewUserbtn");
const proceedBtn = document.querySelector("#login__proceed--btn");

const loginForm = document.querySelector("#login__form");
const loginError = document.querySelector("#login__error");

const registerPage = document.querySelector(".register");
const registerReturnBtn = document.querySelector("#registerReturnBtn");

const viewPage = document.querySelector(".view");
const viewDetails = document.querySelectorAll(
  ".view__details .view__input__container"
);
const viewEditBtn = document.querySelector(".view__edit__btn");
const viewCancelBtn = document.querySelector(".view__back__btn");

const dashboardAddBtn = document.querySelector("#dashboard__addbtn");
const addPage = document.querySelector(".add");

let isCollapsed = false;
let activeButton = document.querySelector("#homebtn");
