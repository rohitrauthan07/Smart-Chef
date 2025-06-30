import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppContextType, Recipe, DietaryPreference, MealPlan } from '@/types';
import { searchRecipesByIngredients, generateCustomRecipes, generateWeeklyMealPlan } from '@/services/api';
import { toast } from 'sonner';

const initialState: AppState = {
  ingredients: [],
  recipes: [],
  favorites: [],
  dietaryPreferences: [
    { id: 'vegetarian', name: 'Vegetarian', description: 'No meat or fish', enabled: false },
    { id: 'vegan', name: 'Vegan', description: 'No animal products', enabled: false },
    { id: 'gluten-free', name: 'Gluten Free', description: 'No gluten-containing ingredients', enabled: false },
    { id: 'keto', name: 'Keto', description: 'Low carb, high fat', enabled: false },
    { id: 'paleo', name: 'Paleo', description: 'Whole foods, no processed', enabled: false },
    { id: 'dairy-free', name: 'Dairy Free', description: 'No dairy products', enabled: false },
  ],
  mealPlan: [],
  loading: false,
  searchQuery: '',
};

type AppAction =
  | { type: 'ADD_INGREDIENT'; payload: string }
  | { type: 'REMOVE_INGREDIENT'; payload: string }
  | { type: 'CLEAR_INGREDIENTS' }
  | { type: 'SET_RECIPES'; payload: Recipe[] }
  | { type: 'TOGGLE_FAVORITE'; payload: Recipe }
  | { type: 'UPDATE_DIETARY_PREFERENCE'; payload: { id: string; enabled: boolean } }
  | { type: 'SET_MEAL_PLAN'; payload: MealPlan[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: Recipe[] };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      if (state.ingredients.includes(action.payload)) return state;
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    
    case 'REMOVE_INGREDIENT':
      return { ...state, ingredients: state.ingredients.filter(ing => ing !== action.payload) };
    
    case 'CLEAR_INGREDIENTS':
      return { ...state, ingredients: [] };
    
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload, loading: false };
    
    case 'TOGGLE_FAVORITE':
      const recipe = action.payload;
      const isFavorited = state.favorites.some(fav => fav.id === recipe.id);
      let newFavorites: Recipe[];
      
      if (isFavorited) {
        newFavorites = state.favorites.filter(fav => fav.id !== recipe.id);
      } else {
        newFavorites = [...state.favorites, { ...recipe, isFavorite: true }];
      }
      
      // Save to localStorage
      localStorage.setItem('smartchef-favorites', JSON.stringify(newFavorites));
      
      return { ...state, favorites: newFavorites };
    
    case 'UPDATE_DIETARY_PREFERENCE':
      const updatedPreferences = state.dietaryPreferences.map(pref =>
        pref.id === action.payload.id ? { ...pref, enabled: action.payload.enabled } : pref
      );
      localStorage.setItem('smartchef-dietary-preferences', JSON.stringify(updatedPreferences));
      return { ...state, dietaryPreferences: updatedPreferences };
    
    case 'SET_MEAL_PLAN':
      return { ...state, mealPlan: action.payload, loading: false };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('smartchef-favorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }

    const savedPreferences = localStorage.getItem('smartchef-dietary-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        preferences.forEach((pref: DietaryPreference) => {
          dispatch({ type: 'UPDATE_DIETARY_PREFERENCE', payload: { id: pref.id, enabled: pref.enabled } });
        });
      } catch (e) {
        console.error('Failed to load dietary preferences:', e);
      }
    }
  }, []);

  const addIngredient = (ingredient: string) => {
    dispatch({ type: 'ADD_INGREDIENT', payload: ingredient.trim().toLowerCase() });
  };

  const removeIngredient = (ingredient: string) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: ingredient });
  };

  const clearIngredients = () => {
    dispatch({ type: 'CLEAR_INGREDIENTS' });
  };

  const setRecipes = (recipes: Recipe[]) => {
    const recipesWithFavoriteStatus = recipes.map(recipe => ({
      ...recipe,
      isFavorite: state.favorites.some(fav => fav.id === recipe.id)
    }));
    dispatch({ type: 'SET_RECIPES', payload: recipesWithFavoriteStatus });
  };

  const toggleFavorite = (recipe: Recipe) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: recipe });
    const isFavorited = state.favorites.some(fav => fav.id === recipe.id);
    toast.success(isFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites');
  };

  const updateDietaryPreference = (id: string, enabled: boolean) => {
    dispatch({ type: 'UPDATE_DIETARY_PREFERENCE', payload: { id, enabled } });
  };

  const setMealPlan = (mealPlan: MealPlan[]) => {
    dispatch({ type: 'SET_MEAL_PLAN', payload: mealPlan });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const searchRecipes = async () => {
    if (state.ingredients.length === 0) {
      toast.error('Please add some ingredients first');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // First try external API
      const externalRecipes = await searchRecipesByIngredients(
        state.ingredients,
        state.dietaryPreferences.filter(p => p.enabled).map(p => p.id)
      );

      if (externalRecipes.length > 0) {
        setRecipes(externalRecipes);
        toast.success(`Found ${externalRecipes.length} recipes!`);
      } else {
        // Fallback to AI generation
        const aiRecipes = await generateCustomRecipes(
          state.ingredients,
          state.dietaryPreferences.filter(p => p.enabled).map(p => p.name)
        );
        setRecipes(aiRecipes);
        toast.success(`Generated ${aiRecipes.length} custom recipes using AI!`);
      }
    } catch (error) {
      console.error('Recipe search failed:', error);
      toast.error('Failed to find recipes. Please try again.');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const generateMealPlan = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const mealPlan = await generateWeeklyMealPlan(
        state.ingredients,
        state.dietaryPreferences.filter(p => p.enabled).map(p => p.name)
      );
      setMealPlan(mealPlan);
      toast.success('Meal plan generated successfully!');
    } catch (error) {
      console.error('Meal plan generation failed:', error);
      toast.error('Failed to generate meal plan. Please try again.');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const contextValue: AppContextType = {
    ...state,
    addIngredient,
    removeIngredient,
    clearIngredients,
    setRecipes,
    toggleFavorite,
    updateDietaryPreference,
    setMealPlan,
    setLoading,
    setSearchQuery,
    searchRecipes,
    generateMealPlan,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};