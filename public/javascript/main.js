import { initFileInput } from "./fileInput.js";
import { setupUpdateModal } from "./populateUpdateModal.js";
import { populateDeleteModal } from "./populateDeleteModal.js";
import { initScrollToItem } from "./scrollToItem.js";
import { setToast } from "./setToasts.js";

window.setToast = setToast;

document.addEventListener("DOMContentLoaded", () => {
  initFileInput();
  setupUpdateModal();
  populateDeleteModal();
  initScrollToItem();
});
