import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetService } from './get.service';
import { DATVE_PATTERN } from 'src/common/patterns/rabbitmq.pattern';


@Controller()
export class GetController {
  constructor(private readonly getService: GetService) {}

  @MessagePattern(DATVE_PATTERN.LAYDANHSACHPHONGVE)
  layDanhSachPhongVe(@Payload() MaLichChieu: number) {
    return this.getService.layDanhSachPhongVe(MaLichChieu);
  }
}
