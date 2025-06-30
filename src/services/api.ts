import { Recipe, MealPlan } from '@/types';

// Gemini AI API configuration
const GEMINI_API_KEY = 'AIzaSyDGCwbMibFVzv_NEZQLUhUXfkV-bh39u48';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Mock data for demonstration
const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Chicken Stir Fry',
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    readyInMinutes: 20,
    servings: 4,
    summary: 'A quick and healthy stir fry with fresh vegetables and tender chicken.',
    instructions: [
      'Step 1: Heat 2 tablespoons of oil in a large wok or pan over high heat (2-3 minutes)',
      'Step 2: Add chicken pieces and cook until browned on all sides (5-7 minutes)',
      'Step 3: Add minced garlic and ginger, stir for 30 seconds until fragrant',
      'Step 4: Add mixed vegetables and stir fry for 3-4 minutes until crisp-tender',
      'Step 5: Pour in soy sauce and toss to combine all ingredients',
      'Step 6: Cook for 1-2 more minutes until sauce is absorbed',
      'Step 7: Serve immediately over steamed rice'
    ],
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: 1, unit: 'lb' },
      { id: '2', name: 'Mixed vegetables', amount: 2, unit: 'cups' },
      { id: '3', name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { id: '4', name: 'Garlic', amount: 2, unit: 'cloves' },
      { id: '5', name: 'Ginger', amount: 1, unit: 'tsp' }
    ],
    nutrition: {
      calories: 320,
      protein: 28,
      carbs: 12,
      fat: 18
    },
    diets: ['gluten-free'],
    cuisineTypes: ['Asian'],
    dishTypes: ['main course']
  },
  {
    id: '2',
    title: 'Caprese Salad',
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400',
    readyInMinutes: 10,
    servings: 2,
    summary: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.',
    instructions: [
      'Step 1: Slice tomatoes into 1/4-inch thick rounds (2-3 minutes)',
      'Step 2: Slice fresh mozzarella into similar thickness rounds (1-2 minutes)',
      'Step 3: Arrange alternating slices of tomato and mozzarella on a serving plate',
      'Step 4: Tuck fresh basil leaves between the slices',
      'Step 5: Drizzle with extra virgin olive oil and balsamic glaze',
      'Step 6: Season generously with sea salt and freshly ground black pepper',
      'Step 7: Let stand for 5 minutes to allow flavors to meld before serving'
    ],
    ingredients: [
      { id: '1', name: 'Fresh mozzarella', amount: 8, unit: 'oz' },
      { id: '2', name: 'Tomatoes', amount: 2, unit: 'large' },
      { id: '3', name: 'Fresh basil', amount: 1, unit: 'handful' },
      { id: '4', name: 'Olive oil', amount: 2, unit: 'tbsp' },
      { id: '5', name: 'Balsamic glaze', amount: 1, unit: 'tbsp' }
    ],
    nutrition: {
      calories: 280,
      protein: 16,
      carbs: 8,
      fat: 22
    },
    diets: ['vegetarian', 'gluten-free'],
    cuisineTypes: ['Italian'],
    dishTypes: ['salad', 'appetizer']
  },
  {
    id: '3',
    title: 'Quinoa Buddha Bowl',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    readyInMinutes: 25,
    servings: 2,
    summary: 'Nutritious quinoa bowl with roasted vegetables and tahini dressing.',
    instructions: [
      'Step 1: Rinse quinoa thoroughly under cold water (1 minute)',
      'Step 2: Cook quinoa in 2 cups of water for 15-20 minutes until fluffy',
      'Step 3: Preheat oven to 400°F and line a baking sheet with parchment paper',
      'Step 4: Chop sweet potato into 1-inch cubes and toss with olive oil and salt',
      'Step 5: Roast vegetables on baking sheet for 20-25 minutes until tender',
      'Step 6: Prepare tahini dressing by whisking tahini, lemon juice, and water',
      'Step 7: Assemble bowls with quinoa, roasted vegetables, and drizzle with dressing'
    ],
    ingredients: [
      { id: '1', name: 'Quinoa', amount: 1, unit: 'cup' },
      { id: '2', name: 'Sweet potato', amount: 1, unit: 'large' },
      { id: '3', name: 'Chickpeas', amount: 1, unit: 'can' },
      { id: '4', name: 'Tahini', amount: 2, unit: 'tbsp' },
      { id: '5', name: 'Lemon juice', amount: 1, unit: 'tbsp' }
    ],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 65,
      fat: 12
    },
    diets: ['vegan', 'gluten-free'],
    cuisineTypes: ['Mediterranean'],
    dishTypes: ['main course', 'lunch']
  }
];

