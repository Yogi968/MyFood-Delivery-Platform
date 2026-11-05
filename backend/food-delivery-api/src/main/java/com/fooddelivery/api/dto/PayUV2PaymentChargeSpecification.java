package com.fooddelivery.api.dto;

/**
 * Represents the payment amount information required by PayU v2.
 */
public class PayUV2PaymentChargeSpecification {

    private String price;

    /**
     * Returns the payment price.
     *
     * @return payment price
     */
    public String getPrice() {
        return price;
    }

    /**
     * Sets the payment price.
     *
     * @param price payment price
     */
    public void setPrice(String price) {
        this.price = price;
    }
}