# DevShow

> A modern developer showcase platform for building and sharing professional project portfolios.

DevShow gives developers a focused space to present their work, technical skills, professional identity, and live projects through a clean public profile.

It combines a private workspace for managing projects with public developer and project pages designed for sharing.

---

## ✨ Overview

DevShow is built around a simple idea:

**Your projects should be easier to present than your codebase is to build.**

Developers can:

- Create a professional developer profile
- Manage and publish projects
- Add technologies used in each project
- Link source repositories and live demos
- Upload project screenshots
- Share a public developer profile
- Share individual public project pages
- Track project views
- Switch between multiple light and dark visual themes

The frontend is a React + TypeScript application designed around a clean, developer-focused interface rather than a traditional dashboard.

---

## 🚀 Features

### Developer Profile

- Display name and username
- Developer biography
- GitHub profile
- LinkedIn profile
- Personal website
- Public developer profile

### Project Management

- Create projects
- Edit project details
- Delete projects
- Publish / unpublish projects
- Markdown project descriptions
- Technology tags
- GitHub repository links
- Live demo links
- Project view counter

### Project Media

- Upload project screenshots
- Up to 5 screenshots per project
- Screenshot previews
- Remove uploaded screenshots
- Public screenshot viewer
- Thumbnail-based project gallery

### Authentication

- Registration
- Login
- Stateless JWT authentication
- Protected workspace routes
- Persistent authentication using browser storage
- Logout

### Public Pages

Developer profiles:

`/dev/:username`

Project pages:

`/dev/:username/:slug`

Public pages only expose published projects.

### Theming

DevShow includes multiple built-in visual themes.

**Light**

- Paper
- Arctic
- Lavender
- Mint
- Blush

**Dark**

- Obsidian
- Midnight
- Violet
- Emerald
- Rose

The selected theme is persisted locally.

---

## 🧱 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | UI |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Axios | API communication |
| React Markdown | Markdown rendering |
| Lucide React | UI icons |
| Inter | Interface typography |
| JetBrains Mono | Developer-oriented typography |

### Backend

DevShow's frontend communicates with a separate FastAPI backend.

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- JWT
- Argon2
- Python

The backend lives in a separate repository.

---

## 🏗️ Architecture

DevShow uses a separated frontend/backend architecture.

```text
┌─────────────────────────────┐
│          DevShow            │
│          Frontend           │
│                             │
│  React + TypeScript + Vite  │
└──────────────┬──────────────┘
               │
               │ HTTP / JSON
               │ Bearer JWT
               ▼
┌─────────────────────────────┐
│          DevShow            │
│          Backend            │
│                             │
│    FastAPI + SQLAlchemy     │
└──────────────┬──────────────┘
               │
               ▼
        ┌─────────────┐
        │ PostgreSQL  │
        └─────────────┘
```

The frontend does not contain server-side rendering or template-based pages.

---

## 📁 Project Structure

```text
src/
├── auth/
│   ├── AuthProvider.tsx
│   └── types.ts
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   │
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Spinner.tsx
│   │   ├── Textarea.tsx
│   │   ├── Toast.tsx
│   │   └── ToastContainer.tsx
│   │
│   ├── Navbar.tsx
│   └── ThemeSwitcher.tsx
│
├── layouts/
│   └── AppLayout.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── ProjectCreate.tsx
│   ├── ProjectDetail.tsx
│   ├── ProjectEdit.tsx
│   ├── PublicProfile.tsx
│   └── PublicProject.tsx
│
├── services/
│   ├── api.ts
│   ├── errors.ts
│   └── projects.ts
│
├── theme/
│   ├── ThemeProvider.tsx
│   └── themes.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🔐 Authentication

DevShow uses bearer-token authentication.

After successful authentication, the frontend stores the access token locally and automatically attaches it to API requests.

Authenticated requests use:

```http
Authorization: Bearer <token>
```

Protected application areas include:

```text
/dashboard
/profile
/projects/new
/projects/:projectId
/projects/:projectId/edit
```

Public pages do not require authentication:

```text
/
/login
/register
/dev/:username
/dev/:username/:slug
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have:

- Node.js 20+ or Bun
- A running DevShow backend
- Git

Bun is recommended for development.

### 1. Clone the repository

```bash
git clone git@github.com:yashG0/DevShow.git
cd DevShow
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure the API

Create:

```text
.env.local
```

Add:

```env
VITE_API_URL=http://localhost:8000
```

If `VITE_API_URL` is omitted, the application defaults to:

```text
http://localhost:8000
```

### 4. Start the development server

```bash
bun run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🧪 Production Build

Create a production build with:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

---

## 🔌 Backend

The frontend requires the DevShow API.

Expected development API:

```text
http://localhost:8000
```

The backend provides:

- Authentication
- Developer profiles
- Project management
- Project publishing
- Project media
- Public developer profiles
- Public project pages
- View counting

The frontend and backend are intentionally maintained as separate repositories.

---

## 🗺️ Application Routes

### Public

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/login` | Login |
| `/register` | Registration |
| `/dev/:username` | Public developer profile |
| `/dev/:username/:slug` | Public project page |

### Authenticated

| Route | Purpose |
|---|---|
| `/dashboard` | Developer workspace |
| `/profile` | Profile editor |
| `/projects/new` | Create project |
| `/projects/:projectId` | Project details |
| `/projects/:projectId/edit` | Edit project |

---

## 🎨 Design System

DevShow follows a restrained developer-oriented visual language.

The interface is designed around:

- Clear hierarchy
- Strong typography
- Subtle borders
- Layered surfaces
- Compact controls
- Consistent spacing
- Accessible focus states
- Reduced-motion support
- Responsive layouts

The design intentionally avoids:

- Excessive gradients
- Generic SaaS illustrations
- Fake metrics
- Oversized decorative elements
- Terminal/hacker gimmicks
- Excessive card layouts

The goal is a product that feels closer to a professional developer tool than a template portfolio.

---

## 📱 Responsive Design

The interface is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Navigation, project layouts, forms, and public profiles adapt to smaller screens.

---

## 🛡️ Security Considerations

The frontend follows several security-oriented practices:

- Authentication tokens are attached through a centralized Axios interceptor
- Protected routes require authentication
- Public routes do not expose authenticated workspace functionality
- External links use `target="_blank"` with `rel="noreferrer"`
- User-generated project descriptions are rendered through React Markdown
- API errors are normalized through a shared error utility

Security-sensitive validation and authorization remain enforced by the backend.

---

## 🧭 Project Status

DevShow is currently under active development.

### Current

- [x] React frontend
- [x] Authentication
- [x] Developer workspace
- [x] Profile management
- [x] Project CRUD
- [x] Project publishing
- [x] Project screenshots
- [x] Public developer profiles
- [x] Public project pages
- [x] View counter
- [x] Dynamic themes
- [x] Responsive UI

### Planned

- [ ] Production deployment
- [ ] Additional accessibility refinement
- [ ] Further performance optimization
- [ ] Production observability

---

## 📌 Product Philosophy

DevShow intentionally keeps the first version focused.

It is not trying to become:

- A social network
- A GitHub replacement
- A job board
- A developer discovery marketplace
- An analytics platform

The product focuses on one thing:

> **Giving developers a polished place to present what they build.**

---

## 🤝 Contributing

DevShow is currently maintained as a personal product project.

If the project becomes open for external contributions, contribution guidelines will be added here.

---

## 📄 License

License information will be added before the project is distributed for external use.

---

## 👨‍💻 Author

**Yash Gaurkar**

MCA Student · Backend Developer

Built with:

```text
React
TypeScript
FastAPI
PostgreSQL
Linux
```
