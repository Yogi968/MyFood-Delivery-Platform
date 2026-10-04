package com.fooddelivery.api.dto;

/**
 * Represents the payment request sent to the PayU v2 Hosted Checkout API.
 */
public class PayUV2PaymentRequest {

    private String accountId;

    private String txnId;

    private String currency;

    private PayUV2Order order;

    private PayUV2BillingDetails billingDetails;

    private PayUV2CallbackActions callBackActions;

    private PayUV2AdditionalInfo additionalInfo;

    /**
     * Returns the PayU merchant account ID.
     *
     * @return merchant account ID
     */
    public String getAccountId() {
        return accountId;
    }

    /**
     * Sets the PayU merchant account ID.
     *
     * @param accountId merchant account ID
     */
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    /**
     * Returns the unique transaction ID.
     *
     * @return transaction ID
     */
    public String getTxnId() {
        return txnId;
    }

    /**
     * Sets the unique transaction ID.
     *
     * @param txnId transaction ID
     */
    public void setTxnId(String txnId) {
        this.txnId = txnId;
    }

    /**
     * Returns the transaction currency.
     *
     * @return currency code
     */
    public String getCurrency() {
        return currency;
    }

    /**
     * Sets the transaction currency.
     *
     * @param currency currency code
     */
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    /**
     * Returns order information.
     *
     * @return PayU order details
     */
    public PayUV2Order getOrder() {
        return order;
    }

    /**
     * Sets order information.
     *
     * @param order PayU order details
     */
    public void setOrder(PayUV2Order order) {
        this.order = order;
    }

    /**
     * Returns billing information.
     *
     * @return billing details
     */
    public PayUV2BillingDetails getBillingDetails() {
        return billingDetails;
    }

    /**
     * Sets billing information.
     *
     * @param billingDetails billing details
     */
    public void setBillingDetails(PayUV2BillingDetails billingDetails) {
        this.billingDetails = billingDetails;
    }

    /**
     * Returns callback actions.
     *
     * @return callback actions
     */
    public PayUV2CallbackActions getCallBackActions() {
        return callBackActions;
    }

    /**
     * Sets callback actions.
     *
     * @param callBackActions callback actions
     */
    public void setCallBackActions(PayUV2CallbackActions callBackActions) {
        this.callBackActions = callBackActions;
    }

    /**
     * Returns additional payment information.
     *
     * @return additional information
     */
    public PayUV2AdditionalInfo getAdditionalInfo() {
        return additionalInfo;
    }

    /**
     * Sets additional payment information.
     *
     * @param additionalInfo additional information
     */
    public void setAdditionalInfo(PayUV2AdditionalInfo additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
}