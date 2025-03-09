export function initScrollToItem() {
  // Restore scroll position to the edited item
  const itemName = localStorage.getItem("itemName");
  if (itemName) {
    // select all th elements, then compare their text content with the name of the edited
    const item = [...document.querySelectorAll("th")].find(
      (th) => th.textContent.trim() === `${itemName}`
    );
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    localStorage.removeItem("itemName");
  }

  // Save edited item name before form submission
  const updateForm = document.querySelector("#update-item-form");
  updateForm.addEventListener("submit", function () {
    const itemName = updateForm.querySelector("[name='name']").value;
    localStorage.setItem("itemName", itemName);
  });

  const createFolderForm = document.querySelector("#add-folder-form");
  createFolderForm.addEventListener("submit", function () {
    const itemName = createFolderForm.querySelector("[name='name']").value;
    localStorage.setItem("itemName", itemName);
  });
}
