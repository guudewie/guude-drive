export function initFileInput() {
  const UPLOADMODAL = document.getElementById("upload-modal");
  const DROPZONE = document.getElementById("dropzone");
  const FILEINPUT = document.getElementById("dropzone-file");
  const FILENAMESECTION = document.getElementById("file-names");
  const SUBMIT = document.querySelector('button[type="submit"]');

  const allFiles = new DataTransfer();

  function updateFileList(newFiles) {
    // Append newFiles to allFiles
    for (const file of newFiles) {
      allFiles.items.add(file);
    }

    refreshFileInput();
  }

  function refreshFileInput() {
    // Update fileInput
    const dataTransfer = new DataTransfer();
    for (const file of allFiles.files) {
      dataTransfer.items.add(file);
    }
    FILEINPUT.files = dataTransfer.files;

    // Update file names display
    FILENAMESECTION.innerHTML = "";
    Array.from(FILEINPUT.files).forEach((file, index) => {
      const fileWrapper = document.createElement("div");
      fileWrapper.classList.add(
        "flex",
        "justify-start",
        "items-center",
        "gap-2",
        "py-0.5",
        "text-xs",
        "text-gray-400"
      );

      const fileNameElem = document.createElement("p");
      fileNameElem.textContent = file.name;

      const deleteIcon = document.createElement("span");
      deleteIcon.innerHTML = "&#128465;"; //trash can icon
      deleteIcon.classList.add("cursor-pointer");
      deleteIcon.addEventListener("click", () => removeFile(index));

      fileWrapper.appendChild(deleteIcon);
      fileWrapper.appendChild(fileNameElem);
      FILENAMESECTION.appendChild(fileWrapper);
    });

    updateSubmitButton();
    console.log(FILEINPUT.files);
  }

  function removeFile(index) {
    allFiles.items.remove(index);
    refreshFileInput();
  }

  function updateSubmitButton() {
    if (allFiles.items.length < 1) {
      SUBMIT.setAttribute("disabled", "");
    } else {
      SUBMIT.removeAttribute("disabled");
    }
  }

  // Handle drag & drop
  DROPZONE.addEventListener("dragover", (event) => {
    event.preventDefault();
    DROPZONE.classList.add("bg-gray-800");
  });

  DROPZONE.addEventListener("dragleave", () => {
    DROPZONE.classList.remove("bg-gray-800");
  });

  DROPZONE.addEventListener("drop", (event) => {
    event.preventDefault();
    DROPZONE.classList.remove("bg-gray-800");

    updateFileList(event.dataTransfer.files);
  });

  // Handle file selection from input
  FILEINPUT.addEventListener("change", function (event) {
    event.preventDefault();

    updateFileList(event.target.files);
  });
}
