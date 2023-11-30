package com.backend.dtos;

import java.util.Date;

public class RecipeDto {
    private Long id;
    private String name;
    private String description;
    private Number price;
    private Number stockQuantity;
    private Date dateAdded;

    public RecipeDto(){
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Number getPrice() {
        return price;
    }

    public void setPrice(Number price) {
        this.price = price;
    }

    public Number getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Number stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }
}
