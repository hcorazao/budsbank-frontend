import { ForgetPasswordModule } from './auth-signin.module';

describe('ForgetPasswordModule', () => {
  let forgetPasswordModule: ForgetPasswordModule;

  beforeEach(() => {
    forgetPasswordModule = new ForgetPasswordModule();
  });

  it('should create an instance', () => {
    expect(forgetPasswordModule).toBeTruthy();
  });
});
