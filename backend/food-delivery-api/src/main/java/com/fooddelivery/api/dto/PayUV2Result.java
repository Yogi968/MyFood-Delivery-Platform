package com.fooddelivery.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Represents the result returned by PayU v2.
 *
 * PayU may return either a successful checkout URL
 * or an error object inside the result.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PayUV2Result {

    private String checkoutUrl;

    private PayUV2Error error;

    public String getCheckoutUrl() {
        return checkoutUrl;
    }

    public void setCheckoutUrl(String checkoutUrl) {
        this.checkoutUrl = checkoutUrl;
    }

    public PayUV2Error getError() {
        return error;
    }

    public void setError(PayUV2Error error) {
        this.error = error;
    }
}