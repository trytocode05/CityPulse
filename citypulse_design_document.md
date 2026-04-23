# 🏙️ CityPulse — Tài Liệu Thiết Kế Tổng Hợp

> **CityPulse** — Nền tảng Civic Tech quản lý sự cố đô thị, cho phép người dân báo cáo các vấn đề (ổ gà, ngập lụt, rác thải, hư hỏng hạ tầng...) bằng hình ảnh → AI phân loại tự động → hiển thị trên bản đồ thời gian thực → cơ quan chức năng tiếp nhận & xử lý.

---

## 📌 Phần 1: TỔNG QUAN DỰ ÁN

### 1.1. Tuyên bố vấn đề (Problem Statement)

| Khía cạnh | Chi tiết |
|-----------|---------|
| **Vấn đề** | Đô thị VN đang quá tải: ngập lụt, ổ gà, rác thải, hư hỏng hạ tầng. Người dân không có kênh báo cáo hiệu quả, chính quyền thiếu dữ liệu thời gian thực |
| **Đối tượng** | Người dân đô thị (citizen), Moderator, Admin đô thị (city official) |
| **Giải pháp** | Nền tảng web cho phép crowdsourced reporting + AI classification + realtime map + analytics dashboard |
| **Giá trị** | Cải thiện chất lượng sống đô thị, tăng minh bạch, tối ưu nguồn lực xử lý sự cố |

### 1.2. Mục tiêu dự án

- ✅ Người dân dễ dàng báo cáo sự cố chỉ với 1 bức ảnh + vị trí
- ✅ AI tự động phân loại loại sự cố (pothole, flood, garbage, broken infrastructure...)
- ✅ Hiển thị sự cố trên bản đồ nhiệt thời gian thực (heatmap)
- ✅ Hệ thống upvote/confirm để xác minh sự cố từ cộng đồng
- ✅ Tracking trạng thái: `Reported → Confirmed → In Progress → Resolved`
- ✅ Dashboard phân tích cho chính quyền (thống kê, xu hướng, hiệu suất xử lý)
- ✅ RBAC (Role-Based Access Control) phân quyền rõ ràng

---

## 🛠️ Phần 2: TECH STACK & KIẾN TRÚC

### 2.1. Tech Stack chi tiết

| Layer | Công nghệ | Lý do chọn |
|-------|-----------|------------|
| **Frontend** | React 18 + TypeScript + Vite | SPA nhanh, typesafe, hot reload |
| **Styling** | TailwindCSS 3 + Radix UI | Theo AGENTS.md, component library sẵn |
| **Maps** | Leaflet + React-Leaflet | Open source, miễn phí, hỗ trợ tile server tùy chỉnh |
| **Tile Provider** | OpenStreetMap (miễn phí) hoặc MapBox (có free tier) | Bản đồ chất lượng, hỗ trợ VN |
| **Heatmap** | leaflet.heat | Plugin heatmap cho Leaflet |
| **Backend** | Express.js + TypeScript | Theo AGENTS.md, tích hợp với Vite dev server |
| **Database** | PostgreSQL + PostGIS | Spatial queries (tìm sự cố theo vị trí, bán kính) |
| **ORM** | Drizzle ORM | Typesafe, lightweight, hỗ trợ PostGIS |
| **Realtime** | Socket.io | Cập nhật sự cố mới trên bản đồ theo thời gian thực |
| **AI Classification** | TensorFlow.js (MobileNet transfer learning) | Chạy trên client hoặc server, phân loại ảnh sự cố |
| **File Storage** | Local disk (dev) / S3-compatible (prod) | Lưu ảnh sự cố |
| **Auth** | JWT + bcrypt | Xác thực & phân quyền |
| **Validation** | Zod | Schema validation cả client & server |
| **Charts** | Recharts hoặc Chart.js | Dashboard analytics |

### 2.2. Kiến trúc hệ thống (System Architecture)

```mermaid
graph TB
    subgraph Client["🖥️ Client - React SPA"]
        UI[UI Components]
        MAP[Leaflet Map]
        AI[TensorFlow.js\nImage Classifier]
        SOCKET_C[Socket.io Client]
    end

    subgraph Server["⚙️ Server - Express"]
        API[REST API Routes]
        AUTH[Auth Middleware\nJWT + RBAC]
        UPLOAD[Multer\nFile Upload]
        SOCKET_S[Socket.io Server]
        AI_S[TensorFlow.js\nServer Fallback]
    end

    subgraph Database["🗄️ Database"]
        PG[(PostgreSQL\n+ PostGIS)]
    end

    subgraph Storage["📁 File Storage"]
        S3[S3 / Local Disk]
    end

    UI --> API
    MAP --> API
    AI --> UI
    SOCKET_C <--> SOCKET_S
    API --> AUTH
    API --> UPLOAD
    UPLOAD --> S3
    API --> PG
    SOCKET_S --> PG
    AI_S --> API

    style Client fill:#1e293b,stroke:#3b82f6,color:#f8fafc
    style Server fill:#1e293b,stroke:#10b981,color:#f8fafc
    style Database fill:#1e293b,stroke:#f59e0b,color:#f8fafc
    style Storage fill:#1e293b,stroke:#8b5cf6,color:#f8fafc
```

### 2.3. Cấu trúc thư mục dự án

