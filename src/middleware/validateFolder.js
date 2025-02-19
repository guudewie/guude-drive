const { body } = require("express-validator");
const { getFolderOfFolder } = require("../models/folderModel");

const validateFolder = body("name")
  .trim()
  .notEmpty()
  .withMessage("'Please fill in this field'")
  .isLength({ min: 3 })
  .withMessage("'Must have min. 3 characters'")
  .custom(async (value, { req }) => {
    const parentFolderId = req.query.folderId;
    const siblingFolders = await getFolderOfFolder(parentFolderId);

    console.log(siblingFolders);
    console.log(value);
    console.log(req.query.folderId);
    throw new Error("folder name already taken.");
    return true;
  });

module.exports = validateFolder;
