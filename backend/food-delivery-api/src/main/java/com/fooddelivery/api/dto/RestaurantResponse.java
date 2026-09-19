package com.fooddelivery.api.dto;

public class RestaurantResponse {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String imageUrl;
    private Boolean isActive;

    public RestaurantResponse() {
    }

    public RestaurantResponse(
            Long id,
            String name,
            String description,
            String address,
            String imageUrl,
            Boolean isActive) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.imageUrl = imageUrl;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getAddress() {
        return address;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Boolean getIsActive() {
        return isActive;
    }
}