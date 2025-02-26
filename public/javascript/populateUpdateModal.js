document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("[data-modal-toggle='update-item']")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        // Get data attributes
        const itemId = event.currentTarget.getAttribute("data-item-id");
        const itemName = event.currentTarget.getAttribute("data-item-name");
        const itemType = event.currentTarget.getAttribute("data-item-type");

        // Find modal elements and update them
        const modal = document.getElementById("update-item");
        modal.querySelector("#update-item-name").value = itemName;
        modal.querySelector(
          "#update-item-form"
        ).action = `/update/${itemId}?type=${itemType}`;
      });
    });
});
