const formatFileName = (name, siblings) => {
  let formattedName = name.trim() === "" ? "Untitled File" : name;

  let baseName = formattedName;
  let extension = "";

  const lastDotIndex = formattedName.lastIndexOf(".");
  if (lastDotIndex > 0) {
    baseName = formattedName.substring(0, lastDotIndex);
    extension = formattedName.substring(lastDotIndex);
  }

  let counter = 1;
  const siblingsArray = siblings.map((file) => file.name);

  let uniqueName = formattedName;
  while (siblingsArray.includes(uniqueName)) {
    uniqueName = `${baseName} (${counter})${extension}`;
    counter++;
  }

  return uniqueName;
};

module.exports = formatFileName;
