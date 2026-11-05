
package com.fooddelivery.api.dto;

import java.math.BigDecimal;

public class RestaurantResponse {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String imageUrl;
    private String imageAlt;
    private String cuisine;
    private BigDecimal rating;
    private String deliveryTime;
    private String distance;
    private BigDecimal priceForOne;
    private String badge;
    private String discount;
    private Boolean isActive;

    public RestaurantResponse() {
    }

    public RestaurantResponse(
            Long id,
            String name,
            String description,
            String address,
            String imageUrl,
            String imageAlt,
            String cuisine,
            BigDecimal rating,
            String deliveryTime,
            String distance,
            BigDecimal priceForOne,
            String badge,
            String discount,
            Boolean isActive) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.imageUrl = imageUrl;
        this.imageAlt = imageAlt;
        this.cuisine = cuisine;
        this.rating = rating;
        this.deliveryTime = deliveryTime;
        this.distance = distance;
        this.priceForOne = priceForOne;
        this.badge = badge;
        this.discount = discount;
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

    public String getImageAlt() {
        return imageAlt;
    }

    public String getCuisine() {
        return cuisine;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public String getDistance() {
        return distance;
    }

    public BigDecimal getPriceForOne() {
        return priceForOne;
    }

    public String getBadge() {
        return badge;
    }

    public String getDiscount() {
        return discount;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setImageAlt(String imageAlt) {
        this.imageAlt = imageAlt;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public void setPriceForOne(BigDecimal priceForOne) {
        this.priceForOne = priceForOne;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
