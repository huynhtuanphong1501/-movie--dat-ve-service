import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { TokenService } from 'src/module-system/token/token.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, TokenService],
})
export class PostModule {}
