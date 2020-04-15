import { PaymentModule } from './payment.module';

describe('UserModule', () => {
  let paymentModule: PaymentModule;

  beforeEach(() => {
    paymentModule = new PaymentModule();
  });

  it('should create an instance', () => {
    expect(paymentModule).toBeTruthy();
  });
});
