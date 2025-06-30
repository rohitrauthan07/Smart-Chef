import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, UtensilsCrossed } from 'lucide-react';
import IngredientInput from '@/components/ingredients/IngredientInput';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeModal from '@/components/recipes/RecipeModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { useApp } from '@/contexts/AppContext';
import { Recipe } from '@/types';

const Home = () => {
  const { recipes, loading, ingredients } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <ChefHat className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Smart<span className="text-emerald-600">Chef</span>
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your ingredients into delicious meals with AI-powered recipe suggestions
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1 text-emerald-500" />
            AI-Powered
          </div>
          <div className="flex items-center">
            <UtensilsCrossed className="w-4 h-4 mr-1 text-orange-500" />
            Personalized
          </div>
        </div>
      </motion.div>

      {/* Ingredient Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">What's in your kitchen?</h2>
        </div>
        <IngredientInput />
      </motion.div>

      {/* Results Section */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <LoadingSpinner message="Searching for perfect recipes..." />
        </motion.div>
      )}

      {!loading && recipes.length === 0 && ingredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <EmptyState
            icon={UtensilsCrossed}
            title="No recipes found"
            description="We couldn't find any recipes with those ingredients. Try adding different ingredients or adjusting your dietary preferences."
          />
        </motion.div>
      )}

      {!loading && recipes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Recipe Suggestions
            </h2>
            <span className="text-sm text-gray-500">
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RecipeCard
                  recipe={recipe}
                  onViewDetails={setSelectedRecipe}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={selectedRecipe !== null}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default Home;