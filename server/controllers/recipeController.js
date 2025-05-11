const Recipe = require("../models/Recipe");

// Create new recipe
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all recipes for current user
const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single recipe
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getMyRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
