import { Test, TestingModule } from '@nestjs/testing';
import { CommonZoneService } from './common-zone.service';

describe('CommonZoneService', () => {
  let service: CommonZoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonZoneService],
    }).compile();

    service = module.get<CommonZoneService>(CommonZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
