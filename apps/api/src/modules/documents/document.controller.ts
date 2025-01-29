import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import mime from 'mime';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateDocumentDto } from './create-document.dto';
import { DocumentService } from './document.service';
import { UpdateDocumentDto } from './update-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Roles('super-admin')
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.UPLOAD_PATH || './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `temp${ext}`); // Temporary filename
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
      fileFilter: (req, file, cb) => {
        const allowedExt = ['.doc', '.docx', '.pdf'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExt.includes(ext)) {
          return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createDocument(@UploadedFile() file: Express.Multer.File, @Body() body: CreateDocumentDto) {
    if (!file) {
      throw new BadRequestException('File must be provided');
    }
    const ext = path.extname(file.originalname);
    // Save document entry in DB first
    const createdDoc = await this.documentService.createDocument({
      file_extension: ext,
      title: body.title,
      description: body.description ?? null,
      url: body.url, // User-defined permalink
      category: body.category,
      jobFamilies: {
        create: body.job_family_ids.map((id) => ({ jobFamilyId: id })),
      },
      streams: {
        create: body.job_stream_ids.map((id) => ({ jobStreamId: id })),
      },
    });

    // Rename the uploaded file to match the document's unique ID

    const newFilename = `${createdDoc.id}${ext}`;
    const newFilePath = path.join(process.env.UPLOAD_PATH || './uploads', newFilename);
    fs.renameSync(file.path, newFilePath);

    return {
      message: 'File uploaded and document created successfully',
      document: { ...createdDoc, url: body.url },
    };
  }

  @Roles('super-admin')
  @Put('/update/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.UPLOAD_PATH || './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `temp${ext}`); // Temporary filename
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedExt = ['.doc', '.docx', '.pdf'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExt.includes(ext)) {
          return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updateDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateDocumentDto,
  ) {
    const document = await this.documentService.getDocument(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // If a new file is uploaded, replace the existing file but keep the same path
    if (file) {
      const ext = path.extname(file.originalname);
      const existingFilePath = path.join(process.env.UPLOAD_PATH || './uploads', `${id}${ext}`);

      // Replace the old file
      if (fs.existsSync(existingFilePath)) {
        fs.unlinkSync(existingFilePath);
      }

      // Save the new file under the same filename
      fs.renameSync(file.path, existingFilePath);
    }

    // Update the document metadata in the database
    const updatedDoc = await this.documentService.updateDocument(id, {
      title: body.title,
      description: body.description ?? null,
      url: body.url, // User-defined permalink
      category: body.category,
      jobFamilies: {
        deleteMany: {},
        create: body.job_family_ids.map((id) => ({ jobFamilyId: id })),
      },
      streams: {
        deleteMany: {},
        create: body.job_stream_ids.map((id) => ({ jobStreamId: id })),
      },
    });

    return {
      message: 'Document updated successfully',
      document: updatedDoc,
    };
  }

  @Roles('classification', 'hiring-manager', 'total-compensation')
  @Get('file/:id')
  async serveFile(
    @Param('id') id: string,
    @Query('mode') mode: 'inline' | 'download' = 'download',
    @Res() res: Response,
  ) {
    const doc = await this.documentService.getDocument(id);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    const absolutePath = path.resolve(process.env.UPLOAD_PATH || './uploads', doc.id + doc.file_extension);
    if (!fs.existsSync(absolutePath)) {
      throw new NotFoundException('File not found on filesystem');
    }

    const fileMime = mime.lookup(absolutePath) || 'application/octet-stream';

    if (mode === 'inline') {
      if (!fileMime.includes('pdf')) {
        throw new BadRequestException('Inline view only available for PDFs');
      }
      res.setHeader('Content-Type', fileMime);
      res.setHeader('Content-Disposition', `inline; filename="${doc.title}${doc.file_extension}"`);

      const fileStream = fs.createReadStream(absolutePath);
      fileStream.pipe(res);
      return;
    } else {
      res.setHeader('Content-Type', fileMime);
      res.setHeader('Content-Disposition', `attachment; filename="${doc.title}${doc.file_extension}"`);

      const fileStream = fs.createReadStream(absolutePath);
      fileStream.pipe(res);
      return;
    }
  }

  @Roles('super-admin')
  @Delete('delete/:id')
  async deleteDocument(@Param('id') id: string) {
    const document = await this.documentService.getDocument(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Construct the file path using the document's ID and file extension
    const filePath = path.join(process.env.UPLOAD_PATH || './uploads', `${document.id}${document.file_extension}`);

    // Delete the file from the filesystem if it exists
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
        throw new BadRequestException('Failed to delete the file from the server');
      }
    }

    // Delete the document from the database
    try {
      await this.documentService.deleteDocument(id);
    } catch (err) {
      console.error(`Failed to delete document with ID: ${id}`, err);
      throw new BadRequestException('Failed to delete the document from the database');
    }

    return {
      message: 'Document and associated file deleted successfully',
    };
  }

  @Roles('classification', 'hiring-manager', 'total-compensation')
  @Get(':url')
  async serveFileByUrl(
    @Param('url') url: string,
    @Query('mode') mode: 'inline' | 'download' = 'download',
    @Res() res: Response,
  ) {
    // Decode the URL parameter to handle special characters
    const decodedUrl = decodeURIComponent(url);

    // Find the document by its custom URL
    const doc = await this.documentService.getDocumentByUrl(decodedUrl);
    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    // Construct the file path
    const absolutePath = path.resolve(process.env.UPLOAD_PATH || './uploads', doc.id + doc.file_extension);

    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
      throw new NotFoundException('File not found on filesystem');
    }

    // Determine the file's MIME type
    const fileMime = mime.lookup(absolutePath) || 'application/octet-stream';

    // Set response headers based on the mode (inline or download)
    if (mode === 'inline') {
      if (!fileMime.includes('pdf')) {
        throw new BadRequestException('Inline view only available for PDFs');
      }
      res.setHeader('Content-Type', fileMime);
      res.setHeader('Content-Disposition', `inline; filename="${doc.title}${doc.file_extension}"`);
    } else {
      res.setHeader('Content-Type', fileMime);
      res.setHeader('Content-Disposition', `attachment; filename="${doc.title}${doc.file_extension}"`);
    }

    // Stream the file to the response
    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }
}
