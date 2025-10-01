import { Injectable, NotFoundException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from '../dto/create.note.dto';
import { UpdateNoteDto } from '../dto/update.note.dto';
import { SearchNotesDto } from '../dto/search.note.dto';
import { Note } from 'generated/prisma';

@Injectable()
export class NotesService {
  private readonly redis: Redis;

  constructor(private prisma: PrismaService) {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379'),
    });
  }

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const note = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        tags: createNoteDto.tags || [],
        userId,
      },
    });

    await this.invalidateCacheForUser(userId);

    return note;
  }

  async findAll(userId: number): Promise<Note[]> {
    return this.prisma.note.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Note> {
    const note = await this.prisma.note.findFirst({ where: { id, userId } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
    userId: number,
  ): Promise<Note> {
    await this.findOne(id, userId);
    const updated = await this.prisma.note.update({
      where: { id },
      data: { ...updateNoteDto, updatedAt: new Date() },
    });
    await this.invalidateCacheForUser(userId);
    return updated;
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId);
    await this.prisma.note.delete({ where: { id } });
    await this.invalidateCacheForUser(userId);
  }

  async search(userId: number, searchDto: SearchNotesDto): Promise<Note[]> {
    const cacheKey = `notes:search:${userId}:${JSON.stringify(searchDto.tags || [])}`;
    let redisCached = await this.redis.get(cacheKey);
    if (redisCached) {
      return JSON.parse(redisCached);
    }

    const where: any = { userId };
    if (searchDto.tags && searchDto.tags.length > 0) {
      where.tags = { hasSome: searchDto.tags };
    }
    const notes = await this.prisma.note.findMany({ where });

    await this.redis.setex(cacheKey, 300, JSON.stringify(notes));
    return notes;
  }

  private async invalidateCacheForUser(userId: number): Promise<void> {
    const keys = await this.redis.keys(`notes:search:${userId}:*`);
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
  }
}
