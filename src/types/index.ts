export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string[];
  ingredients: Ingredient[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  diets: string[];
  cuisineTypes: string[];
  dishTypes: string[];
  source?: string;
  sourceUrl?: string;
  isFavorite?: boolean;
  notes?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  image?: string;
}

export interface DietaryPreference {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface MealPlan {
  id: string;
  day: string;
  date: string;
  meals: {
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
  };
}

export interface AppState {
  ingredients: string[];
  recipes: Recipe[];
  favorites: Recipe[];
  dietaryPreferences: DietaryPreference[];
  mealPlan: MealPlan[];
  loading: boolean;
  searchQuery: string;
}

export interface AppContextType extends AppState {
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  setRecipes: (recipes: Recipe[]) => void;
  toggleFavorite: (recipe: Recipe) => void;
  updateDietaryPreference: (id: string, enabled: boolean) => void;
  setMealPlan: (mealPlan: MealPlan[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  searchRecipes: () => Promise<void>;
  generateMealPlan: () => Promise<void>;
}