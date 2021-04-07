import { Test, TestingModule } from '@nestjs/testing';
import { EdificeService } from './edifice.service';

describe('EdificeService', () => {
  let service: EdificeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdificeService],
    }).compile();

    service = module.get<EdificeService>(EdificeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
