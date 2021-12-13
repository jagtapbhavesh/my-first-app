import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Sandwich',
        'this is a test recipe',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-1-1152x1536.jpg',
        [
            new Ingredient('Bread',2),
            new Ingredient('Tomato',1),
            new Ingredient('Potato',1),
            new Ingredient('Green Chatney',1),
            new Ingredient('Chips',1),
            new Ingredient('Onion',1)
        ]),
        new Recipe('Cheese Pizza',
        'this is a test recipe',
        'https://www.simplyrecipes.com/thmb/YSlSLYrnOBfkzE3rD_uMSnA8dlA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-LEAD-3-8aa37af554cf4445a1e3e54fdc66e974.jpg',
        [
            new Ingredient('Pizza Base',1),
            new Ingredient('Onion',1),
            new Ingredient('Cheese',5),
            new Ingredient('Tomato',1),
            new Ingredient('Mayo',1)
        ])
      ];


      constructor(private slService: ShoppingListService) {}
      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
}