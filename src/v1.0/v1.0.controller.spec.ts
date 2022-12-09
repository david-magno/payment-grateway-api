import { Test, TestingModule } from '@nestjs/testing';
import { V10Controller } from './v1.0.controller';

describe('V10Controller', () => {
  let controller: V10Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [V10Controller],
    }).compile();

    controller = module.get<V10Controller>(V10Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
