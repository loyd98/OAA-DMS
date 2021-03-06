const getDonorsSortedByName = () => {
  currentSortItem = "accountName";
  sortBySpan.textContent = currentSortItem;
  axios
    .get(`${url}/donors/byname`)
    .then((response) => response.data)
    .then((result) => initView(result))
    .catch((error) => console.log(error));
};

nav.addEventListener("click", () => {
  console.log("clicked");
  getDonorsSortedByName();
});
