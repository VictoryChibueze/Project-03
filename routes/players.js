const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");
const validation = require("../middleware/validate");
const isAuthenticate = require("../middleware/authenticate");

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayer);
router.post(
  "/",
  isAuthenticate.isAuthenticate,
  validation.savePlayer,
  playerController.createPlayer
);
router.put(
  "/:id",
  isAuthenticate.isAuthenticate,
  validation.savePlayer,
  playerController.updatePlayer
);
router.delete(
  "/:id",
  isAuthenticate.isAuthenticate,
  playerController.deletePlayer
);

module.exports = router;
