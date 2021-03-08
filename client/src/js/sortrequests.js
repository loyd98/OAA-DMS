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
  setView("donors", "accountName", config);
  axios
    .get(`${url}/donors/byname/desc`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsAsc = () => {
  setView("donors", "#");
  axios
    .get(`${url}/donors`, config)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

const getDonorsDesc = () => {
  setView("donors", "#", config);
  axios
    .get(`${url}/donors/desc`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};