// Gemini AI API call function
export const callGeminiAPI = async (prompt: string): Promise<any> => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Gemini API call failed:', error);
    throw error;
  }
};

// Parse Gemini response to extract recipe data
const parseGeminiRecipeResponse = (response: any, ingredients: string[]): Recipe[] => {
  try {
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Raw AI response:', text); // Debug log
    
    let jsonString = '';
    
    // First, try to extract JSON from markdown code blocks
    const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/i);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      // Fallback: find the first opening brace and last closing brace
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonString = text.substring(firstBrace, lastBrace + 1);
      }
    }
    
    if (jsonString) {
      try {
        // Clean up common JSON issues
        jsonString = jsonString
          .replace(/,\s*}/g, '}') // Remove trailing commas
          .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
          .replace(/\n/g, ' ') // Replace newlines with spaces
          .replace(/\r/g, '') // Remove carriage returns
          .replace(/\t/g, ' ') // Replace tabs with spaces
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        console.log('Cleaned JSON string:', jsonString); // Debug log
        
        const recipeData = JSON.parse(jsonString);
        
        // Handle new format with recipes array
        if (recipeData.recipes && Array.isArray(recipeData.recipes)) {
          return recipeData.recipes.map((recipe: any, index: number) => ({
            id: `gemini-${Date.now()}-${index}`,
            title: recipe.title || `Recipe ${index + 1} with ${ingredients.join(', ')}`,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
            readyInMinutes: recipe.cookingTime || 30,
            servings: recipe.servings || 4,
            summary: recipe.description || `A delicious ${recipe.cuisine || 'fusion'} recipe using ${ingredients.join(', ')}.`,
            instructions: recipe.instructions || [
              'Prepare all ingredients',
              'Follow cooking steps',
              'Serve and enjoy'
            ],
            ingredients: recipe.ingredients?.map((ing: any, ingIndex: number) => ({
              id: `gemini-ing-${index}-${ingIndex}`,
              name: ing.name || ing,
              amount: ing.amount || 1,
              unit: ing.unit || 'piece'
            })) || ingredients.map((ing, ingIndex) => ({
              id: `gemini-ing-${index}-${ingIndex}`,
              name: ing,
              amount: 1,
              unit: 'piece'
            })),
            nutrition: recipe.nutrition || {
              calories: 350,
              protein: 20,
              carbs: 30,
              fat: 15
            },
            diets: recipe.diets || [],
            cuisineTypes: recipe.cuisine ? [recipe.cuisine] : ['fusion'],
            dishTypes: ['main course'],
            notes: recipe.notes || undefined
          }));
        }
        
        // Handle legacy single recipe format
        return [{
          id: `gemini-${Date.now()}`,
          title: recipeData.title || `Recipe with ${ingredients.join(', ')}`,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          readyInMinutes: recipeData.cookingTime || 30,
          servings: recipeData.servings || 4,
          summary: recipeData.description || `A delicious recipe using ${ingredients.join(', ')}.`,
          instructions: recipeData.instructions || [
            'Prepare all ingredients',
            'Follow cooking steps',
            'Serve and enjoy'
          ],
          ingredients: recipeData.ingredients?.map((ing: any, index: number) => ({
            id: `gemini-ing-${index}`,
            name: ing.name || ing,
            amount: ing.amount || 1,
            unit: ing.unit || 'piece'
          })) || ingredients.map((ing, index) => ({
            id: `gemini-ing-${index}`,
            name: ing,
            amount: 1,
            unit: 'piece'
          })),
          nutrition: recipeData.nutrition || {
            calories: 350,
            protein: 20,
            carbs: 30,
            fat: 15
          },
          diets: recipeData.diets || [],
          cuisineTypes: recipeData.cuisine ? [recipeData.cuisine] : ['fusion'],
          dishTypes: ['main course'],
          notes: recipeData.notes || undefined
        }];
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError);
        console.error('JSON string that failed:', jsonString);
        // Fall through to text-based fallback
      }
    }
    
    // Fallback: create recipe from text response
    const naturalLanguageRecipes = parseNaturalLanguageRecipe(text, ingredients);
    if (naturalLanguageRecipes.length > 0) {
      return naturalLanguageRecipes;
    }
    
    // Final fallback if natural language parsing also fails
    return [{
      id: `gemini-${Date.now()}`,
      title: `AI Recipe with ${ingredients.slice(0, 2).join(' & ')}`,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      readyInMinutes: 30,
      servings: 4,
      summary: text.substring(0, 200) + '...',
      instructions: text.split('\n').filter((line: string) => line.trim()).slice(0, 5),
      ingredients: ingredients.map((ing, index) => ({
        id: `gemini-ing-${index}`,
        name: ing,
        amount: 1,
        unit: 'piece'
      })),
      nutrition: {
        calories: 350,
        protein: 20,
        carbs: 30,
        fat: 15
      },
      diets: [],
      cuisineTypes: ['fusion'],
      dishTypes: ['main course'],
      notes: 'This recipe was generated using AI. Feel free to adjust ingredients and cooking times to your preference.'
    }];
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    
    // Return a fallback recipe if all parsing attempts fail
    return [{
      id: `gemini-fallback-${Date.now()}`,
      title: `Recipe with ${ingredients.slice(0, 2).join(' & ')}`,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      readyInMinutes: 30,
      servings: 4,
      summary: `A delicious recipe using ${ingredients.join(', ')}.`,
      instructions: [
        'Prepare all ingredients',
        'Follow cooking steps',
        'Season to taste',
        'Cook until done',
        'Serve and enjoy'
      ],
      ingredients: ingredients.map((ing, index) => ({
        id: `fallback-ing-${index}`,
        name: ing,
        amount: 1,
        unit: 'piece'
      })),
      nutrition: {
        calories: 350,
        protein: 20,
        carbs: 30,
        fat: 15
      },
      diets: [],
      cuisineTypes: ['fusion'],
      dishTypes: ['main course'],
      notes: 'This is a fallback recipe. For best results, try adding more specific ingredients to get a more detailed recipe.'
    }];
  }
};

