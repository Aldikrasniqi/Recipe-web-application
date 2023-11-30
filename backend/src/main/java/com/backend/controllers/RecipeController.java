package com.backend.controllers;

import com.backend.dtos.RecipeDto;
import com.backend.mappers.RecipeMapper;
import com.backend.services.RecipeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/")
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    private final RecipeMapper recipeMapper;
    private final RecipeService recipeService;

    public RecipeController(RecipeMapper recipeMapper, RecipeService recipeService) {
        this.recipeMapper = recipeMapper;
        this.recipeService = recipeService;
    }

    @GetMapping("/recipe")
    public ResponseEntity<List<RecipeDto>> getRecipe(){
        return ResponseEntity.ok(recipeService.getAllRecipes().stream().map(recipeMapper::toDto).collect(Collectors.toList()));
    }
    @PostMapping("/recipe")
    public ResponseEntity<RecipeDto> createRecipe(@RequestBody RecipeDto dto){
        return ResponseEntity.ok(recipeMapper.toDto(recipeService.createRecipe(recipeMapper.toEntity(dto))));
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<List<RecipeDto>> getRecipeById(@PathVariable Long id){
//        System.out.println("Id id: " + id);
        return ResponseEntity.ok(List.of(recipeMapper.toDto(recipeService.getRecipeById(id))));
    }
    @PutMapping("/recipe/{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable Long id,@RequestBody RecipeDto recipeDto){
        logger.info("Update recipe with id: {}", id);
        return ResponseEntity.ok(recipeMapper.toDto(recipeService.updateRecipe(id,recipeMapper.toEntity(recipeDto))));

    }
    @DeleteMapping("/recipe/{id}")
    public ResponseEntity deleteRecipe(@PathVariable long id){
        recipeService.deleteRecipe(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
