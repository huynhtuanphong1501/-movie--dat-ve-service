import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';
import { DATVE_PATTERN } from 'src/common/patterns/rabbitmq.pattern';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern(DATVE_PATTERN.DATVE)
  datVe(@Payload()data:any) {
    return this.postService.datVe(data);
  }

  @MessagePattern(DATVE_PATTERN.TAOLICHCHIEU)
  taoLichChieu(@Payload()data:any) {
    return this.postService.taoLichChieu(data);
  }

}
