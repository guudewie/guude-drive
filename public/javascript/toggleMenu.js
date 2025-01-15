function toggleMenu(element) {
  const menu = element.nextElementSibling;
  const isHidden = menu.classList.contains("hidden");
  document.querySelectorAll(".actionMenu").forEach((menu) => {
    menu.classList.add("hidden");
  });
  if (isHidden) {
    menu.classList.remove("hidden");
  }
}

document.addEventListener("click", function (event) {
  const isClickInside = event.target.closest(
    '.actionMenu, [onclick="toggleMenu(this)"]'
  );
  if (!isClickInside) {
    document.querySelectorAll(".actionMenu").forEach((menu) => {
      menu.classList.add("hidden");
    });
  }
});
