package com.backend.repository;

import com.backend.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
