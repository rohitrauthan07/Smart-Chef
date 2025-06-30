import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Search } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const COMMON_INGREDIENTS = [
  'chicken', 'beef', 'salmon', 'eggs', 'milk', 'cheese', 'tomatoes', 'onions',
  'garlic', 'potatoes', 'rice', 'pasta', 'bread', 'butter', 'olive oil',
  'salt', 'pepper', 'basil', 'oregano', 'lemon', 'spinach', 'broccoli'
];

const IngredientInput = () => {
  const { ingredients, addIngredient, removeIngredient, clearIngredients, searchRecipes, loading } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.length > 0) {
      const filtered = COMMON_INGREDIENTS.filter(ing => 
        ing.toLowerCase().includes(value.toLowerCase()) && 
        !ingredients.includes(ing.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleAddIngredient = (ingredient: string) => {
    if (ingredient.trim()) {
      addIngredient(ingredient);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddIngredient(inputValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Add ingredients (e.g., chicken, tomatoes, garlic)"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          
          <Button type="submit" disabled={!inputValue.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </form>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors"
                  onClick={() => handleAddIngredient(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Added Ingredients */}
      {ingredients.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              Your Ingredients ({ingredients.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearIngredients}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {ingredients.map((ingredient) => (
                <motion.div
                  key={ingredient}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="secondary" className="pr-1 py-1">
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Search Button */}
      {ingredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={searchRecipes}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 mr-2"
                >
                  <div className="w-full h-full border-2 border-white border-t-transparent rounded-full" />
                </motion.div>
                Finding Recipes...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Find Recipes
              </>
            )}
          </Button>
        </motion.div>
      )}

      {/* Common Ingredients Quick Add */}
      {ingredients.length === 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Quick add common ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_INGREDIENTS.slice(0, 8).map((ingredient) => (
              <Button
                key={ingredient}
                variant="outline"
                size="sm"
                onClick={() => handleAddIngredient(ingredient)}
                className="text-xs"
              >
                {ingredient}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;