export function setToast(message) {
  // Create a new toast element for each call
  const toastElement = document.createElement("div");
  toastElement.className =
    "flex invisible fixed right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm";
  toastElement.role = "alert";
  toastElement.innerHTML = `
            <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">${message}</div>
        `;

  // Position toasts with proper stacking
  const toastContainer = document.getElementById("toast-container");

  // Get existing toasts to calculate offset
  const existingToasts = toastContainer.querySelectorAll('div[role="alert"]');

  let yOffset = 0;
  let baseOffset = 10; // Default for desktop
  if (window.innerWidth < 768) {
    baseOffset = 70; // Adjusted for 4rem navbar (assuming 4rem = ~64px + extra space)
  }

  // Calculate offset based on existing toasts (plus margin)
  existingToasts.forEach((toast) => {
    if (toast.style.visibility !== "hidden") {
      yOffset += toast.offsetHeight + 16; // 16px for margin
    }
  });

  // Add the toast to the container
  toastContainer.appendChild(toastElement);

  // Apply offset for stacking
  toastElement.style.bottom = `${yOffset + baseOffset}px`; // 20px base offset

  // Initial state - off-screen
  toastElement.style.transform = "translateX(100%)";
  toastElement.style.visibility = "visible";

  // Slide in
  setTimeout(() => {
    toastElement.style.transition =
      "transform 0.5s ease-out, opacity 0.5s ease-out";
    toastElement.style.transform = "translateX(0)";
    toastElement.style.opacity = "1";
  }, 10);

  // Slide out after delay
  setTimeout(() => {
    toastElement.style.transform = "translateX(100%)";
    toastElement.style.opacity = "0";
  }, 4500);

  // Remove from DOM after animation
  setTimeout(() => {
    toastContainer.removeChild(toastElement);

    // Optionally reposition remaining toasts
    repositionToasts();
  }, 5000);
}

// Function to reposition remaining toasts after one is removed
const repositionToasts = () => {
  const toastContainer = document.getElementById("toast-container");
  const toasts = toastContainer.querySelectorAll('div[role="alert"]');

  let yOffset = 0;
  toasts.forEach((toast) => {
    if (toast.style.visibility !== "hidden") {
      toast.style.transition = "bottom 0.3s ease-out";
      toast.style.bottom = `${yOffset + 20}px`;
      yOffset += toast.offsetHeight + 16;
    }
  });
};
