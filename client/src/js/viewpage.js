const donors = [
  {
    createdBy: null,
    creationDate: null,
    lastModifiedBy: null,
    lastModifiedDate: null,
    id: 3,
    accountNumber: "59-9844462",
    accountName: "Merci Dunsmuir",
    companyTIN: 1234556,
    companyAddress: "624 Moland Parkway",
    address1: "El Paso",
    address2: "El Paso",
    address3: "El Paso",
    address4: "Texas",
    address5: "Texas88558",
    phone1: "915-174-7474",
    phone2: "816-912-1922",
    faxNumber: "713-582-5831",
    cellphoneNumber: "540-555-4392",
    emailAddress: "mdunsmuir0@devhub.com",
    salutation: "Mr.",
    birthDate: "09/20/2019",
    notes: null,
  },
  {
    createdBy: null,
    creationDate: null,
    lastModifiedBy: null,
    lastModifiedDate: null,
    id: 4,
    accountNumber: "15-8663613",
    accountName: "Britt Sebley",
    companyTIN: null,
    companyAddress: "9296 Prairieview Trail",
    address1: "Roanoke",
    address2: "Roanoke",
    address3: "Roanoke",
    address4: "Virginia",
    address5: "Virginia24034",
    phone1: "540-800-0769",
    phone2: "646-468-4595",
    faxNumber: "323-249-7179",
    cellphoneNumber: "518-198-0666",
    emailAddress: "bsebley1@ted.com",
    salutation: "Mr.",
    birthDate: "11/17/2019",
    notes: null,
  },
  {
    createdBy: null,
    creationDate: null,
    lastModifiedBy: null,
    lastModifiedDate: null,
    id: 5,
    accountNumber: "43-7576607",
    accountName: "Antonio Meindl",
    companyTIN: null,
    companyAddress: "7210 Grayhawk Point",
    address1: "Albuquerque",
    address2: "Albuquerque",
    address3: "Albuquerque",
    address4: "New Mexico",
    address5: "New Mexico87140",
    phone1: "505-749-3211",
    phone2: "772-245-4495",
    faxNumber: "910-877-9762",
    cellphoneNumber: "212-873-6025",
    emailAddress: "ameindl2@phoca.cz",
    salutation: "Mr.",
    birthDate: "03/09/2020",
    notes: null,
  },
];

const viewDetails = document.querySelectorAll(
  ".view__details .view__input__container"
);

const donor = donors[0];

viewDetails.forEach((view) => {
  const span = view.children[0];
  const input = view.children[1];
  const id = input.dataset.id;
  span.textContent = id;
  input.value = donor[id];
});
