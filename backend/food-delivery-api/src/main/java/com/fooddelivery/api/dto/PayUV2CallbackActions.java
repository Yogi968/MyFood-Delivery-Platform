package com.fooddelivery.api.dto;

/**
 * Represents callback URLs used by PayU after payment processing.
 */
public class PayUV2CallbackActions {

    private String successAction;

    private String failureAction;

    private String cancelAction;

    /**
     * Returns the success callback URL.
     *
     * @return success callback URL
     */
    public String getSuccessAction() {
        return successAction;
    }

    /**
     * Sets the success callback URL.
     *
     * @param successAction success callback URL
     */
    public void setSuccessAction(String successAction) {
        this.successAction = successAction;
    }

    /**
     * Returns the failure callback URL.
     *
     * @return failure callback URL
     */
    public String getFailureAction() {
        return failureAction;
    }

    /**
     * Sets the failure callback URL.
     *
     * @param failureAction failure callback URL
     */
    public void setFailureAction(String failureAction) {
        this.failureAction = failureAction;
    }

    /**
     * Returns the cancellation callback URL.
     *
     * @return cancellation callback URL
     */
    public String getCancelAction() {
        return cancelAction;
    }

    /**
     * Sets the cancellation callback URL.
     *
     * @param cancelAction cancellation callback URL
     */
    public void setCancelAction(String cancelAction) {
        this.cancelAction = cancelAction;
    }
}