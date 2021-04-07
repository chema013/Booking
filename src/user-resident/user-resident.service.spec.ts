import { Test, TestingModule } from '@nestjs/testing';
import { UserResidentService } from './user-resident.service';

describe('UserResidentService', () => {
  let service: UserResidentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResidentService],
    }).compile();

    service = module.get<UserResidentService>(UserResidentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
