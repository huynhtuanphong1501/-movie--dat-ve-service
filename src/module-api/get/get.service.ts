import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetService {
    constructor(private prisma: PrismaService) { }
    async layDanhSachPhongVe(maLichChieu: number) { 
        const lichChieu = await this.prisma.lichChieu.findUnique({
            where: {
                ma_lich_chieu: maLichChieu,
            },
        });

        if (!lichChieu) {
            throw new RpcException({
            statusCode: 404,
            message: 'Không tìm thấy lịch chiếu',
            });
        }

        const danhSachPhongVe = await this.prisma.lichChieu.findUnique({
            where: {
                ma_lich_chieu: maLichChieu,
            },
            include: {
                RapPhim: {
                include: {
                    Ghe: true,
                },
                },
            },
        });

        return danhSachPhongVe;
    }
}
