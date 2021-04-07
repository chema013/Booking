import { Module } from '@nestjs/common';
import { EdificeService } from './edifice.service';
import { EdificeController } from './edifice.controller';

@Module({
  controllers: [EdificeController],
  providers: [EdificeService]
})
export class EdificeModule {}
