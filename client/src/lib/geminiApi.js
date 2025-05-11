const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const fetchRecipes = async (ingredients) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    if (!ingredients || ingredients.length === 0) {
      throw new Error("No ingredients provided");
    }


    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a professional chef assistant. Your task is to create a delicious and clear recipe based on a list of available ingredients. The recipe should include a title (starting with ##), ingredients list (starting with "Ingredients:"), and step-by-step instructions (starting with "Instructions:"). Only use the ingredients provided: ${JSON.stringify(
                  ingredients
                )}. Be concise and realistic and dont use bold in output, as i dont want star in output, not in  number also.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API error: ${response.status} ${response.statusText}\n${errorText}`
      );
    }

    const data = await response.json();
    const recipeText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!recipeText) {
      throw new Error("No recipe text received from Gemini API");
    }

    

    const titleMatch = recipeText.match(/^##\s*(.+)$/m);
    const ingredientsMatch = recipeText.match(
      /Ingredients:\s*\n([\s\S]*?)\n(?=\s*(Instructions:|$))/m
    );
    const instructionsMatch = recipeText.match(/Instructions:\s*\n([\s\S]*)$/m);

    if (!titleMatch || !ingredientsMatch || !instructionsMatch) {
     
      throw new Error("Recipe format not recognized");
    }

    const parsedIngredients = ingredientsMatch[1]
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);

    return {
      title: titleMatch[1].trim(),
      ingredients: parsedIngredients,
      instructions: instructionsMatch[1].trim(),
    };
  } catch (error) {

    throw error;
  }
};
