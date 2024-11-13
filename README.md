
## Yêu cầu

Trước khi bắt đầu, bạn cần cài đặt các yêu cầu sau:

### Phía server:
- **Node.js** (phiên bản >= 14.x)
- **MongoDB** (phiên bản >= 7.0)

### Phía client:
- **Node.js** (phiên bản >= 14.x)
- **React** (phiên bản >= 17.x)

## Cài đặt và chạy

### 1. Cài đặt và chạy Server API

#### Bước 1: Cài đặt phụ thuộc

1. Điều hướng vào thư mục `/server`:

    ```bash
    cd server
    ```

2. Cài đặt các phụ thuộc của server:

    ```bash
    npm install
    ```

#### Bước 2: Cấu hình môi trường

1. Tạo một tệp `.env` trong thư mục `/server` với nội dung sau:

    ```env
    MONGODB_URI=mongodb://localhost:27017/EMVNTEST
    PORT=3001
    ```

   - `MONGODB_URI` là kết nối đến cơ sở dữ liệu MongoDB.
   - `PORT` là cổng mà server sẽ lắng nghe.

#### Bước 3: Chạy server

1. Chạy server API:

    ```bash
    npm start
    ```

   Server sẽ chạy tại `http://localhost:5000`.

### 2. Cài đặt và chạy Client (Giao diện người dùng)

#### Bước 1: Cài đặt phụ thuộc

1. Điều hướng vào thư mục `/client`:

    ```bash
    cd client
    ```

2. Cài đặt các phụ thuộc của client:

    ```bash
    npm install
    ```

#### Bước 2: Chạy client

1. Chạy ứng dụng React:

    ```bash
    npm start
    ```

   Giao diện người dùng sẽ được mở tại `http://localhost:3000`.

### 3. Kết nối Client với Server

Client sẽ tự động kết nối với server ở `http://localhost:3001` để lấy dữ liệu và thực hiện các yêu cầu API. Bạn có thể thay đổi cài đặt kết nối trong mã nguồn nếu cần thiết.

## Các tính năng của API
-**được mô tả trong file README.md của server-**

### 3. Tìm kiếm bản nhạc và danh sách phát
- **Tìm kiếm nhạc**: `GET /api/search/tracks?filter=<từ khóa>`

### 4. Tải lên bản nhạc
- **Tải lên MP3**: API hỗ trợ tải lên các tệp MP3 khi tạo hoặc cập nhật bản nhạc.

### 6. Tính năng tìm kiếm mờ (fuzzy search)
- API hỗ trợ tìm kiếm gần đúng cho các bản nhạc.

## Cấu hình MongoDB

MongoDB được sử dụng để lưu trữ tất cả dữ liệu, bao gồm các bản nhạc và danh sách phát. Cơ sở dữ liệu sẽ được khôi phục từ tệp sao lưu bên trong file server.


1. Mã nguồn hoàn chỉnh của API (server).
2. Mã nguồn hoàn chỉnh của giao diện người dùng (client).
3. Tệp kết xuất cơ sở dữ liệu MongoDB (`EMVNTEST_dump.tar.gz`).


