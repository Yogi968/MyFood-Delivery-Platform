package com.fooddelivery.api.dto;

/**
 * Represents an error returned by PayU v2.
 */
public class PayUV2Error {

    private String type;

    private String code;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}