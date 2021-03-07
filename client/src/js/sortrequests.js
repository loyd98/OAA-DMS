const getDonorsSortedByNameAsc = () => {
  setView("donors", "accountName");
  axios
    .get(`${url}/donors/byname/asc`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsSortedByNameDesc = () => {
  setView("donors", "accountName");
  axios
    .get(`${url}/donors/byname/desc`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsAsc = () => {
  setView("donors", "#");
  axios
    .get(`${url}/donors`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsDesc = () => {
  setView("donors", "#");
  axios
    .get(`${url}/donors/desc`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};
