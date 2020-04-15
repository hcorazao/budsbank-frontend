import { DispensariesModule } from './dispensaries.module';

describe('UserModule', () => {
  let dispensariesModule: DispensariesModule;

  beforeEach(() => {
    dispensariesModule = new DispensariesModule();
  });

  it('should create an instance', () => {
    expect(dispensariesModule).toBeTruthy();
  });
});