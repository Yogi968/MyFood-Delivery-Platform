package com.fooddelivery.api.dto;

/**
 * Represents the response returned by the PayU v2 payment API.
 */
public class PayUV2PaymentResponse {

    private String status;

    private String message;

    private PayUV2Result result;

    /**
     * Returns the PayU response status.
     *
     * @return response status
     */
    public String getStatus() {
        return status;
    }

    /**
     * Sets the PayU response status.
     *
     * @param status response status
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * Returns the PayU response message.
     *
     * @return response message
     */
    public String getMessage() {
        return message;
    }

    /**
     * Sets the PayU response message.
     *
     * @param message response message
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Returns the PayU payment result.
     *
     * @return payment result
     */
    public PayUV2Result getResult() {
        return result;
    }

    /**
     * Sets the PayU payment result.
     *
     * @param result payment result
     */
    public void setResult(PayUV2Result result) {
        this.result = result;
    }
}