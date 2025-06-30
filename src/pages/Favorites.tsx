import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Filter } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeModal from '@/components/recipes/RecipeModal';
import EmptyState from '@/components/common/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Recipe } from '@/types';

const Favorites = () => {
  const { favorites } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<string>('all');

  const filteredFavorites = favorites.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDiet = dietFilter === 'all' || recipe.diets.includes(dietFilter);
    
    return matchesSearch && matchesDiet;
  });

  const uniqueDiets = Array.from(new Set(favorites.flatMap(recipe => recipe.diets)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Favorite Recipes</h1>
        </div>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your collection of saved recipes, ready to cook anytime
        </p>
      </motion.div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <EmptyState
            icon={Heart}
            title="No favorite recipes yet"
            description="Start exploring recipes and save your favorites by clicking the heart icon. They'll appear here for easy access."
            actionLabel="Discover Recipes"
            onAction={() => window.location.href = '/'}
          />
        </motion.div>
      ) : (
        <>
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="md:w-48">
                <Select value={dietFilter} onValueChange={setDietFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Diets</SelectItem>
                    {uniqueDiets.map((diet) => (
                      <SelectItem key={diet} value={diet}>
                        {diet.charAt(0).toUpperCase() + diet.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                {filteredFavorites.length} of {favorites.length} recipe{favorites.length !== 1 ? 's' : ''}
              </span>
              {(searchQuery || dietFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setDietFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </motion.div>

          {/* Favorites Grid */}
          {filteredFavorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <EmptyState
                icon={Search}
                title="No recipes match your filters"
                description="Try adjusting your search terms or clearing the filters to see more recipes."
                actionLabel="Clear Filters"
                onAction={() => {
                  setSearchQuery('');
                  setDietFilter('all');
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFavorites.map((recipe, index) => (
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
            </motion.div>
          )}
        </>
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

export default Favorites;