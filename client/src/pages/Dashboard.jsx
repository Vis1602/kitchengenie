import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchRecipes } from "../lib/geminiApi";
import {
  fetchRecipeHistory,
  saveRecipe,
  deleteRecipe,
  updateRecipe,
} from "../lib/api";
import Header from "../components/Header";
import Pantry from "../components/Pantry";
import Basket from "../components/Basket";
import RecipeHistory from "../components/RecipeHistory";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [basketItems, setBasketItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadRecipes();
  }, [user, navigate]);

  const loadRecipes = async () => {
    try {
      const data = await fetchRecipeHistory();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to load recipes:", error);
    }
  };

  const addToBasket = (itemName) => {
    setBasketItems((prev) => {
      const existingItem = prev.find((item) => item.name === itemName);
      if (existingItem) {
        return prev.map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { name: itemName, quantity: 1 }];
    });
  };

  const removeFromBasket = (itemName) => {
    setBasketItems((prev) => prev.filter((item) => item.name !== itemName));
  };

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBasket(itemName);
      return;
    }
    setBasketItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  const handleUpdateRecipe = async (recipe) => {
    try {
      const updatedRecipe = await updateRecipe(recipe._id, recipe);
      setRecipes((prev) =>
        prev.map((r) => (r._id === recipe._id ? updatedRecipe : r))
      );
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  const handleGenerateRecipe = async () => {
    if (basketItems.length === 0 || loading) return;

    try {
      setLoading(true);
      const ingredients = basketItems.map((item) => item.name);

      const generatedRecipe = await fetchRecipes(ingredients);

      if (
        !generatedRecipe?.title ||
        !Array.isArray(generatedRecipe.ingredients) ||
        !generatedRecipe.instructions
      ) {
        throw new Error("Invalid response format from recipe generation");
      }

      const savedRecipe = await saveRecipe({
        title: generatedRecipe.title,
        ingredients: generatedRecipe.ingredients,
        instructions: generatedRecipe.instructions,
      });

      setRecipes((prev) => [savedRecipe, ...prev]);
      setBasketItems([]);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Header />
        <main>
          <Pantry onAddToBasket={addToBasket} />
          <Basket
            basketItems={basketItems}
            updateQuantity={updateQuantity}
            removeFromBasket={removeFromBasket}
            onGenerateRecipe={handleGenerateRecipe}
            loading={loading}
          />{" "}
          <RecipeHistory recipes={recipes} />
        </main>
      </div>
    </div>
  );
}
