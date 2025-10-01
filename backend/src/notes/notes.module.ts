import { Module } from '@nestjs/common';
import { NotesController } from './controller/notes.controller';
import { NotesService } from './service/notes.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
})
export class NotesModule {}
