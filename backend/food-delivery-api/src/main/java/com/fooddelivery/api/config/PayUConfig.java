package com.fooddelivery.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Stores PayU configuration required by the backend.
 *
 * <p>
 * The actual PayU credentials are loaded from environment variables
 * through application.properties and are not hardcoded in the source code.
 * </p>
 */
@Configuration
public class PayUConfig {

    /**
     * PayU merchant key used to identify the merchant account.
     */
    @Value("${payu.merchant-key}")
    private String merchantKey;

    /**
     * PayU merchant salt used for server-side hash generation.
     */
    @Value("${payu.merchant-salt}")
    private String merchantSalt;

    /**
     * Returns the PayU merchant key.
     *
     * @return PayU merchant key
     */
    public String getMerchantKey() {
        return merchantKey;
    }

    /**
     * Returns the PayU merchant salt.
     *
     * @return PayU merchant salt
     */
    public String getMerchantSalt() {
        return merchantSalt;
    }
}