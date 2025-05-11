import Button from "./ui/Button";

export default function Basket({
  basketItems,
  updateQuantity,
  removeFromBasket,
  onGenerateRecipe,
  loading,
}) {
  const totalItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="mb-8 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Basket</h2>
        <span className="bg-indigo-500 text-white rounded-full px-3 py-1 text-sm">
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mb-4">
        {basketItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Your basket is empty. Add ingredients from your pantry to get
            started!
          </p>
        ) : (
          <div className="space-y-2">
            {basketItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
              >
                <span className="flex-grow">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() =>
                        updateQuantity(item.name, item.quantity - 1)
                      }
                      className="p-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      onClick={() =>
                        updateQuantity(item.name, item.quantity + 1)
                      }
                      className="p-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v12M6 12h12"
                        />
                      </svg>
                    </Button>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => removeFromBasket(item.name)}
                    className="p-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={onGenerateRecipe}
        disabled={basketItems.length === 0 || loading}
        className="w-full"
      >
        {loading ? "Generating Recipe..." : "Generate Recipe"}
      </Button>
    </section>
  );
}