export const searchRecipesByIngredients = async (
  ingredients: string[],
  dietaryFilters: string[] = []
): Promise<Recipe[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter sample recipes based on ingredients and dietary preferences
  const filteredRecipes = SAMPLE_RECIPES.filter(recipe => {
    // Check if recipe contains any of the specified ingredients
    const hasIngredient = ingredients.some(ingredient =>
      recipe.ingredients.some(recipeIng =>
        recipeIng.name.toLowerCase().includes(ingredient.toLowerCase())
      ) || recipe.title.toLowerCase().includes(ingredient.toLowerCase())
    );
    
    // Check dietary filters
    const matchesDiet = dietaryFilters.length === 0 || 
      dietaryFilters.some(diet => recipe.diets.includes(diet));
    
    return hasIngredient && matchesDiet;
  });
  
  return filteredRecipes;
};

export const generateCustomRecipes = async (
  ingredients: string[],
  dietaryPreferences: string[] = []
): Promise<Recipe[]> => {
  try {
    const dietaryText = dietaryPreferences.length > 0 
      ? `\nDietary preference: "${dietaryPreferences.join(' and ')}"` 
      : '';
    
    // Try JSON format first
    const jsonPrompt = `You are a world-class master chef with deep knowledge of cuisines from every region — including Indian, Italian, Japanese, Thai, French, Middle Eastern, and American. You have years of experience crafting delicious and healthy meals with limited ingredients.

Given a list of ingredients, your job is to suggest high-quality, creative recipes that can be prepared using only those ingredients or minimal additional staples (e.g., salt, oil, spices). You must think like a chef and prioritize flavor, nutrition, and simplicity.

**Instructions:**
- Based on the ingredients provided, suggest 3 to 5 unique recipe ideas.
- Each recipe must include:
  - Recipe Name
  - Cuisine Type
  - Ingredients List (based on what's provided, with minimal assumptions)
  - **Detailed step-by-step cooking instructions** (clear, concise, numbered steps with cooking times, temperatures, and techniques)
  - Estimated cooking time
  - Notes or variations if applicable
- Adapt to any dietary restrictions or preferences (vegan, gluten-free, keto, etc.) when mentioned.

**IMPORTANT: Focus on detailed step-by-step cooking instructions that are easy to follow. Each step should be clear, include cooking times where relevant, mention techniques (sauté, simmer, etc.), and guide the user through the entire cooking process like a professional chef would.**

Be practical and creative — the goal is to make tasty meals with what's available, while teaching the user how to cook like a pro.

**User Input:**
Ingredients: "${ingredients.join(', ')}"${dietaryText}

**CRITICAL: Respond ONLY with valid JSON. Do not include any text before or after the JSON. Ensure all strings are properly quoted, all arrays and objects are properly closed, and there are no trailing commas.**

Please respond with this exact JSON structure:
{
  "recipes": [
    {
      "title": "Recipe name",
      "cuisine": "Cuisine type",
      "description": "Brief description",
      "cookingTime": 30,
      "servings": 4,
      "ingredients": [
        {"name": "ingredient name", "amount": 1, "unit": "cup"}
      ],
      "instructions": [
        "Step 1: Heat oil in a large pan over medium heat (2-3 minutes)",
        "Step 2: Add onions and sauté until translucent (5-7 minutes)",
        "Step 3: Add garlic and cook for 1 minute until fragrant",
        "Step 4: Add main ingredients and cook until done (10-15 minutes)",
        "Step 5: Season with salt and pepper to taste",
        "Step 6: Serve hot and enjoy"
      ],
      "nutrition": {
        "calories": 350,
        "protein": 20,
        "carbs": 30,
        "fat": 15
      },
      "diets": ["vegetarian"],
      "notes": "Optional cooking tips or variations"
    }
  ]
}`;

    let response = await callGeminiAPI(jsonPrompt);
    let recipes = parseGeminiRecipeResponse(response, ingredients);
    
    // If JSON parsing fails, try natural language prompt
    if (recipes.length === 0 || recipes[0].title.includes('fallback')) {
      console.log('JSON parsing failed, trying natural language prompt...');
      
      const naturalPrompt = `You are a world-class master chef. Create 3 delicious recipes using these ingredients: ${ingredients.join(', ')}.${dietaryText}

For each recipe, provide:
1. Recipe name
2. Brief description
3. Detailed step-by-step cooking instructions with cooking times
4. Any chef tips or variations

Make the instructions clear and easy to follow, like a professional chef teaching someone to cook.`;

      response = await callGeminiAPI(naturalPrompt);
      recipes = parseGeminiRecipeResponse(response, ingredients);
    }
    
    if (recipes.length > 0) {
      return recipes;
    }
  } catch (error) {
    console.error('Gemini recipe generation failed:', error);
  }
  
  // Fallback to mock recipes if Gemini fails
  const baseRecipes = [
    {
      id: `ai-${Date.now()}-1`,
      title: `${ingredients[0]} Delight`,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      readyInMinutes: 30,
      servings: 4,
      summary: `A creative dish featuring ${ingredients.join(', ')} with ${dietaryPreferences.join(' and ')} considerations.`,
      instructions: [
        `Step 1: Prepare ${ingredients[0]} by cleaning and chopping into bite-sized pieces`,
        `Step 2: Heat 2 tablespoons of oil in a large pan over medium heat (2-3 minutes)`,
        `Step 3: Add chopped ${ingredients[0]} and sauté until lightly browned (5-7 minutes)`,
        `Step 4: Add remaining ingredients in order of cooking time, stirring frequently`,
        `Step 5: Season with salt, pepper, and herbs to taste`,
        `Step 6: Cook until all ingredients are tender and flavors are combined (10-15 minutes)`,
        `Step 7: Serve hot and enjoy your delicious creation`
      ],
      ingredients: ingredients.map((ing, index) => ({
        id: `ai-ing-${index}`,
        name: ing,
        amount: 1,
        unit: 'cup'
      })),
      nutrition: {
        calories: 350,
        protein: 20,
        carbs: 30,
        fat: 15
      },
      diets: dietaryPreferences,
      cuisineTypes: ['fusion'],
      dishTypes: ['main course'],
      notes: `Chef's tip: Feel free to adjust the cooking time based on your preference. For a more intense flavor, let the ingredients caramelize slightly longer. This recipe is perfect for ${dietaryPreferences.length > 0 ? dietaryPreferences.join(' and ') : 'any'} diet.`
    }
  ];
  
  return baseRecipes;
};

