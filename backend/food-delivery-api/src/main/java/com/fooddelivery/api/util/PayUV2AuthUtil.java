package com.fooddelivery.api.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Utility class for generating PayU v2 authorization signatures.
 */
public final class PayUV2AuthUtil {

    private PayUV2AuthUtil() {
        // Prevent instantiation.
    }

    /**
     * Generates the SHA-512 signature required by PayU v2 APIs.
     *
     * @param requestBody JSON request body sent to PayU
     * @param date        request date in GMT format
     * @param merchantSalt PayU merchant salt
     * @return SHA-512 hexadecimal signature
     */
    public static String generateSignature(
            String requestBody,
            String date,
            String merchantSalt) {

        String hashInput =
                requestBody
                        + "|"
                        + date
                        + "|"
                        + merchantSalt;

        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-512");

            byte[] hashBytes =
                    digest.digest(hashInput.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder();

            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);

                if (hex.length() == 1) {
                    hexString.append('0');
                }

                hexString.append(hex);
            }

            return hexString.toString();

        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(
                    "SHA-512 algorithm is not available.",
                    exception);
        }
    }
}