```
client/
├── pages/
│   ├── Index.tsx              # Landing page + bản đồ chính
│   ├── ReportIncident.tsx     # Form báo cáo sự cố
│   ├── IncidentDetail.tsx     # Chi tiết 1 sự cố
│   ├── Dashboard.tsx          # Analytics dashboard (admin/official)
│   ├── MyReports.tsx          # Sự cố cá nhân đã báo cáo
│   ├── Login.tsx              # Đăng nhập
│   ├── Register.tsx           # Đăng ký
│   ├── AdminPanel.tsx         # Quản lý user, moderate sự cố
│   └── NotFound.tsx           # 404
├── components/
│   ├── ui/                    # Radix UI components (có sẵn)
│   ├── map/
│   │   ├── IncidentMap.tsx    # Bản đồ chính với markers
│   │   ├── HeatmapLayer.tsx   # Layer bản đồ nhiệt
│   │   ├── IncidentMarker.tsx # Marker cho từng sự cố
│   │   └── LocationPicker.tsx # Chọn vị trí khi báo cáo
│   ├── incidents/
│   │   ├── IncidentCard.tsx   # Card hiển thị sự cố
│   │   ├── IncidentList.tsx   # Danh sách sự cố
│   │   ├── StatusBadge.tsx    # Badge trạng thái
│   │   └── UpvoteButton.tsx   # Nút upvote/confirm
│   ├── dashboard/
│   │   ├── StatsOverview.tsx  # Tổng quan thống kê
│   │   ├── CategoryChart.tsx  # Biểu đồ theo loại sự cố
│   │   ├── TrendChart.tsx     # Biểu đồ xu hướng
│   │   └── ResolutionRate.tsx # Tỷ lệ xử lý
│   ├── layout/
│   │   ├── Header.tsx         # Navbar
│   │   ├── Sidebar.tsx        # Sidebar (admin)
│   │   └── Footer.tsx         # Footer
│   └── ai/
│       └── ImageClassifier.tsx # Component phân loại ảnh
├── hooks/
│   ├── useAuth.ts             # Auth hook
│   ├── useSocket.ts           # Socket.io hook
│   ├── useGeolocation.ts      # Lấy vị trí GPS
│   └── useIncidents.ts        # CRUD sự cố
├── lib/
│   ├── api.ts                 # API client (fetch wrapper)
│   ├── socket.ts              # Socket.io setup
│   └── classifier.ts          # TensorFlow.js model loader
├── App.tsx
└── global.css

server/
├── index.ts                   # Express setup + Socket.io
├── routes/
│   ├── auth.ts                # POST /api/auth/register, login
│   ├── incidents.ts           # CRUD /api/incidents
│   ├── votes.ts               # POST /api/incidents/:id/vote
│   ├── comments.ts            # CRUD /api/incidents/:id/comments
│   ├── dashboard.ts           # GET /api/dashboard/stats
│   └── users.ts               # Admin user management
├── middleware/
│   ├── auth.ts                # JWT verification
│   ├── rbac.ts                # Role-based access control
│   └── upload.ts              # Multer config
├── db/
│   ├── schema.ts              # Drizzle schema + PostGIS
│   ├── connection.ts          # DB connection
│   └── seed.ts                # Seed data
└── utils/
    ├── jwt.ts                 # JWT helpers
    └── geocoding.ts           # Reverse geocoding

shared/
├── api.ts                     # Shared API interfaces
├── types.ts                   # Shared types
└── constants.ts               # Enums, categories
```

---

## 📊 Phần 3: ERD (Entity Relationship Diagram)

