package com.backend.mappers;

import com.backend.dtos.RecipeDto;
import com.backend.models.Recipe;
import org.springframework.stereotype.Component;

@Component
public class RecipeMapper {
    public RecipeDto toDto(Recipe recipe){
        RecipeDto dto = new RecipeDto();
        dto.setId(recipe.getId());
        dto.setName(recipe.getName());
        dto.setDescription(recipe.getDescription());
        dto.setPrice(recipe.getPrice());
        dto.setStockQuantity(recipe.getStockQuantity());
        dto.setDateAdded(recipe.getDateAdded());
        return dto;
    }
    public Recipe toEntity(RecipeDto dto){
        Recipe recipe = new Recipe();
        recipe.setName(dto.getName());
        recipe.setDescription(dto.getDescription());
        recipe.setPrice(dto.getPrice());
        recipe.setStockQuantity(dto.getStockQuantity());
        recipe.setDateAdded(dto.getDateAdded());
        return recipe;
    }


}
