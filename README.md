# Movie Booking Service 🎟️

Dat Ve Service là Microservice chịu trách nhiệm quản lý đặt vé trong hệ thống xem phim.

Service xử lý:

- Lấy thông tin phòng vé theo lịch chiếu
- Đặt vé xem phim
- Tạo lịch chiếu
- Kiểm tra quyền người dùng
- Quản lý thông tin ghế và lịch chiếu

Dat Ve Service giao tiếp với Gateway thông qua RabbitMQ.

---

# Architecture

```
                         Client
                           |
                           |
                           v

                    +-------------+
                    |   Gateway   |
                    |   NestJS    |
                    +-------------+

                           |
                           |
                      RabbitMQ

                           |
                           v

                 +----------------+
                 | Dat Ve Service |
                 |    NestJS      |
                 +----------------+

                           |
                           v

                    MySQL Database
```

---

# Technology Stack

## Backend

- Node.js
- NestJS
- TypeScript

## Database

- Prisma ORM
- MySQL

## Communication

- RabbitMQ

## Authentication

- JWT
- Bearer Token

## Documentation

- Swagger

## Deployment

- Docker
- Docker Compose
- GitHub Actions
- Docker Hub

---

# Project Structure

```
dat-ve-service

├── src

│
├── module-api
│
│   └── quan-li-dat-ve
│       │
│       ├── dto
│       │   ├── quanLyVe.dto.ts
│       │   └── taoLichChieu.dto.ts
│       │
│       ├── quan-li-dat-ve.controller.ts
│       ├── quan-li-dat-ve.service.ts
│       └── quan-li-dat-ve.module.ts
│
│
├── module-system
│
│   ├── prisma
│   └── token
│
├── Dockerfile
├── package.json
└── README.md
```

---

# API Documentation

Swagger:

```
http://localhost:3069/api-docs
```

Swagger hỗ trợ:

- API Testing
- Query Parameters
- Request Body
- JWT Bearer Token

---

# Booking APIs

# 1. Lấy danh sách phòng vé


API:

```
GET

/api/QuanLyDatVe/LayDanhSachPhongVe
```


Mục đích:

Lấy thông tin phòng vé dựa theo lịch chiếu.


Query:

```
MaLichChieu
```


Example:

```
/LayDanhSachPhongVe?MaLichChieu=47740
```


Parameter:


| Parameter | Type | Required |
|-|-|-|
| MaLichChieu | number | true |


Response example:

```json
{
    "maLichChieu":47740,
    "thongTinPhim":{
        "tenPhim":"Avengers",
        "ngayChieu":"2026-08-20",
        "gioChieu":"19:00"
    },
    "danhSachGhe":[
        {
            "maGhe":1,
            "tenGhe":"A01",
            "daDat":false
        },
        {
            "maGhe":2,
            "tenGhe":"A02",
            "daDat":true
        }
    ]
}
```

---

# 2. Đặt vé


API:

```
POST

/api/QuanLyDatVe/DatVe
```


Require:

```
Bearer Token
```


Header:

```http
Authorization: Bearer <access_token>
```


Content-Type:

```
application/json
```


Body:

```json
{
    "maLichChieu":3,
    "danhSachVe":[
        {
            "maGhe":1
        },
        {
            "maGhe":2
        }
    ]
}
```


Flow:

```
Client

 |

Bearer Token

 |

Gateway

 |

Verify JWT

 |

Dat Ve Service

 |

Check Seat

 |

Create Booking

 |

Database
```

---

# 3. Tạo lịch chiếu


API:

```
POST

/api/QuanLyDatVe/TaoLichChieu
```


Require:

```
Bearer Token
```


Header:

```http
Authorization: Bearer <admin_token>
```


Mục đích:

Tạo lịch chiếu mới cho phim.


Body:

```json
{
    "maPhim":1,
    "maRap":2,
    "ngayChieuGioChieu":"2026-08-20T19:00:00",
    "giaVe":75000
}
```


Flow:

```
Admin

 |

Bearer Token

 |

Gateway

 |

Dat Ve Service

 |

Check Role

 |

Create Showtime
```

---

# Authentication & Authorization


Các API:

```
DatVe

TaoLichChieu
```

yêu cầu JWT.


Flow:


```
Client

 |

Authorization Header

 |

Gateway

 |

authorizationHelper()

 |

Verify JWT

 |

Service
```


---

# RabbitMQ Communication


Flow:


```
Client

 |

HTTP Request

 |

Gateway

 |

RabbitMQ

 |

Dat Ve Service

 |

Database
```


---

# Environment Variables


Tạo file:

```
.env
```


Example:


```env
PORT=3074


DATABASE_URL=mysql://root:password@database:3306/db_movie


RABBITMQ_URL=amqp://user:password@rabbitmq:5672


JWT_SECRET_KEY=your_secret


JWT_REFRESH_SECRET=your_refresh_secret
```

---

# Installation


Install dependencies:

```bash
npm install
```

---

# Run Application


Development:

```bash
npm run start:dev
```


Build:

```bash
npm run build
```


Production:

```bash
npm run start:prod
```

---

# Docker


Build image:

```bash
docker build \
-t phonghuynh1501/img-dat-ve-service:latest .
```


Push Docker Hub:

```bash
docker push phonghuynh1501/img-dat-ve-service:latest
```


Run:

```bash
docker compose up -d
```

---

# CI/CD Flow


```
Developer

    |

git push main

    |

GitHub Actions CI

    |

Docker Build

    |

Docker Hub

    |

GitHub Actions CD

    |

EC2 Self-hosted Runner

    |

Docker Compose Deploy
```

---

# Related Services


## Gateway

Repository:

https://github.com/huynhtuanphong1501/-movie--gateway


## User Service

Repository:

https://github.com/huynhtuanphong1501/-movie--user-service


## Phim Service

Repository:

https://github.com/huynhtuanphong1501/-movie--phim-service


## Rap Service

Repository:

https://github.com/huynhtuanphong1501/-movie--rap-service


---

# Author

**Huynh Tuan Phong**

Movie Management System

Microservices Architecture