### 3.1. Sơ đồ ERD

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar email UK
        varchar username UK
        varchar password_hash
        enum role "citizen | moderator | admin | official"
        varchar full_name
        varchar avatar_url
        varchar phone
        boolean is_active
        int reputation_score
        timestamp created_at
        timestamp updated_at
    }

    INCIDENTS {
        uuid id PK
        uuid reporter_id FK
        varchar title
        text description
        enum category "pothole | flood | garbage | broken_infra | traffic | pollution | other"
        enum severity "low | medium | high | critical"
        enum status "reported | confirmed | in_progress | resolved | rejected"
        float latitude
        float longitude
        geography location "PostGIS POINT"
        varchar address
        varchar ward
        varchar district
        varchar city
        int upvote_count
        int comment_count
        uuid assigned_to FK
        text resolution_note
        timestamp resolved_at
        timestamp created_at
        timestamp updated_at
    }

    INCIDENT_IMAGES {
        uuid id PK
        uuid incident_id FK
        varchar image_url
        varchar thumbnail_url
        varchar ai_category "AI predicted category"
        float ai_confidence "0.0 - 1.0"
        int display_order
        timestamp created_at
    }

    VOTES {
        uuid id PK
        uuid user_id FK
        uuid incident_id FK
        enum vote_type "upvote | confirm | fake"
        timestamp created_at
    }

    COMMENTS {
        uuid id PK
        uuid user_id FK
        uuid incident_id FK
        text content
        uuid parent_id FK "Reply to another comment"
        boolean is_official "Official response from city"
        timestamp created_at
        timestamp updated_at
    }

    STATUS_HISTORY {
        uuid id PK
        uuid incident_id FK
        uuid changed_by FK
        enum old_status "reported | confirmed | in_progress | resolved | rejected"
        enum new_status "reported | confirmed | in_progress | resolved | rejected"
        text note
        timestamp created_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        uuid incident_id FK
        enum type "status_change | new_comment | upvote_milestone | assignment"
        varchar title
        text message
        boolean is_read
        timestamp created_at
    }

    CATEGORIES {
        int id PK
        varchar name UK
        varchar slug UK
        varchar icon
        varchar color
        text description
        boolean is_active
    }

    USERS ||--o{ INCIDENTS : "reports"
    USERS ||--o{ VOTES : "votes"
    USERS ||--o{ COMMENTS : "writes"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ STATUS_HISTORY : "changes"
    INCIDENTS ||--o{ INCIDENT_IMAGES : "has"
    INCIDENTS ||--o{ VOTES : "receives"
    INCIDENTS ||--o{ COMMENTS : "has"
    INCIDENTS ||--o{ STATUS_HISTORY : "tracks"
    INCIDENTS ||--o{ NOTIFICATIONS : "triggers"
    INCIDENTS }o--|| CATEGORIES : "belongs_to"
    COMMENTS ||--o{ COMMENTS : "replies_to"
```

### 3.2. Mô tả các bảng quan trọng

| Bảng | Mục đích | Ghi chú |
|------|----------|---------|
| `users` | Lưu thông tin người dùng, phân quyền | `role` quyết định quyền truy cập |
| `incidents` | Lưu sự cố với vị trí (PostGIS) | `location` là kiểu `geography(POINT, 4326)` cho spatial queries |
| `incident_images` | Ảnh đính kèm sự cố | Lưu cả kết quả AI classification |
| `votes` | Upvote/Confirm/Report fake | Unique constraint `(user_id, incident_id)` |
| `comments` | Bình luận & phản hồi chính thức | `is_official` đánh dấu phản hồi từ cơ quan |
| `status_history` | Lịch sử thay đổi trạng thái | Audit trail cho minh bạch |
| `notifications` | Thông báo cho user | Push qua Socket.io |

### 3.3. Spatial Queries quan trọng (PostGIS)

```sql
-- Tìm sự cố trong bán kính 5km từ vị trí user
SELECT * FROM incidents 
WHERE ST_DWithin(
    location, 
    ST_MakePoint(106.6297, 10.8231)::geography, 
    5000  -- meters
)
ORDER BY created_at DESC;

-- Tạo heatmap data (clustering)
SELECT 
    ST_X(location::geometry) as lng, 
    ST_Y(location::geometry) as lat, 
    COUNT(*) as intensity
FROM incidents 
WHERE status != 'resolved'
GROUP BY ST_SnapToGrid(location::geometry, 0.001);
```

---

## 🔄 Phần 4: PROCESSING LOGIC & DATA FLOW

### 4.1. Luồng xử lý chính: Báo cáo sự cố

```mermaid
sequenceDiagram
    actor Citizen as 👤 Citizen
    participant Client as 🖥️ React Client
    participant AI as 🤖 TF.js Classifier
    participant Server as ⚙️ Express Server
    participant DB as 🗄️ PostgreSQL
    participant Socket as 📡 Socket.io
    participant Admin as 👮 Admin/Official

    Citizen->>Client: 1. Chụp ảnh sự cố
    Client->>AI: 2. Gửi ảnh qua TF.js
    AI-->>Client: 3. Trả về category + confidence
    
    Citizen->>Client: 4. Xác nhận/sửa category,<br/>thêm mô tả, chọn vị trí
    Client->>Server: 5. POST /api/incidents<br/>(FormData: image + metadata)
    
    Server->>Server: 6. Validate (Zod) + Auth (JWT)
    Server->>Server: 7. Upload ảnh (Multer → S3)
    Server->>Server: 8. Reverse geocoding (lat/lng → address)
    Server->>DB: 9. INSERT incident + images
    DB-->>Server: 10. Return incident record
    
    Server->>Socket: 11. Emit "new_incident" event
    Socket-->>Client: 12. Broadcast tới tất cả clients
    Client->>Client: 13. Thêm marker mới lên bản đồ
    
    Socket-->>Admin: 14. Notification cho admin
    Admin->>Server: 15. Review & update status
    Server->>DB: 16. UPDATE status + INSERT status_history
    Server->>Socket: 17. Emit "incident_updated"
    Socket-->>Citizen: 18. Notification cho citizen
```

### 4.2. Luồng xử lý AI Image Classification

```mermaid
flowchart TD
    A[📸 User chụp/chọn ảnh] --> B{Kích thước ảnh}
    B -->|> 5MB| C[Compress & Resize\nmax 1024x1024]
    B -->|≤ 5MB| D[Resize to 224x224\nfor model input]
    C --> D
    
    D --> E[Load MobileNet model\ncached in browser]
    E --> F[Forward pass\npredict category]
    F --> G{Confidence ≥ 70%?}
    
    G -->|✅ Yes| H[Auto-fill category\nshow confidence badge]
    G -->|❌ No| I[Show top-3 predictions\nuser chọn thủ công]
    
    H --> J[User xác nhận\nhoặc override]
    I --> J
    
    J --> K[Submit report\nwith AI metadata]
    
    style A fill:#3b82f6,color:#fff
    style F fill:#10b981,color:#fff
    style K fill:#f59e0b,color:#fff
```

### 4.3. Luồng Upvote & Confirm

```mermaid
flowchart TD
    A[User thấy sự cố\ntrên bản đồ] --> B[Click marker\n→ Incident detail]
    B --> C{User đã vote?}
    C -->|Đã vote| D[Hiển thị trạng thái\nvote hiện tại]
    C -->|Chưa vote| E[Hiển thị nút:\n👍 Upvote  ✅ Confirm  🚩 Fake]
    
    E --> F[User chọn vote]
    F --> G[POST /api/incidents/:id/vote]
    G --> H[Server cập nhật\nupvote_count]
    
    H --> I{upvote_count ≥ 5?}
    I -->|Yes| J[Auto-upgrade status\nReported → Confirmed]
    I -->|No| K[Giữ nguyên status]
    
    J --> L[Emit socket event\n→ notify reporter]
    K --> L
```

### 4.4. Status Lifecycle (Vòng đời trạng thái)

```mermaid
stateDiagram-v2
    [*] --> Reported : Citizen tạo báo cáo

    Reported --> Confirmed : ≥5 upvotes HOẶC\nModerator xác nhận
    Reported --> Rejected : Moderator đánh dấu\nkhông hợp lệ / trùng lặp

    Confirmed --> InProgress : Official tiếp nhận\n& assign xử lý
    Confirmed --> Rejected : Moderator reject sau review

    InProgress --> Resolved : Official đánh dấu\nhoàn thành + note
    InProgress --> Confirmed : Rollback nếu\nchưa thực sự xử lý

    Resolved --> [*]
    Rejected --> [*]

    note right of Reported
        Mới tạo, chờ cộng đồng
        xác nhận hoặc mod review
    end note

    note right of Confirmed
        Đã xác minh, chờ
        cơ quan tiếp nhận
    end note

    note right of InProgress
        Đang xử lý, có
        người chịu trách nhiệm
    end note
```

---

## 👤 Phần 5: USE CASES (Các trường hợp sử dụng)

### 5.1. Use Case Diagram

```mermaid
graph TB
    subgraph Actors
        C[👤 Citizen]
        M[🛡️ Moderator]
        A[⚙️ Admin]
        O[🏛️ City Official]
    end

    subgraph UC_Auth["🔐 Authentication"]
        UC1[UC01: Đăng ký tài khoản]
        UC2[UC02: Đăng nhập]
        UC3[UC03: Quên mật khẩu]
        UC4[UC04: Quản lý profile]
    end

    subgraph UC_Incident["📋 Quản lý sự cố"]
        UC5[UC05: Báo cáo sự cố mới]
        UC6[UC06: Xem chi tiết sự cố]
        UC7[UC07: Upvote/Confirm sự cố]
        UC8[UC08: Bình luận sự cố]
        UC9[UC09: Xem sự cố cá nhân]
        UC10[UC10: Cập nhật trạng thái sự cố]
    end

    subgraph UC_Map["🗺️ Bản đồ"]
        UC11[UC11: Xem bản đồ sự cố]
        UC12[UC12: Lọc sự cố theo loại/trạng thái]
        UC13[UC13: Xem heatmap]
        UC14[UC14: Tìm sự cố gần tôi]
    end

    subgraph UC_Admin["📊 Quản trị"]
        UC15[UC15: Xem dashboard thống kê]
        UC16[UC16: Moderate sự cố]
        UC17[UC17: Quản lý người dùng]
        UC18[UC18: Assign sự cố cho official]
        UC19[UC19: Export báo cáo]
    end

    C --> UC1 & UC2 & UC3 & UC4
    C --> UC5 & UC6 & UC7 & UC8 & UC9
    C --> UC11 & UC12 & UC13 & UC14

    M --> UC6 & UC10 & UC16
    A --> UC15 & UC17 & UC18 & UC19
    O --> UC6 & UC10 & UC15 & UC8

    style C fill:#3b82f6,color:#fff
    style M fill:#f59e0b,color:#fff
    style A fill:#ef4444,color:#fff
    style O fill:#10b981,color:#fff
```

### 5.2. Chi tiết Use Cases quan trọng

---

#### UC05: Báo cáo sự cố mới ⭐ (Core Use Case)

| Mục | Chi tiết |
|-----|---------|
| **Actor** | Citizen (đã đăng nhập) |
| **Mô tả** | Citizen chụp ảnh sự cố, AI phân loại, citizen bổ sung thông tin rồi submit |
| **Precondition** | User đã đăng nhập, có quyền citizen trở lên |
| **Postcondition** | Sự cố được tạo với status `reported`, hiển thị trên bản đồ |

**Main Flow:**
1. Citizen nhấn nút "Báo cáo sự cố" (FAB button trên map)
2. Hệ thống mở form báo cáo
3. Citizen chụp ảnh hoặc chọn ảnh từ gallery (tối đa 5 ảnh)
4. **AI tự động phân loại** ảnh → hiển thị category + confidence
5. Citizen xác nhận hoặc sửa category
6. Hệ thống tự động lấy vị trí GPS hiện tại
7. Citizen có thể điều chỉnh vị trí trên bản đồ (chọn pin)
8. Citizen nhập tiêu đề và mô tả (optional)
9. Citizen chọn mức độ nghiêm trọng (low/medium/high/critical)
10. Citizen nhấn "Gửi báo cáo"
11. Hệ thống validate dữ liệu, upload ảnh, reverse geocoding
12. Hệ thống tạo incident record trong DB
13. Socket.io broadcast sự cố mới tới tất cả clients
14. Hiển thị marker mới trên bản đồ

**Alternative Flow:**
- **4a.** AI confidence < 70%: Hiển thị top-3 gợi ý, user chọn 1
- **6a.** GPS không khả dụng: User phải chọn vị trí thủ công trên bản đồ
- **11a.** Validation fail: Hiển thị lỗi, yêu cầu sửa

**Exception:**
- Mất kết nối mạng → Lưu draft trên localStorage, sync khi có mạng

---

#### UC07: Upvote/Confirm sự cố

| Mục | Chi tiết |
|-----|---------|
| **Actor** | Citizen (đã đăng nhập) |
| **Mô tả** | Citizen xác nhận sự cố có thật bằng upvote |
| **Business Rule** | Mỗi user chỉ vote 1 lần/incident. Khi ≥5 upvotes → auto-confirm |

**Main Flow:**
1. Citizen click vào marker sự cố trên bản đồ
2. Hệ thống hiển thị popup/drawer chi tiết sự cố
3. Citizen nhấn "👍 Tôi cũng thấy" (Upvote) hoặc "✅ Xác nhận" (Confirm)
4. Server kiểm tra user chưa vote → tạo vote record
5. Cập nhật `upvote_count` trên incident
6. Nếu `upvote_count >= 5` → tự động chuyển status sang `confirmed`
7. Notify reporter về milestone

---

#### UC10: Cập nhật trạng thái sự cố

| Mục | Chi tiết |
|-----|---------|
| **Actor** | Moderator / City Official |
| **Mô tả** | Cập nhật trạng thái xử lý sự cố |

**Main Flow:**
1. Moderator/Official xem danh sách sự cố (filtered by status)
2. Chọn sự cố cần cập nhật
3. Chọn status mới (theo lifecycle hợp lệ)
4. Nhập ghi chú giải thích (bắt buộc)
5. Submit → insert status_history + update incident
6. Emit socket event → notify reporter & followers
7. Nếu `resolved` → yêu cầu chụp ảnh sau xử lý (optional)

---

#### UC11: Xem bản đồ sự cố (Landing Page)

| Mục | Chi tiết |
|-----|---------|
| **Actor** | Tất cả (kể cả guest) |
| **Mô tả** | Xem bản đồ với các marker sự cố, filter, heatmap |

**Main Flow:**
1. User truy cập trang chủ
2. Bản đồ Leaflet load centered tại vị trí GPS user (hoặc HCM mặc định)
3. Hiển thị markers sự cố trong viewport hiện tại
4. Marker clustering khi zoom ra (nhiều điểm gần nhau → gộp thành 1 cluster)
5. Click marker → popup chi tiết ngắn (ảnh, category, status, votes)
6. Filter sidebar: lọc theo category, status, severity, thời gian
7. Toggle heatmap layer: hiển thị vùng "nóng" nhiều sự cố
8. Click "Xem chi tiết" → navigate tới trang chi tiết sự cố

---

#### UC15: Xem dashboard thống kê

| Mục | Chi tiết |
|-----|---------|
| **Actor** | Admin / City Official |
| **Mô tả** | Xem tổng quan thống kê sự cố, hiệu suất xử lý |

**Main Flow:**
1. Admin/Official truy cập /dashboard
2. Hiển thị overview cards:
   - Tổng sự cố (hôm nay / tuần / tháng)
   - Tỷ lệ đã xử lý (%)
   - Thời gian xử lý trung bình
   - Sự cố đang chờ xử lý
3. Biểu đồ phân bổ theo category (Pie/Donut chart)
4. Biểu đồ xu hướng theo thời gian (Line chart)
5. Top 5 khu vực nhiều sự cố nhất (Bar chart)
6. Bản đồ nhiệt sự cố
7. Filter theo khoảng thời gian, khu vực, category

---

## 📱 Phần 6: CÁC MÀN HÌNH (SCREENS)

### 6.1. Tổng quan Screen Flow

```mermaid
graph LR
    subgraph Public["🌐 Public"]
        HOME[🏠 Home\nBản đồ chính]
        LOGIN[🔐 Login]
        REGISTER[📝 Register]
        DETAIL[📋 Incident\nDetail]
    end

    subgraph Citizen["👤 Citizen"]
        REPORT[📸 Report\nIncident]
        MY[📂 My\nReports]
        PROFILE[👤 Profile]
        NOTIF[🔔 Notifications]
    end

    subgraph Admin["⚙️ Admin / Official"]
        DASH[📊 Dashboard]
        MANAGE[🛡️ Manage\nIncidents]
        USERS[👥 Manage\nUsers]
    end

    HOME --> LOGIN
    HOME --> DETAIL
    LOGIN --> HOME
    REGISTER --> LOGIN
    HOME --> REPORT
    HOME --> MY
    HOME --> DASH
    DETAIL --> REPORT
    MY --> DETAIL
    MANAGE --> DETAIL

    style HOME fill:#3b82f6,color:#fff
    style REPORT fill:#10b981,color:#fff
    style DASH fill:#f59e0b,color:#fff
```

### 6.2. Mô tả chi tiết từng Screen

---

#### 🏠 Screen 1: Home Page (Bản đồ chính) — `/`

> **Đây là màn hình quan trọng nhất, tạo ấn tượng đầu tiên**

| Thành phần | Mô tả | Vị trí |
|-----------|-------|--------|
| **Header/Navbar** | Logo CityPulse + Search bar + Notifications bell + Avatar menu | Top |
| **Full-screen Map** | Leaflet map chiếm ~80% viewport, markers sự cố | Center |
| **Filter Panel** | Sidebar/Drawer: lọc theo category, status, severity, date range | Left sidebar (collapsible) |
| **Heatmap Toggle** | Button bật/tắt heatmap layer | Map controls (top-right) |
| **My Location** | Button center bản đồ về vị trí user | Map controls |
| **FAB Button** | Floating Action Button "➕ Báo cáo sự cố" (pulse animation) | Bottom-right |
| **Incident Popup** | Khi click marker: ảnh thumbnail, title, status badge, vote count | Map popup |
| **Stats Bar** | Mini bar hiển thị: "245 sự cố | 67% đã xử lý | 12 mới hôm nay" | Bottom |

**Design Notes:**
- Dark mode mặc định cho bản đồ (Stamen Dark / CartoDB Dark Matter tiles)
- Markers có màu theo category (🔴 critical, 🟡 medium, 🟢 resolved)
- Cluster markers với số đếm khi zoom out
- Smooth zoom animations
- Glassmorphism cho filter panel

---

#### 📸 Screen 2: Báo cáo sự cố — `/report`

| Thành phần | Mô tả |
|-----------|-------|
| **Image Upload** | Drag & drop hoặc camera capture, preview grid (max 5 ảnh) |
| **AI Classification Badge** | Hiển thị sau khi upload: "🤖 AI: Ổ gà (87%)" với option sửa |
| **Category Selector** | Grid icons cho 7 categories, pre-selected bởi AI |
| **Severity Picker** | 4 mức với color coding: Low (xanh) → Critical (đỏ) |
| **Title Input** | Auto-suggested dựa trên AI category |
| **Description Textarea** | Optional, hint: "Mô tả thêm chi tiết..." |
| **Location Picker Map** | Mini map với draggable pin, auto-detect GPS, reverse geocode hiển thị address |
| **Submit Button** | "📤 Gửi báo cáo" với loading state |

**UX Flow:** Upload ảnh → AI nhận diện → Xác nhận thông tin → Chọn vị trí → Submit

---

#### 📋 Screen 3: Chi tiết sự cố — `/incidents/:id`

| Thành phần | Mô tả |
|-----------|-------|
| **Image Carousel** | Slide show ảnh sự cố (có thể zoom) |
| **Status Timeline** | Vertical timeline hiển thị lịch sử trạng thái (reported → confirmed → ...) |
| **Info Section** | Category badge, severity badge, ngày tạo, reporter info |
| **Mini Map** | Bản đồ nhỏ pinpoint vị trí, address text |
| **Vote Section** | 👍 Upvote (count) / ✅ Confirm / 🚩 Report Fake |
| **Comments** | Threaded comments, official responses highlighted |
| **Share Button** | Copy link, share social media |
| **Related Incidents** | Sự cố gần đó cùng loại |

---

#### 📊 Screen 4: Dashboard — `/dashboard`

| Thành phần | Mô tả |
|-----------|-------|
| **Overview Cards** | 4 KPI cards: Total, Pending, In Progress, Resolution Rate |
| **Category Distribution** | Donut chart phân bổ theo loại sự cố |
| **Trend Line Chart** | Số sự cố mới theo ngày/tuần/tháng |
| **Top Areas Bar Chart** | Top 5-10 quận/phường nhiều sự cố nhất |
| **Resolution Time** | Average resolution time trend |
| **Recent Activity Feed** | List sự cố mới nhất + status changes |
| **Heatmap** | Embedded map heatmap |
| **Date Range Picker** | Filter thời gian cho tất cả biểu đồ |

---

#### 📂 Screen 5: Sự cố của tôi — `/my-reports`

| Thành phần | Mô tả |
|-----------|-------|
| **Tab Bar** | All / Active / Resolved / Rejected |
| **Incident Cards** | Card list: thumbnail, title, status badge, votes, date |
| **Quick Actions** | Mỗi card: View, Edit (if reported), Delete (if reported) |
| **Pagination** | Infinite scroll hoặc pagination |

---

#### 🔐 Screen 6: Login / Register — `/login`, `/register`

| Thành phần | Mô tả |
|-----------|-------|
| **Split Layout** | Left: Hero image/illustration CityPulse | Right: Form |
| **Login Form** | Email + Password + Remember me + Forgot password link |
| **Register Form** | Full name + Email + Phone + Password + Confirm password |
| **Social Login** | Google OAuth button (future) |

---

#### 🛡️ Screen 7: Admin - Manage Incidents — `/admin/incidents`

| Thành phần | Mô tả |
|-----------|-------|
| **Data Table** | Sortable, filterable table: ID, Title, Category, Status, Reporter, Votes, Date |
| **Bulk Actions** | Select multiple → Approve, Reject, Assign |
| **Quick Status Update** | Dropdown inline status change |
| **Assign Modal** | Chọn official để assign xử lý |
| **Search & Filter** | Full text search + advanced filters |

---

## 🔌 Phần 7: API ENDPOINTS

### 7.1. Authentication

| Method | Endpoint | Body | Response | Auth |
|--------|----------|------|----------|------|
| `POST` | `/api/auth/register` | `{email, password, fullName, phone}` | `{user, token}` | ❌ |
| `POST` | `/api/auth/login` | `{email, password}` | `{user, token}` | ❌ |
| `GET` | `/api/auth/me` | - | `{user}` | ✅ |
| `PUT` | `/api/auth/profile` | `{fullName, phone, avatar}` | `{user}` | ✅ |

### 7.2. Incidents

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/incidents` | List incidents (filter, paginate, bbox) | ❌ | All |
| `GET` | `/api/incidents/:id` | Get incident detail | ❌ | All |
| `POST` | `/api/incidents` | Create new incident (FormData) | ✅ | Citizen+ |
| `PUT` | `/api/incidents/:id` | Update incident (reporter only) | ✅ | Owner |
| `PATCH` | `/api/incidents/:id/status` | Update status | ✅ | Mod/Admin/Official |
| `DELETE` | `/api/incidents/:id` | Delete incident | ✅ | Owner/Admin |
| `GET` | `/api/incidents/nearby` | Get incidents near lat/lng | ❌ | All |
| `GET` | `/api/incidents/heatmap` | Get heatmap data points | ❌ | All |

### 7.3. Votes & Comments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/incidents/:id/vote` | Vote (upvote/confirm/fake) | ✅ |
| `DELETE` | `/api/incidents/:id/vote` | Remove vote | ✅ |
| `GET` | `/api/incidents/:id/comments` | Get comments (threaded) | ❌ |
| `POST` | `/api/incidents/:id/comments` | Add comment | ✅ |
| `DELETE` | `/api/comments/:id` | Delete comment | ✅ |

### 7.4. Dashboard & Admin

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `GET` | `/api/dashboard/stats` | Overview statistics | ✅ | Admin/Official |
| `GET` | `/api/dashboard/trends` | Trend data (by date range) | ✅ | Admin/Official |
| `GET` | `/api/dashboard/areas` | Top areas breakdown | ✅ | Admin/Official |
| `GET` | `/api/admin/users` | List users | ✅ | Admin |
| `PATCH` | `/api/admin/users/:id/role` | Change user role | ✅ | Admin |
| `PATCH` | `/api/admin/incidents/:id/assign` | Assign incident to official | ✅ | Admin |

### 7.5. Socket.io Events

| Event | Direction | Payload | Mô tả |
|-------|-----------|---------|--------|
| `incident:new` | Server → Client | `{incident}` | Sự cố mới được tạo |
| `incident:updated` | Server → Client | `{incident}` | Sự cố được cập nhật status |
| `incident:voted` | Server → Client | `{incidentId, upvoteCount}` | Có vote mới |
| `incident:commented` | Server → Client | `{incidentId, comment}` | Có comment mới |
| `notification:new` | Server → Client (targeted) | `{notification}` | Thông báo cá nhân |
| `join:area` | Client → Server | `{bbox}` | Subscribe sự cố trong viewport |
| `leave:area` | Client → Server | `{bbox}` | Unsubscribe |

---

## 🤖 Phần 8: AI IMAGE CLASSIFICATION STRATEGY

### 8.1. Model & Categories

| Category | Label VN | Ví dụ |
|----------|----------|-------|
| `pothole` | Ổ gà / Hư đường | Đường bị lún, nứt, ổ gà |
| `flood` | Ngập nước | Đường ngập, nước dâng |
| `garbage` | Rác thải | Rác ven đường, bãi rác tự phát |
| `broken_infra` | Hư hỏng hạ tầng | Cột điện gãy, biển báo hỏng, lan can vỡ |
| `traffic` | Giao thông | Ùn tắc, vi phạm giao thông |
| `pollution` | Ô nhiễm | Khói, nước thải, ô nhiễm |
| `other` | Khác | Không thuộc loại trên |

### 8.2. Cách tiếp cận (Từ đơn giản → nâng cao)

```mermaid
graph LR
    A["Phase 1\n🎯 Pre-trained\nMobileNet"] --> B["Phase 2\n🔧 Transfer Learning\nCustom dataset"]  --> C["Phase 3\n🚀 Fine-tuned model\nVietnamese urban data"]
    
    style A fill:#10b981,color:#fff
    style B fill:#f59e0b,color:#fff
    style C fill:#ef4444,color:#fff
```

**Phase 1 (MVP):** Sử dụng MobileNet pre-trained + mapping output labels → CityPulse categories. Confidence sẽ thấp nhưng đủ để demo.

**Phase 2 (Cải thiện):** Thu thập dataset ảnh sự cố đô thị VN (~500-1000 ảnh/category), transfer learning trên MobileNet. Train trên Google Colab (miễn phí GPU).

**Phase 3 (Production):** Fine-tune với dataset lớn hơn, A/B testing, feedback loop (user corrections → retrain).

### 8.3. Implementation

```typescript
// client/lib/classifier.ts
import * as tf from '@tensorflow/tfjs';

const CATEGORIES = ['pothole', 'flood', 'garbage', 'broken_infra', 'traffic', 'pollution', 'other'];

let model: tf.LayersModel | null = null;

export async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('/models/citypulse-classifier/model.json');
  }
  return model;
}

export async function classifyImage(imageElement: HTMLImageElement) {
  const model = await loadModel();
  
  // Preprocess: resize to 224x224, normalize
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeBilinear([224, 224])
    .div(255.0)
    .expandDims(0);
  
  const predictions = model.predict(tensor) as tf.Tensor;
  const scores = await predictions.data();
  
  // Get top-3 predictions
  const results = CATEGORIES
    .map((cat, i) => ({ category: cat, confidence: scores[i] }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
  
  tensor.dispose();
  predictions.dispose();
  
  return results;
}
```

---

## 🚀 Phần 9: PHÂN CHIA PHASES PHÁT TRIỂN

### Phase 1: MVP Core (2-3 tuần)

```
✅ Auth: Register, Login, JWT
✅ Incidents: CRUD cơ bản
✅ Map: Leaflet + markers + popups
✅ Image Upload: Multer + local storage
✅ Database: PostgreSQL + basic schema (chưa PostGIS)
✅ UI: Home map page, Report form, Incident detail
✅ Basic responsive design
```

### Phase 2: Social & Realtime (1-2 tuần)

```
✅ Upvote/Confirm system
✅ Comments (threaded)
✅ Socket.io: realtime markers
✅ Notifications
✅ My Reports page
✅ Status lifecycle + history
✅ Filter & search
```

### Phase 3: AI & Analytics (1-2 tuần)

```
✅ TensorFlow.js integration (pre-trained model)
✅ AI classification on image upload
✅ Dashboard: stats, charts
✅ Heatmap layer
✅ PostGIS: spatial queries, nearby incidents
✅ Marker clustering
```

### Phase 4: Admin & Polish (1-2 tuần)

```
✅ RBAC middleware
✅ Admin panel: manage users, moderate incidents, assign
✅ Status update by officials
✅ Bulk operations
✅ Export reports
✅ Dark mode polish
✅ Performance optimization
✅ Testing (Vitest)
```

---

## 🛡️ Phần 10: RBAC (Phân quyền)

### Ma trận phân quyền

| Hành động | Guest | Citizen | Moderator | Official | Admin |
|-----------|:-----:|:-------:|:---------:|:--------:|:-----:|
| Xem bản đồ & sự cố | ✅ | ✅ | ✅ | ✅ | ✅ |
| Đăng ký / Đăng nhập | ✅ | - | - | - | - |
| Báo cáo sự cố | ❌ | ✅ | ✅ | ✅ | ✅ |
| Upvote / Confirm | ❌ | ✅ | ✅ | ✅ | ✅ |
| Comment | ❌ | ✅ | ✅ | ✅ | ✅ |
| Xem My Reports | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit/Delete own incident | ❌ | ✅ | ✅ | ✅ | ✅ |
| Moderate sự cố (confirm/reject) | ❌ | ❌ | ✅ | ✅ | ✅ |
| Cập nhật status (in_progress, resolved) | ❌ | ❌ | ❌ | ✅ | ✅ |
| Assign sự cố | ❌ | ❌ | ❌ | ❌ | ✅ |
| Quản lý users | ❌ | ❌ | ❌ | ❌ | ✅ |
| Dashboard analytics | ❌ | ❌ | ❌ | ✅ | ✅ |
| Export reports | ❌ | ❌ | ❌ | ✅ | ✅ |

---

## 📐 Phần 11: HƯỚNG DẪN PHÁT TRIỂN

### 11.1. Setup ban đầu

```bash
# Project đã có sẵn trong workspace ss2-g7-design-c54
# Cấu trúc Fusion Starter (React + Express + Vite + TailwindCSS 3)

# 1. Cài thêm dependencies cần thiết
pnpm add leaflet react-leaflet @types/leaflet           # Maps
pnpm add socket.io socket.io-client                     # Realtime  
pnpm add multer @types/multer                           # File upload
pnpm add bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken  # Auth
pnpm add drizzle-orm postgres                           # ORM + DB driver
pnpm add zod                                            # Validation (có sẵn)
pnpm add recharts                                       # Charts
pnpm add @tensorflow/tfjs                               # AI (Phase 3)
pnpm add uuid @types/uuid                               # UUID generation

# Dev dependencies
pnpm add -D drizzle-kit                                 # DB migrations
```

### 11.2. Quy tắc phát triển

> [!IMPORTANT]
> **LUÔN THEO AGENTS.md:**
> - Frontend: React 18 + TypeScript + TailwindCSS 3 + Radix UI
> - Backend: Express tích hợp Vite dev server
> - Routing: React Router 6 (SPA mode)
> - Styling: TailwindCSS 3, KHÔNG dùng styled-components hoặc CSS modules
> - UI Components: Sử dụng `client/components/ui/` có sẵn
> - API: Prefix `/api/`, register trong `server/index.ts`
> - Shared types: Đặt trong `shared/`
> - Testing: Vitest

### 11.3. Database Setup

```bash
# Option A: Local PostgreSQL
# Cài PostgreSQL + PostGIS extension

# Option B: Docker (khuyến nghị)
# docker-compose.yml sẽ được tạo
docker compose up -d postgres

# Option C: Cloud (Supabase / Neon - free tier)
# Tạo project trên supabase.com → lấy connection string
```

### 11.4. Environment Variables

```env
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/citypulse
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
PORT=8080
```

### 11.5. Thứ tự triển khai code (Recommended)

```
1.  shared/types.ts          → Define tất cả interfaces, enums
2.  server/db/schema.ts      → Drizzle schema
3.  server/db/connection.ts  → DB connection
4.  server/utils/jwt.ts      → JWT helpers
5.  server/middleware/auth.ts → Auth middleware
6.  server/routes/auth.ts    → Register/Login
7.  client/pages/Login.tsx    → Login UI
8.  client/pages/Register.tsx → Register UI
9.  client/hooks/useAuth.ts   → Auth context/hook
10. server/routes/incidents.ts → CRUD incidents
11. client/components/map/    → Map components
12. client/pages/Index.tsx    → Home page with map
13. client/pages/ReportIncident.tsx → Report form
14. ... tiếp tục theo phases
```

> [!TIP]
> ### Mẹo quan trọng:
> 1. **Commit thường xuyên** — mỗi feature nhỏ = 1 commit
> 2. **Bắt đầu từ backend** — API hoạt động trước, UI sau
> 3. **Mock data** — Tạo seed data để UI có dữ liệu ngay
> 4. **Mobile-first** — Design responsive từ đầu
> 5. **Dark mode first** — Bản đồ nhìn đẹp hơn trên dark mode
> 6. **Test API bằng Postman/Thunder Client** trước khi integrate UI

---

## 📊 Phần 12: METRICS & KPIs (cho Dashboard)

| Metric | Query | Hiển thị |
|--------|-------|---------|
| Total Incidents | `COUNT(*)` | Number card |
| Today's New | `COUNT(*) WHERE created_at >= today` | Number card |
| Resolution Rate | `COUNT(resolved) / COUNT(*)` | Percentage card |
| Avg Resolution Time | `AVG(resolved_at - created_at)` | Duration card |
| By Category | `GROUP BY category` | Donut chart |
| By Status | `GROUP BY status` | Stacked bar |
| Trend (daily) | `GROUP BY DATE(created_at)` | Line chart |
| Top Areas | `GROUP BY district ORDER BY count DESC LIMIT 10` | Horizontal bar |
| Heatmap | `SELECT lat, lng, count` | Map layer |

---

## 🎨 Phần 13: DESIGN SYSTEM

### Color Palette (Dark Mode First)

| Token | Value | Sử dụng |
|-------|-------|---------|
| `--bg-primary` | `#0f172a` (slate-900) | Background chính |
| `--bg-card` | `#1e293b` (slate-800) | Card, sidebar |
| `--bg-elevated` | `#334155` (slate-700) | Hover, elevated |
| `--text-primary` | `#f8fafc` (slate-50) | Text chính |
| `--text-secondary` | `#94a3b8` (slate-400) | Text phụ |
| `--accent` | `#3b82f6` (blue-500) | Primary brand |
| `--success` | `#10b981` (emerald-500) | Resolved, confirm |
| `--warning` | `#f59e0b` (amber-500) | In progress |
| `--danger` | `#ef4444` (red-500) | Critical, reject |
| `--info` | `#6366f1` (indigo-500) | Info, links |

### Category Colors & Icons

| Category | Color | Icon (Lucide) |
|----------|-------|---------------|
| Pothole | `#ef4444` | `AlertTriangle` |
| Flood | `#3b82f6` | `Droplets` |
| Garbage | `#84cc16` | `Trash2` |
| Broken Infra | `#f97316` | `Construction` |
| Traffic | `#eab308` | `Car` |
| Pollution | `#8b5cf6` | `CloudSmog / Wind` |
| Other | `#6b7280` | `HelpCircle` |

---

> [!CAUTION]
> ## Checklist trước khi code:
> 1. ☐ Đã cài PostgreSQL (local hoặc Docker hoặc Supabase)
> 2. ☐ Đã hiểu cấu trúc Fusion Starter (AGENTS.md)
> 3. ☐ Đã setup `.env` với DATABASE_URL, JWT_SECRET
> 4. ☐ Đã cài dependencies (leaflet, socket.io, multer, drizzle...)
> 5. ☐ Đã chọn Phase 1 features để bắt đầu
> 6. ☐ Sẵn sàng commit code! 🚀
