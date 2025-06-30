import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Heart, ExternalLink } from 'lucide-react';
import { Recipe } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
  const { toggleFavorite, favorites } = useApp();
  
  if (!recipe) return null;
  
  const isFavorite = favorites.some(fav => fav.id === recipe.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[98vh] sm:h-[95vh] md:h-[90vh] bg-white rounded-lg sm:rounded-xl shadow-xl overflow-hidden flex flex-col mx-auto"
          >
            {/* Header */}
            <div className="relative flex-shrink-0">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Close Button */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 w-7 h-7 sm:w-8 sm:h-8 p-0 bg-white/80 hover:bg-white"
                onClick={onClose}
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              
              {/* Recipe Title and Stats */}
              <div className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2 md:bottom-4 md:left-4 md:right-4">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                  {recipe.title}
                </h2>
                <div className="flex items-center space-x-2 sm:space-x-4 text-white/90 text-xs sm:text-sm md:text-base">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">{recipe.readyInMinutes} min</span>
                    <span className="sm:hidden">{recipe.readyInMinutes}m</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">{recipe.servings} servings</span>
                    <span className="sm:hidden">{recipe.servings}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {recipe.diets.map((diet) => (
                      <Badge key={diet} variant="secondary" className="text-xs px-2 py-1">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(recipe)}
                      className={cn(
                        "text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2",
                        isFavorite && "text-red-500 border-red-200"
                      )}
                    >
                      <Heart className={cn("w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2", isFavorite && "fill-current")} />
                      <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                      <span className="sm:hidden">{isFavorite ? 'Saved' : 'Save'}</span>
                    </Button>
                    
                    {recipe.sourceUrl && (
                      <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">View Source</span>
                          <span className="sm:hidden">Source</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {recipe.summary.replace(/<[^>]*>/g, '')}
                  </p>
                </div>

                {/* Nutrition Info */}
                {recipe.nutrition && (
                  <>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Nutrition (per serving)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-600">
                          {recipe.nutrition.calories}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                          {recipe.nutrition.protein}g
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">
                          {recipe.nutrition.carbs}g
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-center">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">
                          {recipe.nutrition.fat}g
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Fat</div>
                      </div>
                    </div>
                  </>
                )}

                <Separator className="my-4 sm:my-6" />

                {/* Ingredients */}
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Ingredients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 sm:mb-6">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4 sm:my-6" />

                {/* Instructions */}
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Cooking Instructions</h3>
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {recipe.instructions.map((step, index) => {
                    // Extract cooking time from step if present
                    const timeMatch = step.match(/\((\d+-\d+|\d+)\s*minutes?\)/i);
                    const hasTime = timeMatch !== null;
                    
                    return (
                      <div key={index} className="flex items-start space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 md:p-4 lg:p-5 bg-gray-50 rounded-lg border-l-4 border-emerald-500">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 leading-relaxed font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                            {step.replace(/\([^)]*\)/g, '').trim()}
                          </p>
                          {hasTime && (
                            <div className="mt-1 sm:mt-2 flex items-center text-xs sm:text-sm text-emerald-600">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                              <span className="font-medium">{timeMatch[1]} minutes</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cooking Tips */}
                {recipe.notes && (
                  <>
                    <Separator className="my-4 sm:my-6" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Chef's Tips</h3>
                    <div className="p-2 sm:p-3 md:p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                          💡
                        </div>
                        <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                          {recipe.notes}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;