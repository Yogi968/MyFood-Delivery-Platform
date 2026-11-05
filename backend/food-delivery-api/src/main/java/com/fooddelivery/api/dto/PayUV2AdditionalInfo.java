package com.fooddelivery.api.dto;

/**
 * Represents additional information required by the PayU v2
 * Hosted Checkout integration.
 */
public class PayUV2AdditionalInfo {

    private String txnFlow;

    /**
     * Returns the transaction flow.
     *
     * @return transaction flow
     */
    public String getTxnFlow() {
        return txnFlow;
    }

    /**
     * Sets the transaction flow.
     *
     * @param txnFlow transaction flow
     */
    public void setTxnFlow(String txnFlow) {
        this.txnFlow = txnFlow;
    }
}