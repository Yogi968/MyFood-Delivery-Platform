package com.fooddelivery.api.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Utility class responsible for generating SHA-512 hashes
 * required for PayU payment integration.
 */
public final class PayUHashUtil {

    /**
     * Private constructor to prevent creation of utility class objects.
     */
    private PayUHashUtil() {
    }

    /**
     * Generates a SHA-512 hash for the supplied input string.
     *
     * @param input value that needs to be hashed
     * @return hexadecimal SHA-512 hash
     */
    public static String generateSha512(String input) {

        try {
            MessageDigest messageDigest =
                    MessageDigest.getInstance("SHA-512");

            byte[] hashBytes =
                    messageDigest.digest(
                            input.getBytes(StandardCharsets.UTF_8)
                    );

            StringBuilder hash = new StringBuilder();

            for (byte hashByte : hashBytes) {
                hash.append(String.format("%02x", hashByte));
            }

            return hash.toString();

        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException(
                    "SHA-512 algorithm is not available.",
                    exception
            );
        }
    }
}