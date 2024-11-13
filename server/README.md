

# API Quản Lý Track

Đây là một API backend để quản lý các bản nhạc. API cho phép lấy tất cả các bản nhạc với các tùy chọn lọc, sắp xếp và phân trang.


## Tính Năng
  ## Quản lý Track
- **Lấy tất cả bản nhạc** với các tùy chọn lọc, sắp xếp và phân trang.
- **Lọc**: Lọc bản nhạc theo các trường cụ thể sử dụng biểu thức chính quy.
- **Sắp xếp**: Sắp xếp bản nhạc theo các trường, bao gồm ngày tạo và ngày cập nhật.
- **Phân trang**: Kiểm soát số lượng kết quả trên mỗi trang và điều hướng giữa các trang.
  ## Quản lí Playlist
- **Tạo Playlist**: Cho phép người dùng tạo danh sách phát mới với các trường như tiêu đề và ảnh bìa.
- **Lấy tất cả Playlist**: Lấy danh sách tất cả các danh sách phát có trong hệ thống.
- **Cập nhật Playlist**: Cập nhật thông tin của một danh sách phát, chẳng hạn như thay đổi tên hoặc ảnh bìa hoặc thêm bản nhạc vào playlist.
- **Xóa Playlist**: Xóa một danh sách phát khỏi hệ thống.
## Các Endpoint API

### Endpoints

#### Track Endpoints
- `GET /tracks` - Get all tracks with filtering, sorting and pagination
  - Filter by artist: `/tracks?filter=artist,John%20Doe`
  - Filter by genre: `/tracks?filter=genre,Rock`
  - Filter by album: `/tracks?filter=album,Greatest%20Hits`
  - Filter by releaseYear: `/tracks?filter=releaseYear,2022`
  - Filter by title: `/tracks?filter=title,Song%20Name`
  - Sort ascending: `/tracks?sort=asc,fieldname`
  - Sort descending: `/tracks?sort=desc,fieldname`
  - Pagination: `/tracks?page=1&limit=10`
- `POST /tracks` - Create a new track with audio file upload
- `GET /tracks/:id` - Get track by ID
- `PUT /tracks/:id` - Update track by ID
- `DELETE /tracks/:id` - Delete track by ID

#### Playlist Endpoints
- `GET /playlists` - Get all playlists
- `POST /playlists` - Create a new playlist
- `GET /playlists/:id` - Get playlist by ID
- `PUT /playlists/:id` - Update playlist by ID
- `DELETE /playlists/:id` - Delete playlist by ID


#### Tham Số Truy Vấn
- **limit** (`số`): Số lượng bản ghi trả về trên mỗi trang. Mặc định: 10.
- **page** (`số`): Số trang hiện tại. Mặc định: 1.
- **sort** (`mảng`): Thông tin sắp xếp. Ví dụ: `["asc", "title"]` (sắp xếp theo tiêu đề theo thứ tự tăng dần).
- **filter** (`mảng`): Mảng gồm hai phần tử để lọc. Ví dụ: `["artist", "John Doe"]` (lọc bản nhạc theo tên nghệ sĩ).

#### Ví Dụ Phản Hồi:
```json
{
  "status": "OK",
  "message": "Success",
  "data": [
    {
      "title": "Track Title 1",
      "artist": "Artist Name",
      "album": "Album Name",
      "genre": "Rock",
      "releaseYear": 2022,
      "duration": "3:45",
      "audioFile": "http://example.com/audio1.mp3",
      "createdAt": "2022-01-01T12:00:00Z",
      "updatedAt": "2022-01-01T12:00:00Z"
    }
  ],
  "total": 100,
  "pageCurrent": 1,
  "totalPage": 10
}
```

### Ví Dụ Yêu Cầu:
```bash
GET /tracks?limit=10&page=1&sort=asc,title&filter=artist,John%20Doe
```

---

## Cài Đặt

1. **Clone kho lưu trữ** về máy tính của bạn:
   ```bash
   git clone 

2. **Đi đến thư mục dự án**:
   ```bash
   cd server
   ```

3. **Cài đặt các phụ thuộc** sử dụng `npm` hoặc `yarn`:
   ```bash
   npm install
   ```
   hoặc
   ```bash
   yarn install
   ```

4. **Cấu hình các Biến Môi Trường**:
   - Tạo tệp `.env` ở thư mục gốc.
   - Thêm các biến sau:
   PORT=3001
MONGO_URI=mongodb://localhost:27017/EMVNTEST
API_URL=http://localhost:3001


5. **Khởi động server**:
   ```bash
   npm start
   ```
   hoặc
   ```bash
   yarn start
   ```

   Server sẽ chạy tại `http://localhost:3001`.

---

## Sử Dụng

Dự án này cung cấp một API mà bạn có thể tương tác bằng cách gửi các yêu cầu HTTP. Bạn có thể sử dụng các công cụ như Postman hoặc Insomnia, hoặc trực tiếp tương tác với nó từ ứng dụng frontend của bạn.

- Để lấy các bản nhạc với phân trang, sắp xếp và lọc, hãy sử dụng endpoint `/tracks` như mô tả trong phần [Các Endpoint API](#các-endpoint-api).


