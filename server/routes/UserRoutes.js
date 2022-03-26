const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  sendRequest,
  jwtVerify,
} = require("../controllers/User");

const {
  createHost,
  getPendingHosts,
  getHost,
  approveHost,
  rejectHost,
  getAllHosts,
} = require("../controllers/Host");

const { isHost } = require("../middlewares/isHost");
const { isAdmin } = require("../middlewares/isAdmin");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.post("/signup", signup);
router.post("/signup", signup);
router.get("/jwtVerify", jwtVerify);
router.post("/login", login);
router.post("/createHost", isHost, createHost);
router.get("/getPendingHosts", isAdmin, getPendingHosts);
router.get("/getHost/:id", getHost);
router.post("/approveHost", isAdmin, approveHost);
router.post("/rejectHost", isAdmin, rejectHost);
router.get("/getAllHosts", getAllHosts);
router.post("/sendRequest", isLoggedIn, sendRequest);
router.post("/rejectHost", isAdmin, rejectHost);
router.get("/getAllHosts", getAllHosts);

module.exports = router;
