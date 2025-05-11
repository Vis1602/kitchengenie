import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeForEditing, updateRecipe, deleteRecipe } from "../lib/api";
import Button from "../components/ui/Button";
import RecipeEditor from "../components/RecipeEditor";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add error boundary
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            No recipe ID provided
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await getRecipeForEditing(id);
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedRecipe) => {
    try {
      const saved = await updateRecipe(id, updatedRecipe);
      setRecipe(saved);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    }
  };
  const renderContent = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="secondary" onClick={() => navigate("/")}>
            ← Back to Recipes
          </Button>
          {!loading && !error && recipe && (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {loading || error ? (
          renderContent()
        ) : recipe ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h1 className="text-2xl font-semibold text-gray-800">
                {recipe.title}
              </h1>
            </div>

            <div className="p-6">
              {isEditing ? (
                <RecipeEditor
                  recipeId={id}
                  initialData={recipe}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-3">
                      Ingredients
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      {recipe.ingredients?.map((ingredient, index) => (
                        <li key={index} className="text-gray-600">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-3">
                      Instructions
                    </h2>
                    <div className="text-gray-600 whitespace-pre-line prose max-w-none">
                      {recipe.instructions}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">Recipe not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
