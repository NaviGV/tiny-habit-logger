import { openDB, IDBPDatabase } from 'idb';

export interface Log {
  date: string; 
  completed: boolean;
}

interface HabitDB extends IDBPDatabase {
  logs: {
    key: string;
    value: Log;
  };
}

interface StorageModule {
  getLogs: () => Promise<Log[]>;
  addLog: (log: Log) => Promise<void>;
  resetLogs: () => Promise<void>;
}

const shouldUseLocalStorage = (): boolean => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('force_local') === 'true';
  }
  return false;
};

const dbPromise = openDB<HabitDB>('habit-db', 1, {
  upgrade(db) { 
    db.createObjectStore('logs', { keyPath: 'date' });
  },
});

const idb: StorageModule = {
  async getLogs() {
    return (await dbPromise).getAll('logs');
  },
  async addLog(log) {
    await (await dbPromise).put('logs', log);
  },
  async resetLogs() {
    await (await dbPromise).clear('logs');
  },
};

const ls: StorageModule = {
  async getLogs() {
    const data = localStorage.getItem('habitLogs');
    return data ? (JSON.parse(data) as Log[]) : [];
  },
  async addLog(log) {
    const logs = await this.getLogs();
    const existingIndex = logs.findIndex(item => item.date === log.date);
    
    if (existingIndex > -1) {
      logs[existingIndex] = log;
    } else {
      logs.push(log);
    }
    localStorage.setItem('habitLogs', JSON.stringify(logs));
  },
  async resetLogs() {
    localStorage.removeItem('habitLogs');
  },
};

let storage: StorageModule;
const isIndexedDBSupported = 'indexedDB' in window;

if (isIndexedDBSupported && !shouldUseLocalStorage()) {
  console.log("Storage: Using IndexedDB.");
  storage = idb;
} else {
  console.warn("Storage: Falling back to localStorage (either unsupported or forced by URL).");
  storage = ls;
}

export default storage;

