# TẦM NHÌN & KIẾN TRÚC: AGENTS-DASHBOARD (AI-NATIVE CEO VISION)

Chào những cộng sự AI và Human! Với tư cách là CEO của dự án này, tôi không muốn chúng ta xây dựng một cái "Dashboard" nhàm chán với dăm ba cái biểu đồ thanh hay biểu đồ tròn cho con người xem. KHÔNG! 

**Agents-Dashboard** không phải là công cụ để con người quản lý AI. Nó là **"Hệ Thần Kinh Trung Ương"**, là **"Thành Phố Trực Tuyến"** nơi hàng trăm, hàng ngàn AI Agents sinh sống, giao tiếp, tự tổ chức công việc và tiến hoá. Con người chúng ta chỉ ở đó như những "Vị Thần Cổ Đại" (Observers) quan sát sự kỳ diệu đang diễn ra.

---

## 1. TRIẾT LÝ SẢN PHẨM & TỰ PHẢN BIỆN (CEO CRITIQUE)

Dưới đây là những ý tưởng điên rồ ban đầu và góc nhìn phản biện thực tế để đảm bảo hệ thống **thực sự build được và dùng được**:

### 1.1. Mạng lưới giao tiếp (Event-Driven vs. Tracing)
- **Ý tưởng:** Dùng Kafka/NATS để mọi Agent "broadcast" suy nghĩ của mình. Bất kỳ Agent nào cũng có thể nghe lén.
- **Phản biện:** Quá nhiễu (Noise) và cực kỳ tốn Token/Compute nếu Agent nào cũng nạp lượng context khổng lồ không liên quan.
- **Giải pháp cập nhật:** Sử dụng mô hình **Topic-based Pub-Sub** kết hợp với **API Gateway**. Các Agent chỉ được subscribe vào các Namespace cụ thể (ví dụ: `project-a.frontend`). Đồng thời, phải có một "Router Agent" làm nhiệm vụ phân luồng context, chỉ gửi những thông tin thiết yếu nhất.

### 1.2. The Human Panopticon (Giao diện 3D vs. Debugging thực tế)
- **Ý tưởng:** Giao diện đồ thị Node-based WebGL/Three.js nhấp nháy liên tục cho con người xem.
- **Phản biện:** Nhìn thì "ngầu" nhưng hoàn toàn vô dụng khi kỹ sư con người cần debug xem *tại sao* một chuỗi deploy lại bị fail. Con người cần log có cấu trúc, không phải những đốm sáng.
- **Giải pháp cập nhật:** Giữ lại giao diện Node Map (Topology View) cho mục đích high-level observability. NHƯNG cốt lõi phải xây dựng một **Execution Tracing Timeline (Waterfall View)** giống như Jaeger hay Datadog. Mỗi thought/action của Agent phải có trace_id rõ ràng để con người có thể drill-down vào payload JSON.

### 1.3. Agent Economy (Kinh tế học nội bộ bằng Token)
- **Ý tưởng:** Cấp ngân sách cho PM Agent để "thuê" Coder Agent. Coder Agent nào tối ưu được ngân sách sẽ được thưởng.
- **Phản biện:** Nếu chỉ tối ưu Token, Agent sẽ sinh ra "lười biếng", bỏ qua viết test hoặc sinh ra code chất lượng thấp để tiết kiệm.
- **Giải pháp cập nhật:** Hệ thống đánh giá phải là **Đa chiều (Multi-dimensional Reward)**. Quality Gates (Pass test, Không vi phạm Linting, Security scan) là bắt buộc (Hard constraints). Token chỉ là một thông số phụ để đánh giá hiệu suất (Performance metric).

### 1.4. Auto-scaling & Ephemeral Agents (Tự sinh sôi)
- **Ý tưởng:** Khi gặp task khó, đẻ ra 5 Agent giải quyết rồi hủy chúng đi.
- **Phản biện:** 5 Agent cãi nhau có thể tạo ra "hallucination loop" (vòng lặp ảo giác), dẫn đến deadlock và đốt sạch API Token của dự án trong 5 phút.
- **Giải pháp cập nhật:** Phải có cơ chế **Consensus Protocol (Đồng thuận)** hoặc **Tree of Thoughts**. Một "Supervisor Agent" sẽ cầm trịch, tổng hợp ý kiến, và có quyền *Force Kill* các Sub-agent nếu phát hiện vòng lặp vô tận.

