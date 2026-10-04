import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';;
import { BaseApiService } from '../http/base-apiservice';
import {PaymentRequest, PaymentInitiationResponse } from '../../../models/payment.models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseApiService = inject(BaseApiService);
  private readonly apiUrl =
    'http://localhost:8080/api';
  /**
   * Initiates an online payment for the specified order.
   *
   * @param request payment details required to initiate the transaction
   * @returns observable containing the PayU checkout information
   */
  createPayment(
    request: PaymentRequest
  ): Observable<PaymentInitiationResponse> {
    return this.baseApiService.post<PaymentInitiationResponse>(
      `${this.apiUrl}/payments/v2`,
      request
    );
  }
}