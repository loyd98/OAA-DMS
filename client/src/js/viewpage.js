//////////////////////////////////////////////////////////////////
// View Page
//////////////////////////////////////////////////////////////////

let isEditing = false;

viewEditBtn.addEventListener("click", () => {
  if (!isEditing) {
    isEditing = true;

    // Display the cancel button
    document
      .querySelector(".view__cancel__container")
      .classList.remove("hidden");

    // Scroll to the top
    document.querySelector(".view__details").scroll(0, 0);

    // Add borders to the inouts
    document
      .querySelectorAll(".view__input")
      .forEach((input) => input.classList.add("view__input--edit"));

    // Change the edit button into a submit button
    viewEditBtn.style.backgroundColor = "#fa983a";
    viewEditBtn.textContent = "Submit";

    // Make the inputs editablee except for the stated fields
    document.querySelectorAll(".view__details input").forEach((input) => {
      const id = input.dataset.id;
      if (
        id !== "createdBy" &&
        id !== "lastModifiedBy" &&
        id !== "creationDate" &&
        id !== "lastModifiedDate"
      ) {
        input.disabled = false;
      }
    });
  } else {
    console.log("Submit");
    isEditing = false;

    // Hide the cancel button
    document.querySelector(".view__cancel__container").classList.add("hidden");

    // Scroll to the top
    document.querySelector(".view__details").scroll(0, 0);

    // Change the submit button back into an edit button
    viewEditBtn.style.backgroundColor = "#1c3f95";
    viewEditBtn.textContent = "Edit";

    const data = {};
    // Get all inputs and compile into an object
    // Disable all inputs
    document.querySelectorAll(".view__details input").forEach((input) => {
      const id = input.dataset.id;

      if (
        id !== "createdBy" &&
        id !== "lastModifiedBy" &&
        id !== "creationDate" &&
        id !== "lastModifiedDate"
      ) {
        data[input.dataset.id] = input.value;
      }

      input.disabled = true;
    });

    console.log(data);

    // Call API
    // Add to History
    // Rerender
  }
});

viewCancelBtn.addEventListener("click", () => {
  isEditing = false;

  // Hide the cancel button
  document.querySelector(".view__cancel__container").classList.add("hidden");

  // Scroll to the top
  document.querySelector(".view__details").scroll(0, 0);

  // Change the text and color of the Edit button
  viewEditBtn.style.backgroundColor = "#1c3f95";
  viewEditBtn.textContent = "Edit";

  // Remove borders from inputs
  document
    .querySelectorAll(".view__input")
    .forEach((input) => input.classList.remove("view__input--edit"));

  // Disable inputs
  document.querySelectorAll(".view__details input").forEach((input) => {
    input.disabled = true;
  });
});

viewCancelBtn.addEventListener("click", () => {
  if (isEditing) {
    // todo
    // prompt(
    //   "Changes have not been finalized. Either submit to make new changes or cancel to retain old data."
    // );
  } else {
    document.querySelectorAll(".view__details input").forEach((input) => {
      input.disabled = true;
    });
    viewPage.classList.toggle("hidden");
    dashboard.classList.remove("hidden");
    render(currentView, currentlySortedAt, isAsc);
  }
});
