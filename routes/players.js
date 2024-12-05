const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");
const validation = require("../middleware/validate");

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayer);
router.post("/", validation.savePlayer, playerController.createPlayer);
router.put("/:id", validation.savePlayer, playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
