# 美丽预约 - 美容店预约系统

一个现代化的美容店预约管理系统，采用苹果官网的设计风格，提供用户预约和后台管理功能。

## 🚀 功能特性

### 用户端功能
- **在线预约**: 用户可以选择服务项目和时间进行预约
- **预约查询**: 用户可以通过手机号查询自己的预约记录
- **服务展示**: 展示所有可用的美容服务项目
- **响应式设计**: 完美适配手机、平板和桌面设备

### 管理端功能
- **预约管理**: 查看所有预约记录
- **状态管理**: 确认、取消、完成预约
- **搜索筛选**: 按状态、姓名、手机号等条件筛选
- **数据统计**: 实时显示预约统计数据

## 🛠️ 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Supabase (PostgreSQL + 实时API)
- **UI组件**: Lucide React 图标
- **日期处理**: date-fns
- **样式**: 苹果风格设计系统

## 📊 数据库结构

### 用户表 (users)
- `id`: UUID 主键
- `name`: 姓名
- `phone`: 手机号 (唯一)
- `email`: 邮箱
- `created_at`: 创建时间

### 服务表 (services)
- `id`: UUID 主键
- `name`: 服务名称
- `description`: 服务描述
- `duration`: 服务时长(分钟)
- `price`: 价格
- `is_active`: 是否启用
- `created_at`: 创建时间

### 预约表 (appointments)
- `id`: UUID 主键
- `user_id`: 用户ID (外键)
- `service_id`: 服务ID (外键)
- `appointment_time`: 预约时间
- `status`: 预约状态 (pending/confirmed/cancelled/completed)
- `note`: 备注
- `created_at`: 创建时间

## 🎨 设计特色

- **苹果风格**: 采用苹果官网的简约优雅设计
- **渐变色彩**: 使用现代化的渐变色彩方案
- **微交互**: 丰富的悬停和点击动画效果
- **玻璃效果**: 毛玻璃背景效果
- **响应式**: 完美适配各种设备尺寸

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm start
```

## 📱 页面结构

- `/` - 首页
- `/book` - 在线预约
- `/appointments` - 查询预约
- `/services` - 服务项目
- `/admin` - 管理后台
- `/success` - 预约成功页面

## 🔧 配置说明

### Supabase 配置
在 `src/lib/supabase.ts` 中配置你的 Supabase 项目信息：

```typescript
const supabaseUrl = 'your-supabase-url'
const supabaseAnonKey = 'your-supabase-anon-key'
```

### 环境变量
创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🎯 使用流程

### 用户预约流程
1. 访问首页，点击"立即预约"
2. 填写个人信息（姓名、手机号、邮箱）
3. 选择服务项目和预约时间
4. 提交预约，等待确认

### 管理员操作流程
1. 访问管理后台页面
2. 查看所有预约记录
3. 对待确认的预约进行确认或取消操作
4. 对已确认的预约标记为已完成

## 📈 功能扩展

### 可扩展功能
- 用户登录注册系统
- 支付集成
- 短信通知
- 评价系统
- 会员积分
- 优惠券系统
- 数据分析面板

### 技术扩展
- 添加用户认证
- 集成支付网关
- 添加实时通知
- 优化SEO
- 添加PWA支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**美丽预约** - 让美容服务更便捷，让美丽触手可及 ✨
