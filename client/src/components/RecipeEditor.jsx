import { useState, useEffect } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { getRecipeForEditing, updateRecipe } from "../lib/api";

export default function RecipeEditor({
  recipeId,
  initialData,
  onSave,
  onCancel,
}) {
  const [editForm, setEditForm] = useState({
    title: initialData?.title || "",
    ingredients: initialData?.ingredients || [],
    instructions: initialData?.instructions || "",
  });
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialData) {
      loadRecipe();
    }
  }, [recipeId, initialData]);

  const loadRecipe = async () => {
    try {
      const recipe = await getRecipeForEditing(recipeId);
      if (recipe) {
        setEditForm({
          title: recipe.title,
          ingredients: [...recipe.ingredients],
          instructions: recipe.instructions,
        });
      } else {
        throw new Error("Recipe not found");
      }
    } catch (err) {
      console.error("Error loading recipe:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...editForm.ingredients];
    newIngredients[index] = value;
    setEditForm({ ...editForm, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setEditForm({ ...editForm, ingredients: [...editForm.ingredients, ""] });
  };

  const removeIngredient = (index) => {
    const newIngredients = editForm.ingredients.filter((_, i) => i !== index);
    setEditForm({ ...editForm, ingredients: newIngredients });
  };
  const handleSave = async () => {
    try {
      // Validate form data
      if (!editForm.title.trim()) {
        throw new Error("Title is required");
      }
      if (editForm.ingredients.length === 0) {
        throw new Error("At least one ingredient is required");
      }
      if (!editForm.instructions.trim()) {
        throw new Error("Instructions are required");
      }

      // Remove empty ingredients
      const cleanedForm = {
        ...editForm,
        ingredients: editForm.ingredients.filter((ing) => ing.trim()),
      };

      const updatedRecipe = await updateRecipe(recipeId, cleanedForm);
      onSave(updatedRecipe);
    } catch (err) {
      console.error("Error saving recipe:", err);
      setError(err.message);
    }
  };
  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          type="text"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients
        </label>
        {editForm.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="flex-grow"
            />
            <Button variant="danger" onClick={() => removeIngredient(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={addIngredient} className="mt-2">
          Add Ingredient
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instructions
        </label>
        <textarea
          value={editForm.instructions}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              instructions: e.target.value,
            })
          }
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
