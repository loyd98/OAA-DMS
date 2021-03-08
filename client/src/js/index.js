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

// View Controller

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
