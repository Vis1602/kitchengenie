const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getRecipe, updateRecipe } = require("../controllers/recipeController");

// All routes are protected
router.use(protect);

// Get recipe for editing preview
router.get("/preview/:id", getRecipe);

module.exports = router;
