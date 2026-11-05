package com.fooddelivery.api.dto;

/**
 * Represents order information required by the PayU v2 Hosted Checkout API.
 */
public class PayUV2Order {

    private String productInfo;

    private PayUV2PaymentChargeSpecification paymentChargeSpecification;

    /**
     * Returns the product information.
     *
     * @return product information
     */
    public String getProductInfo() {
        return productInfo;
    }

    /**
     * Sets the product information.
     *
     * @param productInfo product information
     */
    public void setProductInfo(String productInfo) {
        this.productInfo = productInfo;
    }

    /**
     * Returns the payment charge specification.
     *
     * @return payment charge specification
     */
    public PayUV2PaymentChargeSpecification getPaymentChargeSpecification() {
        return paymentChargeSpecification;
    }

    /**
     * Sets the payment charge specification.
     *
     * @param paymentChargeSpecification payment charge specification
     */
    public void setPaymentChargeSpecification(
            PayUV2PaymentChargeSpecification paymentChargeSpecification) {
        this.paymentChargeSpecification = paymentChargeSpecification;
    }
}