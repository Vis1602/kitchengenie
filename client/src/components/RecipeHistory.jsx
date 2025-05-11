import { useNavigate } from "react-router-dom";

export default function RecipeHistory({ recipes }) {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <section className="mb-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recipe History</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No recipes yet. Generate your first recipe by adding ingredients to
          your basket!
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id || recipe.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/recipe/${recipe._id || recipe.id}`)}
            >
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-500">
                    {formatDate(recipe.date || recipe.createdAt)}
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {recipe.ingredients.length} ingredients
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
