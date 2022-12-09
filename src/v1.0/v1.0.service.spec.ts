import { Test, TestingModule } from '@nestjs/testing';
import { V10Service } from './v1.0.service';

describe('V10Service', () => {
  let service: V10Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [V10Service],
    }).compile();

    service = module.get<V10Service>(V10Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
