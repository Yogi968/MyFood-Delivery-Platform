package com.fooddelivery.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Stores PayU configuration properties used by the payment integration.
 */
@Configuration
@ConfigurationProperties(prefix = "payu")
public class PayUConfig {

    private String merchantKey;

    private String merchantSalt;

    private String paymentUrl;

    private String verifyUrl;

    /**
     * Returns the PayU merchant key.
     *
     * @return PayU merchant key
     */
    public String getMerchantKey() {
        return merchantKey;
    }

    /**
     * Sets the PayU merchant key.
     *
     * @param merchantKey PayU merchant key
     */
    public void setMerchantKey(String merchantKey) {
        this.merchantKey = merchantKey;
    }

    /**
     * Returns the PayU merchant salt.
     *
     * @return PayU merchant salt
     */
    public String getMerchantSalt() {
        return merchantSalt;
    }

    /**
     * Sets the PayU merchant salt.
     *
     * @param merchantSalt PayU merchant salt
     */
    public void setMerchantSalt(String merchantSalt) {
        this.merchantSalt = merchantSalt;
    }

    /**
     * Returns the PayU payment endpoint.
     *
     * @return PayU payment URL
     */
    public String getPaymentUrl() {
        return paymentUrl;
    }

    /**
     * Sets the PayU payment endpoint.
     *
     * @param paymentUrl PayU payment URL
     */
    public void setPaymentUrl(String paymentUrl) {
        this.paymentUrl = paymentUrl;
    }

    /**
     * Returns the PayU payment verification endpoint.
     *
     * @return PayU verification URL
     */
    public String getVerifyUrl() {
        return verifyUrl;
    }

    /**
     * Sets the PayU payment verification endpoint.
     *
     * @param verifyUrl PayU verification URL
     */
    public void setVerifyUrl(String verifyUrl) {
        this.verifyUrl = verifyUrl;
    }
}