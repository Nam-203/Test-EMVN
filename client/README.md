Dưới đây là bản dịch README.md cho phần **Frontend** của dự án API Quản Lý Thư Viện Âm Nhạc:

---

# Music Library Frontend

## Mô Tả Dự Án

Đây là giao diện người dùng frontend cho **API Quản Lý Thư Viện Âm Nhạc**, được xây dựng bằng React và kết nối với API phía backend để quản lý các bản nhạc và danh sách phát. Giao diện cho phép người dùng tìm kiếm, lọc, sắp xếp và phân trang các bản nhạc và danh sách phát, cũng như xem chi tiết về bản nhạc và các bản nhạc trong danh sách phát.

## Tính Năng

- **Hiển Thị Bản Nhạc**:

  - Xem tất cả các bản nhạc với thông tin như tiêu đề, nghệ sĩ, album, thể loại, năm phát hành, thời lượng và tệp MP3.
  - Tìm kiếm bản nhạc theo tiêu đề, nghệ sĩ, album hoặc thể loại.
  - Lọc bản nhạc theo các trường khác nhau.
  - Sắp xếp bản nhạc theo ngày tạo hoặc tiêu đề.

- **Hiển Thị Danh Sách Phát**:

  - Xem tất cả danh sách phát với tiêu đề và hình ảnh album.
  - Xem chi tiết danh sách phát và các bản nhạc trong danh sách phát.
  - Thêm bản nhạc vào danh sách phát.

- **Phân Trang và Sắp Xếp**:
  - Phân trang để giới hạn và điều hướng qua các bản nhạc và danh sách phát.
  - Sắp xếp các bản nhạc và danh sách phát theo các thuộc tính như tiêu đề hoặc ngày tạo.

## Cài Đặt

1. Clone kho lưu trữ:

   ```bash
   git clone <repository-url>
   ```

2. Cài đặt các phụ thuộc:

   ```bash
   cd <project-directory>
   npm install
   ```

3. Cấu hình các biến môi trường (ví dụ: trong tệp `.env`):

   ```bash
   VITE_API_URL_BACKEND=http://localhost:3000/api
   ```

4. Chạy ứng dụng:

   ```bash
   npm start
   ```

   Ứng dụng sẽ chạy ở `http://localhost:3000`.

## Sử Dụng

Sau khi cài đặt và chạy frontend, bạn có thể truy cập các tính năng sau:

### Xem tất cả bản nhạc

- Mở trang chủ của ứng dụng để xem tất cả các bản nhạc.
- Sử dụng chức năng tìm kiếm và lọc để tìm bản nhạc theo tiêu đề, nghệ sĩ, album hoặc thể loại.
- Phân trang và sắp xếp bản nhạc theo ngày tạo hoặc tiêu đề.

### Xem tất cả danh sách phát

- Mở trang danh sách phát để xem tất cả các danh sách phát.
- Nhấp vào danh sách phát để xem chi tiết các bản nhạc trong danh sách.
- Thêm bản nhạc vào danh sách phát.

### Thêm bản nhạc vào danh sách phát

- Từ trang chi tiết danh sách phát, bạn có thể chọn bản nhạc từ danh sách và thêm vào danh sách phát.

## Cấu Trúc Thư Mục

Dưới đây là cấu trúc thư mục của dự án:

```
##root
│
├── node_modules
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── ComponentSong
│   │   ├── DashBoardTrack
│   │   ├── DefaultComponent
│   │   ├── ExploreComponent
│   │   ├── InputComponent
│   │   ├── LoadingComponent
│   │   ├── ModalComponent
│   │   ├── ModalUpdatePlaylist
│   │   ├── SideBarComponent
│   │   └── TableComponent
│   ├── hook
│   │   ├── UseDebounce.js
│   │   └── UseMutationHook.js
│   ├── page
│   │   ├── DashBoardPage
│   │   └── HomePage
│   ├── routes
│   │   ├── datacontent.js
│   │   └── index.js
│   ├── service
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── utils.js
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js


## Phụ Thuộc

- **React**: Thư viện JavaScript cho giao diện người dùng
- **React Router**: Quản lý điều hướng trong ứng dụng
- **Axios**: Thư viện gửi yêu cầu HTTP đến API
- **React Icons**: Cung cấp biểu tượng cho ứng dụng
- **React Query**: Quản lý trạng thái và dữ liệu của ứng dụng
- **antd**: Thư viện UI cho React
- **tailwindcss**: Thư viện CSS cho React
