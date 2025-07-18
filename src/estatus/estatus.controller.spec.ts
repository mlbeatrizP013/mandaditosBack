import { Test, TestingModule } from '@nestjs/testing';
import { EstatusController } from './estatus.controller';
import { EstatusService } from './estatus.service';

describe('EstatusController', () => {
  let controller: EstatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatusController],
      providers: [EstatusService],
    }).compile();

    controller = module.get<EstatusController>(EstatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