export const generateWeeklyMealPlan = async (
  ingredients: string[],
  dietaryPreferences: string[] = []
): Promise<MealPlan[]> => {
  try {
    const dietaryText = dietaryPreferences.length > 0 
      ? ` All meals should be ${dietaryPreferences.join(' and ')}.` 
      : '';
    
    const prompt = `Create a 7-day meal plan using these available ingredients: ${ingredients.join(', ')}.${dietaryText}
    
    For each day, provide breakfast, lunch, and dinner recipes. Each recipe should include:
    - Recipe name
    - Cooking time
    - Brief description
    - Main ingredients used
    
    Format as a structured response for 7 days (Monday to Sunday).`;

    const response = await callGeminiAPI(prompt);
    
    // For now, use sample data but in production this would parse the Gemini response
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date();
    
    const mealPlan: MealPlan[] = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      
      return {
        id: `meal-plan-${index}`,
        day,
        date: date.toISOString().split('T')[0],
        meals: {
          breakfast: index < SAMPLE_RECIPES.length ? SAMPLE_RECIPES[index % SAMPLE_RECIPES.length] : null,
          lunch: index < SAMPLE_RECIPES.length ? SAMPLE_RECIPES[(index + 1) % SAMPLE_RECIPES.length] : null,
          dinner: index < SAMPLE_RECIPES.length ? SAMPLE_RECIPES[(index + 2) % SAMPLE_RECIPES.length] : null
        }
      };
    });
    
    return mealPlan;
  } catch (error) {
    console.error('Meal plan generation failed:', error);
    
    // Fallback meal plan
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date();
    
    const mealPlan: MealPlan[] = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      
      return {
        id: `meal-plan-${index}`,
        day,
        date: date.toISOString().split('T')[0],
        meals: {
          breakfast: index < SAMPLE_RECIPES.length ? SAMPLE_RECIPES[index % SAMPLE_RECIPES.length] : null,
          lunch: index < SAMPLE_RECIPES.length ? SAMPLE_RECIPES[(index + 1) % SAMPLE_RECIPES.length] : null,
          dinner: index < SAMPLE_RECIPES.length ? SAMPLE_RECIPES[(index + 2) % SAMPLE_RECIPES.length] : null
        }
      };
    });
    
    return mealPlan;
  }
};

