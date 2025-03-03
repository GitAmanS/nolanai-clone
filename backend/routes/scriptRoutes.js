const express = require("express");
const { generateScript, getUserScripts, getScriptById, deleteScript } = require("../controllers/scriptController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateScript);
router.get("/", authMiddleware, getUserScripts);
router.get("/:id", authMiddleware, getScriptById);
router.delete("/:id", authMiddleware, deleteScript);

module.exports = router;
