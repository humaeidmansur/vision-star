# ✦ Vision Star

### Your Life. Your Goals. Your Future.

Vision Star is a personal life management application designed to help individuals organize their goals, track personal growth, manage daily tasks, and plan their future in one centralized workspace.

It was built to solve a problem I experience myself: managing personal ambitions, learning progress, projects, achievements, and everyday responsibilities across different platforms can become difficult.

Vision Star brings these activities together in one simple and organized dashboard.

---

## 1. The Problem

Personal development often involves using different applications, notes, documents, and task managers.

For example:
- Goals are recorded in one place.
- Learning progress is tracked somewhere else.
- Project information is scattered across different platforms.
- Daily responsibilities are managed separately.
- Achievements and future plans are easily forgotten.

As a result, it becomes difficult to maintain an overview of personal progress and connect everyday activities with long-term ambitions.

**The goal of Vision Star is to provide one centralized workspace for managing these different areas of personal development.**

---

## 2. The Solution

Vision Star provides a simple dashboard where users can organize and manage their personal development activities.

The application combines goal management, skill tracking, project organization, daily tasks, personal values, and personal journey tracking.

Users can add, update, and manage their own information instead of working with predefined personal data.

---

## 3. Key Features

| Feature | Description |
|---|---|
| Dashboard | Centralized overview of personal activities. |
| Personal Profile | Manage personal information and professional details. |
| My Journey | Organize achievements and personal development across Past, Present, and Future. |
| Goals Management | Create goals, set target dates, and track progress. |
| Skills Development | Manage skills and monitor current and target levels. |
| Projects Management | Organize projects, technologies, descriptions, and project links. |
| Daily Tasks | Create, organize, and complete daily tasks. |
| Personal Values | Define and manage important personal values. |
| Account Management | Register, log in, switch accounts, and log out. |
| Settings | Access application settings. |

---

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling |
| LocalStorage | Browser-based data persistence |
| Git & GitHub | Version control and source code management |
| Vercel | Application deployment |

---

## 5. Project Architecture

Vision Star follows a component-based architecture using Next.js App Router.

The project separates application pages, reusable components, state management, data storage, and TypeScript definitions to keep the code organized and maintainable.

### Folder Structure

```text
vision-star/
│
├── app/
│   ├── goals/
│   ├── journey/
│   │   ├── past/
│   │   ├── present/
│   │   └── future/
│   ├── login/
│   ├── profile/
│   ├── projects/
│   ├── register/
│   ├── settings/
│   ├── skills/
│   ├── tasks/
│   ├── values/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   │   └── LoginPopup.tsx
│   └── layout/
│       └── Sidebar.tsx
│
├── context/
│   └── PersonalDataContext.tsx
│
├── data/
│   └── initial-data.ts
│
├── hooks/
│   └── usePersonalData.ts
│
├── lib/
│   └── storage.ts
│
├── types/
│   └── index.ts
│
├── public/
│
├── package.json
└── README.md
```

### Main Architecture Components

**1. App Router (`app/`)**

Contains application pages and route-specific layouts. Each feature has its own route, such as Goals, Skills, Projects, Tasks, and Profile.

**2. Components (`components/`)**

Contains reusable interface elements, including:
- Sidebar navigation.
- Login popup.
- Shared layout components.

**3. Context (`context/`)**

`PersonalDataContext.tsx` manages shared personal data and provides application-wide state.

**4. Custom Hooks (`hooks/`)**

`usePersonalData.ts` provides convenient access to the personal data context.

**5. Data (`data/`)**

`initial-data.ts` defines the initial blank data structure used by the application.

**6. Storage (`lib/`)**

`storage.ts` handles browser LocalStorage operations, including account management and personal data persistence.

**7. Types (`types/`)**

`index.ts` contains TypeScript interfaces and types for profiles, goals, skills, projects, tasks, achievements, and other application data.

### Data Flow

The application follows this basic data flow:

```text
User Interaction
       ↓
 Next.js Pages
       ↓
Reusable Components
       ↓
Personal Data Context
       ↓
Storage Functions
       ↓
 Browser LocalStorage
```

This structure separates the user interface from shared state and browser storage operations.

---

## 6. Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/humaeidmansur/vision-star.git
```

**2. Navigate to the project directory**

```bash
cd vision-star
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit:

```text
http://localhost:3000
```

### Production Build

To check the production build:

```bash
npm run build
```

To run the production version locally:

```bash
npm run start
```

---

## 7. Data Storage and Limitations

Vision Star currently uses browser LocalStorage to store registered accounts and personal dashboard information.

The current implementation supports:

- Separate personal data for registered accounts.
- Account registration and login.
- A maximum of three registered accounts.
- Automatic inactivity cleanup after three days.
- Data persistence within the same browser storage.

**Important:** This is a frontend prototype. LocalStorage does not provide secure authentication or cloud synchronization. Account credentials are not protected by a production authentication system.

Users should not store sensitive personal information in this version.

---

## 8. Empty States and Failure Handling

The application is designed to support users who are starting with an empty personal workspace.

Current behaviours include:

- New users start with blank personal information.
- Goals, skills, projects, tasks, and achievements can initially be empty.
- Users can add their own information.
- Login provides feedback when the entered email or password is incorrect.
- Account registration is limited to three registered accounts.

These behaviours help make the application usable even when users have not entered their information yet.

---

## 9. Deliberately Not Implemented

To keep the project focused and achievable, several features were deliberately excluded from the current scope.

| Feature | Reason |
|---|---|
| Backend API | The current version focuses on frontend functionality. |
| Cloud database | Personal information is stored locally. |
| Production authentication | The current login system is a frontend prototype. |
| Password recovery | No backend authentication service is connected. |
| Email verification | No email service is integrated. |
| Cross-device synchronization | LocalStorage does not synchronize between devices. |
| Calendar integration | Outside the initial project scope. |
| Push notifications | Not required for the initial version. |
| Advanced analytics | Basic personal management is the current priority. |

These limitations are intentional. The objective was to build a working and understandable personal management tool within a manageable development scope.

---

## 10. Deployment

**Live Application:** [https://vision-star-app-made-by-humaeid.vercel.app]

**GitHub Repository:** [https://github.com/humaeidmansur/vision-star.git]

  

---

## 11. Future Improvements

Possible improvements for future versions include:

- Secure authentication and backend integration.
- Cloud database and synchronization.
- Advanced progress charts.
- Calendar integration.
- Habit tracking.
- Notifications and reminders.
- Data export and backup.

These are potential future developments, not features of the current version.

---

## Project Vision

> A clear vision gives you direction. Consistent actions move you forward.

**Vision Star — Your Life. Your Goals. Your Future.**