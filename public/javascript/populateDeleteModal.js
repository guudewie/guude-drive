export function populateDeleteModal() {
  document
    .querySelectorAll("[data-modal-toggle='delete-item']")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        // Get data attributes
        const itemId = event.currentTarget.getAttribute("data-item-id");
        const itemName = event.currentTarget.getAttribute("data-item-name");
        const itemType = event.currentTarget.getAttribute("data-item-type");

        // Find modal elements and update them
        const modal = document.getElementById("delete-item");
        modal.querySelector("#delete-item-name").innerHTML = itemName;
        modal.querySelector("#delete-item-warning").innerHTML =
          itemType == "folder"
            ? "Are you sure you want to delete this Folder <b>and all its content</b>?"
            : "Are you sure you want to delete this File?";
        modal.querySelector(
          "#delete-item-form"
        ).action = `/delete/${itemId}?type=${itemType}`;
      });
    });
}
