/**
 * Represents the payment initiation request sent to the backend.
 */
export interface PaymentRequest {
  orderId: number;
  paymentMethod: 'COD' | 'ONLINE';
  idempotencyKey: string;
}

/**
 * Represents the response returned by the PayU v2 Hosted Checkout API.
 */
export interface PaymentInitiationResponse {
  message: string | null;
  result: PayUV2Result;
  status: string;
}

/**
 * Represents the result section of the PayU v2 payment response.
 */
export interface PayUV2Result {
  checkoutUrl: string | null;
  error: PayUV2Error | null;
}

/**
 * Represents an error returned by PayU v2.
 */
export interface PayUV2Error {
  code: string;
  type: string;
}