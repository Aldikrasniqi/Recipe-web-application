package com.backend.services;

import com.backend.models.Recipe;
import com.backend.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository){
        this.recipeRepository = recipeRepository;
    }

    public Recipe createRecipe(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    public Recipe getRecipeById(Long id){
        return recipeRepository.findById(id).orElse(null);
    }

    public List<Recipe> getAllRecipes(){
        return recipeRepository.findAll();
    }

    public List<String>getAllRecipeNames(){
        return getAllRecipes()
                .stream()
                .map(Recipe::getName)
                .filter(name -> name.startsWith("A")).collect(Collectors.toList());
    }
    public Recipe updateRecipe(Long id, Recipe recipe){
        Recipe recipeToBeUpdated = getRecipeById(id);
        if (recipeToBeUpdated != null){
            recipeToBeUpdated.setName(recipe.getName());
            recipeToBeUpdated.setDateAdded(recipe.getDateAdded());
            recipeToBeUpdated.setStockQuantity(recipe.getStockQuantity());
            recipeToBeUpdated.setDescription(recipe.getDescription());
            recipeToBeUpdated.setPrice(recipe.getPrice());

            return recipeRepository.save(recipeToBeUpdated);
        }
        return null;
    }

    public void deleteRecipe(Long id){
        Recipe recipe = getRecipeById(id);
        if (recipe != null){
            recipeRepository.delete(recipe);
        }
    }
}

