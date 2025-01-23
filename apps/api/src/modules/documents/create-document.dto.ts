import { DocumentCategory } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsEnum(DocumentCategory)
  category: DocumentCategory;

  // Transform the incoming JSON string into an actual array of numbers
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    // If the front end didn't send anything, skip
    if (!value) return [];
    // If it's already an array (edge case), return as-is
    if (Array.isArray(value)) return value;
    // Otherwise parse the JSON string
    return JSON.parse(value).map((item: string | number) => Number(item));
  })
  job_family_ids?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return JSON.parse(value).map((item: string | number) => Number(item));
  })
  job_stream_ids?: number[];
}
