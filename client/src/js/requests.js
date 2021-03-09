const config = {
  headers: {
    Authorization: "Bearer " + window.sessionStorage.getItem("token"),
  },
};

const getDonorsSortedByNameAsc = () => {
  setView("donors", "accountName");
  axios
    .get(`${url}/donors/byname/asc`, config)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsSortedByNameDesc = () => {
  setView("donors", "accountName");
  axios
    .get(`${url}/donors/byname/desc`, config)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsAsc = () => {
  setView("donors", "#");
  axios
    .get(`${url}/donors/asc`, config)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsDesc = () => {
  setView("donors", "#");
  axios
    .get(`${url}/donors/desc`, config)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorById = (id) => {
  setView("donor", "#");
  axios
    .get(`${url}/donor/id/${id}`, config)
    .then((response) => response.data)
    .then((result) => initViewPage(result))
    .catch((error) => console.log(error));
};

const searchDonorsByAccountName = (accountName) => {
  setView("donor", "#");
  axios
    .get(`${url}/donor/id/${id}`, config)
    .then((response) => response.data)
    .then((result) => initViewPage(result))
    .catch((error) => console.log(error));
};
