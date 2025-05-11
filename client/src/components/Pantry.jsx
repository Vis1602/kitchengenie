import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const DEFAULT_PANTRY_ITEMS = [
  "Onions",
  "Garlic",
  "Bell Peppers",
  "Olive Oil",
  "Pasta",
  "Eggs",
  "Milk",
  "Cheese",
  "Butter",
  "Rice",
  "Chicken",
  "Tomatoes",
  "Potatoes",
  "Carrots",
  "Salt",
  "Pepper",
  "Sugar",
  "Flour",
].sort();

export default function Pantry({ onAddToBasket }) {
  const [pantryItems, setPantryItems] = useState(DEFAULT_PANTRY_ITEMS);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      const formattedItem =
        newItem.trim().charAt(0).toUpperCase() +
        newItem.trim().slice(1).toLowerCase();
      if (!pantryItems.includes(formattedItem)) {
        setPantryItems([...pantryItems, formattedItem].sort());
        setNewItem("");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const filteredItems = pantryItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mb-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Pantry</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
            className="flex-grow"
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add new item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleAddItem} disabled={!newItem.trim()}>
            Add
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-md">
          {filteredItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onAddToBasket(item)}
              className="p-2 text-left rounded-md bg-gray-50 hover:bg-indigo-50 active:bg-indigo-100 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
