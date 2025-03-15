export function setupShareModal() {
  document
    .querySelectorAll("[data-modal-toggle='share-modal']")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        // Get data attributes
        console.log("test");
        const itemId = event.currentTarget.getAttribute("data-item-id");
        const itemName = event.currentTarget.getAttribute("data-item-name");
        const itemType = event.currentTarget.getAttribute("data-item-type");

        // Find modal elements and update them
        const modal = document.getElementById("share-modal");
        modal.querySelector("#share-item-name").textContent = itemName;
        modal.querySelector(
          "#share-folder-form"
        ).action = `/update/${itemId}?type=${itemType}`;
      });
    });
}
