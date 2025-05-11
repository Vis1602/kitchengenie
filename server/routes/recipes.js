const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createRecipe,
  getMyRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

// All routes are protected
router.use(protect);

router.route("/").get(getMyRecipes).post(createRecipe);

router.route("/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
