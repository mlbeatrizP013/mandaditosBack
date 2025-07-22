import { Test, TestingModule } from '@nestjs/testing';
import { EstatusService } from './estatus.service';

describe('EstatusService', () => {
  let service: EstatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstatusService],
    }).compile();

    service = module.get<EstatusService>(EstatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
