import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { NotesService } from '../service/notes.service';
import { CreateNoteDto } from '../dto/create.note.dto';
import { UpdateNoteDto } from '../dto/update.note.dto';
import { SearchNotesDto } from '../dto/search.note.dto';

@Controller('api/v1/notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.notesService.findOne(+id, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.notesService.findAll(req.user.id);
  }

  //   @Get('search')
  //   search(@Body() searchDto: SearchNotesDto, @Request() req) {
  //     return this.notesService.search(req.user.id, searchDto);
  //   }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.create(createNoteDto, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req,
  ) {
    return this.notesService.update(+id, updateNoteDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.notesService.remove(+id, req.user.id);
  }
}
