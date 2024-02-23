export class CreateLogDto {
  level: string;
  message: string;
  stack?: string;
  timestamp: string;
}
