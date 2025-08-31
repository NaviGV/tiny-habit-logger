#  Tiny Habit Logger

A minimal but complete full-stack web application for tracking a single daily habit.  
This project demonstrates **robust client-side persistence with IndexedDB**, a graceful **fallback to localStorage**, and a **modern, responsive UI** built with React and TypeScript.

---

##  Features

- **Track a Single Habit** → Clean, focused UI to track one habit (e.g., *"Drink Water"*).  
- **Daily Logging** → Mark the habit as "Done" for the current day with a single click.  
- **Accurate Streak Calculation** → Automatically calculates and displays the current streak of consecutive days, handling date changes & timezones.  
- **7-Day Visual View** → Dynamic display of the last seven days with completion indicators.  
- **Robust Client-Side Persistence** → Saves data in IndexedDB (persists across reloads).  
- **Graceful Fallback System** → Falls back to localStorage if IndexedDB is unavailable (testable via URL parameter).  
- **Dark Mode** → Theme toggle for accessibility & preference.  
- **Modern UI & UX** → Built with `shadcn/ui` + Tailwind CSS, includes toast notifications via **Sonner**.  
- **Confirmation Dialogs** → Prevents accidental data loss with reset confirmations.  

---

## 🛠️ Tech Stack

### Frontend
- **Framework** → React 18 (with TypeScript)  
- **Build Tool** → Vite  
- **UI Components** → [shadcn/ui] 
- **Notifications** → [Sonner] 
- **Styling** → Tailwind CSS  
- **Client Storage** → IndexedDB + localStorage fallback  

### Backend
- **Framework** → Node.js with Express  
- **Configuration** → dotenv  

---

## Project Structure

### Frontend

```
frontend/
├── node_modules/        # Frontend dependencies
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Components
│   │   ├── tracker/     
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── StreakDisplay.tsx
│   │   │   ├── TrackerHeader.tsx
│   │   │   └── WeekView.tsx
│   │   ├── ui/          # UI elements
│   │   └── HabitTracker.tsx
│   ├── lib/             # Utility libraries
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── pages/           # App Pages
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│   
├── .gitignore
├── eslint.config.js     # ESLint config
├── index.html           # HTML entry point
├── package.json         # Frontend dependencies & scripts
└── package-lock.json
```

### Backend
```
backend/
├── node_modules/        # Backend dependencies
├── .env                 # Environment variables
├── .env.example         # Example environment file
├── .gitignore           # Git ignore rules
├── index.js             # Express server entry point
└── package.json         # Backend dependencies & scripts
```

## Getting Started

Follow these instructions to set up the project locally.

###  Prerequisites
- [Node.js] (v18 or later recommended)  
- npm (comes with Node.js)  

---

###  Backend Setup

### Navigate to backend
```ts
cd backend
```

### Install dependencies
```ts
npm install
```

### Create the environment file from the example template

```ts
# for windows
copy .env.example .env

# for Mac / Linux
cp .env.example .env
```

### Start server
```ts
node index.js
```

### Backend will run on http://localhost:5000

---

###  Frontend Setup


### Open new terminal and navigate to frontend
```ts
cd frontend
```

### Install dependencies
```ts
npm install
```

### Start Vite dev server
```ts
npm run dev
```

### Frontend will run at http://localhost:5173 

---

###  Testing Special Features

###  Graceful Fallback (localStorage)

### Force localStorage mode via URL parameter:

1. Open app → `http://localhost:5173`  
2. Add `?force_local=true` →  
   `http://localhost:5173/?force_local=true`  
3. Check DevTools → Console (warning message) & Application → Local Storage.  
   ```ts
   Storage: Falling back to localStorage (either unsupported or forced by URL).
   ```
4. Remove parameter to return to IndexedDB mode → `http://localhost:5173`

---

### Testing with Different Dates

Simulate different days without waiting:

1. Open → `frontend/src/components/HabitTracker.tsx`  
2. Find:  
   ```ts
   const MOCK_TODAY: string | null = null;
   ```

Change value to a date string:

```ts
const MOCK_TODAY: string | null = '2025-09-01T12:00:00';
```

Save → App reloads & behaves as if today = given date.

Remember to set `MOCK_TODAY` back to `null` when finished.

