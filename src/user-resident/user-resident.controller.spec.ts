import { Test, TestingModule } from '@nestjs/testing';
import { UserResidentController } from './user-resident.controller';
import { UserResidentService } from './user-resident.service';

describe('UserResidentController', () => {
  let controller: UserResidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResidentController],
      providers: [UserResidentService],
    }).compile();

    controller = module.get<UserResidentController>(UserResidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