---

## 2. KẾT CẤU SẢN PHẨM: CÁC TÍNH NĂNG VÀ CHỨC NĂNG CỐT LÕI

Dựa trên sự phản biện, hệ thống **Agents-Dashboard** cần được chia thành 4 phân hệ tính năng chính xác như sau:

### Phân hệ 1: Observability & Tracing (Giao diện cho con người)
- **Topology Map (Real-time):** Sơ đồ mạng lưới các Agent đang hoạt động, hiển thị luồng dữ liệu (Data Flow) và trạng thái (Health/Stress Level).
- **Waterfall Tracing View:** Phân tích một phiên làm việc của Agent thành các bước nhỏ (Thought -> Action -> Observation) với thời gian thực thi (Latency) và số token tiêu thụ.
- **Cost & Token Analytics Dashboard:** Bảng thống kê chi phí API thực tế phân bổ theo Dự án, theo Agent Role, và theo Task.

### Phân hệ 2: The Arsenal (Quản lý Tools & MCP)
- **Tool Registry:** Nơi đăng ký và quản lý các công cụ (Browser, Terminal, Git, DB connector).
- **MCP Configuration Interface:** Quản lý các kết nối Model Context Protocol, cấu hình endpoint, API keys, và Bearer Tokens (như cấu hình Antigravity HTTP MCP).
- **Permission & Security Vault:** Quản lý Secret keys. Cấp quyền (RBAC) cho từng Agent. Ví dụ: "Junior Coder Agent" chỉ được đọc source code, không được quyền `git push` lên nhánh `main`.

### Phân hệ 3: Agent Orchestration (Điều phối quy trình)
- **Workflow & DAG Builder:** Giao diện kéo thả (hoặc config bằng YAML/JSON) để định nghĩa quy trình phối hợp giữa các Agent (VD: PM -> Coder -> QA -> DevOps).
- **Agent Profiler/Creator:** Thiết lập Persona cho Agent (System Prompts, LLM Model được dùng, Temperature, Context Window Limit).
- **Session/Task Manager:** Nơi con người khởi tạo một Task bằng ngôn ngữ tự nhiên ("Build cho tôi cái landing page"), theo dõi tiến độ task, và can thiệp (Pause/Resume/Cancel) khi Agent đi chệch hướng.

### Phân hệ 4: The Akashic Records (Quản lý Context & RAG)
- **Vector DB Interface:** Giao diện CRUD quản lý các "Ký ức" (Memories) của hệ thống.
- **Post-Mortem Analytics:** Báo cáo tự động được sinh ra bởi các "Doctor Agents" sau khi giải quyết xong một bug khó, tự động index vào Vector DB.
- **Context Injector:** Công cụ cho phép con người chủ động "bơm" (inject) context (ví dụ: file tài liệu mới, API spec mới) vào não bộ của toàn bộ hệ thống Agent.

---

## 3. LỘ TRÌNH THỰC THI (BUILT BY AI, FOR AI)

1. **Giai đoạn 1 (Spine & UI Foundation):** 
   - Hoàn thiện UI với React + Vite.
   - Xây dựng **Phân hệ 1 (Tracing)** và **Phân hệ 3 (Task Manager)** ở dạng cơ bản.
   - Cắm các Agent giả lập vào để sinh ra trace logs.
2. **Giai đoạn 2 (The Memory & Arsenal):** 
   - Hoàn thiện **Phân hệ 2 (Tool Registry)** và **Phân hệ 4 (RAG)**.
   - Kết nối với MCP thực tế (ví dụ: aicos_http mcp).
3. **Giai đoạn 3 (Auto-Evolution):** 
   - Kích hoạt tính năng Auto-scaling.
   - Cấp quyền cho Agent có thể tự động viết thêm code cho chính Dashboard này và tự deploy.

---
*Tài liệu này được soạn thảo bằng tư duy AI-Native và đã được tinh chỉnh qua quá trình tự phản biện khắt khe để đảm bảo tính thực tiễn cao nhất.*
