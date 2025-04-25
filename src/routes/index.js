const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authController = require("../controllers/auth");
const mainController = require("../controllers/main");
const fileController = require("../controllers/file");
const folderController = require("../controllers/folder");
const itemController = require("../controllers/items");

// GET - main page
router.get("/my-drive/:folderId?", authenticate, mainController.getMainPage);
router.get("/", (req, res) => res.redirect("/my-drive"));

/************* LOGIN ******************/

// GET /login - render login page
router.get("/login", authController.getLoginForm);

// POST /login - login user
router.post("/login", authController.login);

/************ SIGNUP ******************/

// GET /signup - render sign up page
router.get("/signup", authController.getSignupForm);

// POST /login - login user
router.post("/signup", authController.signup);

/************ LOGOUT ******************/

// GET /logout - logout user
router.get("/logout", authController.logout);

/************ UPLOAD ******************/

// POST /upload - upload file
router.post("/upload", authenticate, fileController.uploadFile);

/************ FOLDER ******************/

// POST /new-folder - create new folder
router.post("/new-folder", authenticate, folderController.createNewFolder);

/************ UPDATE ******************/

// POST /update/:itemId - update item (folder/file) name
router.post("/update/:itemId", authenticate, itemController.updateContent);

/************ DELETE ******************/

// POST /delete/:itemId - delete item (folder/file)
router.post("/delete/:itemId", authenticate, itemController.deleteContent);

/************ DOWNLOAD ****************/

// POST /download/:fileId - download file
router.get("/download/:fileId", authenticate, fileController.downloadFile);

// POST /download-shared/:fileId - download file
router.get(
  "/download-shared/:folderId/:fileId",
  fileController.downloadSharedFile
);

/************ GENERATE SHARE ****************/

// POST /request-share - add folder to share model and return share link
router.post(
  "/request-share/:folderId",
  authenticate,
  folderController.shareFolder
);

/************ GENERATE SHARE ****************/

// GET /shared-drive - access shared drive with link
router.get("/shared-drive/:folderId", mainController.getMainPageShared);

/************ 404 ******************/

router.get("*", (req, res) => {
  res.send(
    "* is a great way to catch all otherwise unmatched paths, e.g. for custom 404 error handling."
  );
});

module.exports = router;
