import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, Utensils } from 'lucide-react';
import { Recipe } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewDetails }) => {
  const { toggleFavorite, favorites } = useApp();
  const isFavorite = favorites.some(fav => fav.id === recipe.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white transition-colors",
              isFavorite && "text-red-500"
            )}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(recipe);
            }}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </Button>

          {/* Recipe Stats Overlay */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-3 text-white text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.readyInMinutes}min
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {recipe.servings}
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {recipe.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {recipe.summary.replace(/<[^>]*>/g, '')}
          </p>

          {/* Diet Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.diets.slice(0, 3).map((diet) => (
              <Badge key={diet} variant="secondary" className="text-xs">
                {diet}
              </Badge>
            ))}
            {recipe.diets.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.diets.length - 3}
              </Badge>
            )}
          </div>

          {/* Nutrition Info */}
          {recipe.nutrition && (
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-gray-500 border-t pt-3">
              <div>
                <div className="font-medium text-gray-900">{recipe.nutrition.calories}</div>
                <div>cal</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{recipe.nutrition.protein}g</div>
                <div>protein</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{recipe.nutrition.carbs}g</div>
                <div>carbs</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{recipe.nutrition.fat}g</div>
                <div>fat</div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={() => onViewDetails?.(recipe)}
          >
            <Utensils className="w-4 h-4 mr-2" />
            View Recipe
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RecipeCard;