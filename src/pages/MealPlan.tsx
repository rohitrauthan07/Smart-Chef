import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChefHat, Clock, Users, Utensils } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { Recipe } from '@/types';

const MealPlan = () => {
  const { mealPlan, generateMealPlan, loading, ingredients } = useApp();

  const MealCard = ({ meal, mealType }: { meal: Recipe | null; mealType: string }) => {
    if (!meal) {
      return (
        <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
          <Utensils className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No {mealType.toLowerCase()} planned</p>
        </div>
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center text-white text-xs space-x-2">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {meal.readyInMinutes}min
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {meal.servings}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">
            {meal.title}
          </h4>
          
          {meal.diets.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meal.diets.slice(0, 2).map((diet) => (
                <Badge key={diet} variant="secondary" className="text-xs px-1 py-0">
                  {diet}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calendar className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Meal Planner</h1>
        </div>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Generate a personalized 7-day meal plan based on your ingredients and preferences
        </p>
      </motion.div>

      {/* Generate Meal Plan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="text-center space-y-4">
          <ChefHat className="w-12 h-12 text-emerald-600 mx-auto" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              AI-Powered Meal Planning
            </h2>
            <p className="text-gray-600">
              {ingredients.length > 0
                ? `Using your ${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''} to create a personalized meal plan`
                : 'Add some ingredients on the Home page to get started with meal planning'
              }
            </p>
          </div>
          
          <Button
            onClick={generateMealPlan}
            disabled={loading || ingredients.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
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
                Generating Plan...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Generate 7-Day Meal Plan
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <LoadingSpinner message="Creating your personalized meal plan..." />
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && mealPlan.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <EmptyState
            icon={Calendar}
            title="No meal plan yet"
            description="Generate your first meal plan to see a week's worth of delicious, personalized recipes."
            actionLabel={ingredients.length > 0 ? "Generate Meal Plan" : "Add Ingredients First"}
            onAction={ingredients.length > 0 ? generateMealPlan : undefined}
          />
        </motion.div>
      )}

      {/* Meal Plan Grid */}
      {!loading && mealPlan.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Your Weekly Meal Plan</h2>
            <Button
              onClick={generateMealPlan}
              variant="outline"
              disabled={loading}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>

          <div className="grid gap-6">
            {mealPlan.map((day, index) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span>{day.day}</span>
                      <span className="text-sm font-normal text-gray-500">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                          Breakfast
                        </h4>
                        <MealCard meal={day.meals.breakfast} mealType="Breakfast" />
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                          Lunch
                        </h4>
                        <MealCard meal={day.meals.lunch} mealType="Lunch" />
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                          Dinner
                        </h4>
                        <MealCard meal={day.meals.dinner} mealType="Dinner" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MealPlan;