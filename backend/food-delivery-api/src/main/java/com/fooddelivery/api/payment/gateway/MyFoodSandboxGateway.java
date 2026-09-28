package com.fooddelivery.api.payment.gateway;

import com.fooddelivery.api.dto.PaymentInitiationResponse;
import com.fooddelivery.api.dto.PaymentRequest;
import com.fooddelivery.api.dto.PaymentResponse;
import com.fooddelivery.api.entity.Payment;
import com.fooddelivery.api.entity.PaymentMethod;
import com.fooddelivery.api.entity.PaymentStatus;
import org.springframework.stereotype.Component;

/**
 * Development payment gateway used to simulate payment processing
 * without depending on an external payment provider.
 *
 * <p>
 * This implementation is intentionally isolated behind the
 * {@link PaymentGateway} interface so that it can later be replaced
 * by a real provider such as Razorpay, PayU, or BillDesk.
 * </p>
 */
@Component
public class MyFoodSandboxGateway implements PaymentGateway {

    /**
     * Creates a simulated payment initiation response
     * using the MyFood development sandbox.
     *
     * <p>
     * No external payment provider is contacted. The sandbox
     * simply prepares payment information for development purposes.
     * </p>
     *
     * @param payment payment transaction created by the application
     * @return simulated payment initiation information
     */
    @Override
    public PaymentInitiationResponse createPayment(Payment payment) {

        PaymentInitiationResponse response =
                new PaymentInitiationResponse();

        response.setPaymentUrl("http://localhost:4200/payment");
        response.setKey("MYFOOD_SANDBOX");
        response.setTransactionId(payment.getTransactionId());
        response.setAmount(payment.getAmount().toString());
        response.setProductInfo(
                "MyFood Order #" + payment.getOrder().getId()
        );
        response.setFirstName(payment.getOrder().getFullName());
        response.setPhone(payment.getOrder().getPhoneNumber());

        return response;
    }
    /**
     * Verifies a simulated payment transaction.
     *
     * @param transactionId unique transaction identifier
     * @return verified payment response
     */
    @Override
    public PaymentResponse verifyPayment(String transactionId) {
        throw new UnsupportedOperationException(
                "Sandbox payment verification will be implemented in the next step."
        );
    }
}