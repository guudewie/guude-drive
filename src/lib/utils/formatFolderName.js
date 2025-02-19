const formatFolderName = (name, siblings) => {
  let formattedName = name.trim() === "" ? "Untitled Folder" : name;
  let counter = 1;

  const siblingsArray = siblings.map((folder) => folder.name);

  // If the name exists, add an identifier to make it unique
  while (siblingsArray.includes(formattedName)) {
    formattedName = `${name} (${counter})`;
    counter++;
  }

  return formattedName;
};

module.exports = formatFolderName;
