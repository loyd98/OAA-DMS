"use strict";

const url = "http://127.0.0.1:8080";

// TODO

const columns = [
  "id",
  "salutation",
  "accountName",
  "accountNumber",
  "cellphoneNumber",
  "emailAddress",
];

const otherColumns = [
  "notes",
  "createdBy",
  "creationDate",
  "lastModifiedBy",
  "lastModifiedDate",
  "companyTIN",
  "companyAddress",
  "address1",
  "address2",
  "address3",
  "address4",
  "address5",
  "phone1",
  "phone2",
  "faxNumber",
  "birthDate",
];

const donorTemplate = {
  salutation: "Mr.",
  accountName: "Merci Dunsmuir",
  accountNumber: "59-9844462",
  address1: "undefined",
  address2: "El Paso",
  address3: "El Paso",
  address4: "Texas",
  address5: "Texas88558",
  birthDate: "09/20/2019",
  cellphoneNumber: "540-555-4392",
  phone1: "915-174-7474",
  phone2: "816-912-1922",
  faxNumber: "713-582-5831",
  emailAddress: "mdunsmuir0@devhub.com",
  companyAddress: "624 Moland Parkway",
  companyTIN: "",
  notes: "",
};

Object.keys(donorTemplate).forEach((key) => {
  if (key !== "notes") {
    document.querySelector(".add .view__edit__container").insertAdjacentHTML(
      "beforebegin",
      `
      <div class="view__row flex-horizontal">
        <div class="view__input__container flex-vertical">
          <span>${key}</span>
          <input type="text" class="view__input view__input--edit" data-id="${key}">
        </div>
      </div>
    `
    );
  } else {
    document.querySelector(".add .view__edit__container").insertAdjacentHTML(
      "beforebegin",
      `
      <div class="view__row flex-horizontal">
        <div class="view__input__container flex-vertical">
          <span>${key}</span>
          <textarea type="text" class="view__input view__input--edit height--100" rows="4" data-id="${key}"></textarea>
        </div>
      </div>
    `
    );
  }
});

//////////////////////////////////////////////////////////////////
// Router
//////////////////////////////////////////////////////////////////

window.sessionStorage.setItem("path", "/login");

// Dashboard View Controller

function render(currentView, sortedAt, asc) {
  if (currentView === "donors") {
    if (sortedAt === "#") {
      if (asc === true) {
        getDonorsAsc();
      } else {
        getDonorsDesc();
      }
    }

    if (sortedAt === "accountName") {
      if (asc === true) {
        getDonorsSortedByNameAsc();
      } else {
        getDonorsSortedByNameDesc();
      }
    }
  }
}

const sortMenuOptions = ["#", "accountName"];

let currentView = "donors";
let currentlySortedAt = "#";
let isAsc = true;
