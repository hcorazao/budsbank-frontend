import { QuizesModule } from './quizes.module';

describe('QuizesModule', () => {
  let quizesModule: QuizesModule;

  beforeEach(() => {
    quizesModule = new QuizesModule();
  });

  it('should create an instance', () => {
    expect(quizesModule).toBeTruthy();
  });
});
