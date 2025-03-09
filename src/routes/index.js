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

// GET /logout - logout user
router.post("/upload", authenticate, fileController.uploadFile);

/************ FOLDER ******************/

// GET /logout - logout user
router.post("/new-folder", authenticate, folderController.createNewFolder);

/************ UPDATE ******************/

// POST /logout - logout user
router.post("/update/:itemId", authenticate, itemController.updateContent);

/************ DELETE ******************/

// POST /logout - logout user
router.post("/delete/:itemId", authenticate, itemController.deleteContent);

/************ DOWNLOAD ****************/

// POST /logout - logout user
router.get("/download/:fileId", authenticate, fileController.downloadFile);

/************ 404 ******************/

router.get("*", (req, res) => {
  res.send(
    "* is a great way to catch all otherwise unmatched paths, e.g. for custom 404 error handling."
  );
});

module.exports = router;
