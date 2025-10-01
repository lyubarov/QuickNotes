import { IsOptional, IsArray, IsString } from 'class-validator';

export class SearchNotesDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