// External API integration placeholder functions
export const fetchFromSpoonacular = async (ingredients: string[], diet?: string) => {
  // This would integrate with actual Spoonacular API
  // const API_KEY = 'your-spoonacular-api-key';
  // const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${API_KEY}`);
  // return response.json();
  console.log('Spoonacular API integration placeholder');
  return [];
};

export const fetchFromEdamam = async (ingredients: string[], diet?: string) => {
  // This would integrate with actual Edamam API
  // const APP_ID = 'your-edamam-app-id';
  // const APP_KEY = 'your-edamam-app-key';
  // const response = await fetch(`https://api.edamam.com/search?q=${ingredients.join(' ')}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  // return response.json();
  console.log('Edamam API integration placeholder');
  return [];
};

// Parse natural language recipe response when JSON fails
const parseNaturalLanguageRecipe = (text: string, ingredients: string[]): Recipe[] => {
  try {
    // Split text into lines and look for recipe patterns
    const lines = text.split('\n').filter(line => line.trim());
    
    // Look for recipe titles (usually start with numbers or are in caps)
    const recipeTitles = lines.filter(line => 
      /^\d+\.\s*[A-Z]/.test(line) || 
      /^[A-Z][A-Z\s]+$/.test(line.trim()) ||
      line.includes('Recipe') || line.includes('Dish')
    );
    
    if (recipeTitles.length === 0) {
      // Single recipe fallback
      return [{
        id: `nl-${Date.now()}`,
        title: `Creative ${ingredients[0]} Recipe`,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        readyInMinutes: 30,
        servings: 4,
        summary: text.substring(0, 200) + '...',
        instructions: lines
          .filter(line => line.trim() && !line.includes('Recipe') && !line.includes('Ingredients'))
          .slice(0, 8)
          .map(line => line.replace(/^\d+\.\s*/, 'Step: ')),
        ingredients: ingredients.map((ing, index) => ({
          id: `nl-ing-${index}`,
          name: ing,
          amount: 1,
          unit: 'piece'
        })),
        nutrition: {
          calories: 350,
          protein: 20,
          carbs: 30,
          fat: 15
        },
        diets: [],
        cuisineTypes: ['fusion'],
        dishTypes: ['main course'],
        notes: 'This recipe was generated from AI text. Feel free to adjust ingredients and cooking times to your preference.'
      }];
    }
    
    // Multiple recipes found
    return recipeTitles.slice(0, 3).map((title, index) => {
      const titleText = title.replace(/^\d+\.\s*/, '').trim();
      
      return {
        id: `nl-${Date.now()}-${index}`,
        title: titleText || `Recipe ${index + 1}`,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        readyInMinutes: 30,
        servings: 4,
        summary: `A delicious recipe using ${ingredients.join(', ')}.`,
        instructions: [
          'Step 1: Prepare all ingredients',
          'Step 2: Follow the cooking instructions',
          'Step 3: Season to taste',
          'Step 4: Cook until done',
          'Step 5: Serve and enjoy'
        ],
        ingredients: ingredients.map((ing, ingIndex) => ({
          id: `nl-ing-${index}-${ingIndex}`,
          name: ing,
          amount: 1,
          unit: 'piece'
        })),
        nutrition: {
          calories: 350,
          protein: 20,
          carbs: 30,
          fat: 15
        },
        diets: [],
        cuisineTypes: ['fusion'],
        dishTypes: ['main course'],
        notes: 'This recipe was generated from AI text. Feel free to adjust ingredients and cooking times to your preference.'
      };
    });
  } catch (error) {
    console.error('Error parsing natural language recipe:', error);
    return [];
  }
};