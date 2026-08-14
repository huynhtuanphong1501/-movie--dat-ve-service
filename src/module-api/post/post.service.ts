import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { TokenService } from 'src/module-system/token/token.service';


@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private token: TokenService) { }
  async datVe(data: any) {
    try {
      const token = data.token || '';

      if (!token) {
        throw new RpcException({
          statusCode: 401,
          message: 'Không có token',
        });
      }

      const decode =
        this.token.verifyAccessToken(token);

      if (!decode) {
        throw new RpcException({
          statusCode: 401,
          message: 'Token không hợp lệ',
        });
      }

      const ve = data.danhSachVe[0];

      const maLichChieu = Number(
        data.maLichChieu,
      );

      const maGhe = Number(
        ve.maGhe,
      );

      const checkGhe = await this.prisma.datVe.findFirst({
          where: {
            ma_lich_chieu: maLichChieu,
            ma_ghe: maGhe,
          },
        });

      if (checkGhe) {
        throw new RpcException({
          statusCode: 400,
          message: 'Ghế này đã được đặt',
        });
      }

      const datVe = await this.prisma.datVe.create({
          data: {
            tai_khoan: decode.tai_khoan,
            ma_lich_chieu: maLichChieu,
            ma_ghe: maGhe,
          },
        });

      return {
        statusCode: 201,
        message: 'Đặt vé thành công',
        data: datVe,
      };

    } catch (error) {
      console.error(
        'datVe error:',
        error,
      );

      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        statusCode: 400,
        message: 'Đặt vé thất bại',
      });
    }
  }

  async taoLichChieu(data: any) {
  try {
    const token = data.token || '';

    if (!token) {
      throw new RpcException({
        statusCode: 401,
        message: 'Không có token',
      });
    }

    const decode = this.token.verifyAccessToken(token);

    if (!decode) {
      throw new RpcException({
        statusCode: 401,
        message: 'Token không hợp lệ',
      });
    }

    const nguoiDung = await this.prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: Number(
            decode.tai_khoan,
          ),
        },
      });

    if (!nguoiDung) {
      throw new RpcException({
        statusCode: 404,
        message:
          'Không tìm thấy người dùng',
      });
    }

    if ( nguoiDung.loai_nguoi_dung !== 'QuanTri') {
      throw new RpcException({
        statusCode: 403,
        message:
          'Bạn không có quyền tạo lịch chiếu',
      });
    }

    const lichChieu = await this.prisma.lichChieu.create({
        data: {
          ma_phim: Number(
            data.maPhim,
          ),

          ma_rap: Number(
            data.maRap,
          ),

          ngay_gio_chieu:
            new Date(
              data.ngayChieuGioChieu,
            ),

          gia_ve: Number(
            data.giaVe,
          ),
        },
      });

    return {
      statusCode: 201,
      message:
        'Tạo lịch chiếu thành công',
      data: lichChieu,
    };

  } catch (error) {
    console.error(
      'taoLichChieu error:',
      error,
    );

    if (
      error instanceof RpcException
    ) {
      throw error;
    }

    throw new RpcException({
      statusCode: 400,
      message:
        'Tạo lịch chiếu thất bại',
    });
  }
}
}
