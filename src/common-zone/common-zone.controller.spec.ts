import { Test, TestingModule } from '@nestjs/testing';
import { CommonZoneController } from './common-zone.controller';
import { CommonZoneService } from './common-zone.service';

describe('CommonZoneController', () => {
  let controller: CommonZoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonZoneController],
      providers: [CommonZoneService],
    }).compile();

    controller = module.get<CommonZoneController>(CommonZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
