import { Test, TestingModule } from '@nestjs/testing';
import { EdificeController } from './edifice.controller';
import { EdificeService } from './edifice.service';

describe('EdificeController', () => {
  let controller: EdificeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdificeController],
      providers: [EdificeService],
    }).compile();

    controller = module.get<EdificeController>(EdificeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
