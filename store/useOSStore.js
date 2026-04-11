import { create } from 'zustand';

const soundUrls = {
  boot: 'https://www.myinstants.com/media/sounds/windows-xp-startup.mp3',
  mouse: 'https://www.myinstants.com/media/sounds/mouse-click.mp3',
  nav: 'https://www.myinstants.com/media/sounds/windows-navigation-start.mp3',
  type: 'https://www.myinstants.com/media/sounds/typewriter-key-1.mp3',
  open: 'https://www.myinstants.com/media/sounds/windows-navigation-start.mp3',
  close: 'https://www.myinstants.com/media/sounds/windows-navigation-start.mp3',
  error: 'https://www.myinstants.com/media/sounds/windows-xp-error.mp3',
  trash: 'https://raw.githubusercontent.com/reactos/reactos/master/media/sounds/recycle.wav',
  shutdown: 'https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3'
};

export const playSound = (type) => {
  if (typeof window === 'undefined' || !soundUrls[type]) return;
  try {
    const audio = new Audio(soundUrls[type]);
    if (type === 'boot') audio.volume = 0.5;
    if (type === 'mouse') audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio blocked:', type, e));
  } catch (err) {
    console.log('Audio error:', err);
  }
};

const useOSStore = create((set, get) => ({
  wallpaper: '/windows-xp-4089x2726-10769.jpg',
  setWallpaper: (url) => set({ wallpaper: url }),
  powerOn: false,
  setPowerOn: (status) => set({ powerOn: status }),
  biosComplete: false,
  setBiosComplete: (status) => set({ biosComplete: status }),
  bootComplete: false,
  setBootComplete: (status) => set({ bootComplete: status }),
  
  selectedIconId: null,
  setSelectedIconId: (id) => set({ selectedIconId: id }),

  trashItems: [],
  moveToTrash: (item) => {
    playSound('trash');
    set(state => {
      // Check if item is already in trash
      if (state.trashItems.find(i => i.id === item.id)) return state;
      return { trashItems: [...state.trashItems, item], selectedIconId: null };
    });
  },
  restoreFromTrash: (id) => set(state => ({
    trashItems: state.trashItems.filter(item => item.id !== id)
  })),
  emptyTrash: () => {
    playSound('trash');
    set({ trashItems: [] });
  },
  
  isShuttingDown: false,
  isShutDown: false,
  setShuttingDown: (status) => set({ isShuttingDown: status }),
  setShutDown: (status) => set({ isShutDown: status }),

  startMenuOpen: false,
  toggleStartMenu: () => {
    playSound('nav');
    set(state => ({ startMenuOpen: !state.startMenuOpen }));
  },
  closeStartMenu: () => set({ startMenuOpen: false }),

  windows: [],
  highestZIndex: 10,

  openWindow: ({ id, title, componentName, metadata }) => {
    playSound('open');
    set({ startMenuOpen: false });
    
    const { windows, highestZIndex } = get();
    const existingWindow = windows.find(w => w.id === id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w),
          highestZIndex: highestZIndex + 1,
        });
      } else {
        get().bringToFront(id);
      }
      return;
    }

    const offset = (windows.length % 10) * 30;

    const newWindow = {
      id,
      title,
      componentName,
      isMinimized: false,
      isMaximized: false,
      zIndex: highestZIndex + 1,
      top: 50 + offset,
      left: 100 + offset,
      metadata: metadata || {}
    };

    set({
      windows: [...windows, newWindow],
      highestZIndex: highestZIndex + 1,
    });
  },

  closeWindow: (id) => {
    playSound('close');
    set(state => ({
      windows: state.windows.filter(w => w.id !== id)
    }));
  },

  minimizeWindow: (id) => set(state => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w)
  })),

  toggleWindow: (id) => {
    playSound('nav');
    const { highestZIndex, windows } = get();
    const w = windows.find(w => w.id === id);
    if (!w) return;

    const isTop = w.zIndex === highestZIndex;
    
    if (isTop && !w.isMinimized) {
      set({ windows: windows.map(win => win.id === id ? { ...win, isMinimized: true } : win) });
    } else {
      set({
        windows: windows.map(win => win.id === id ? { ...win, isMinimized: false, zIndex: highestZIndex + 1 } : win),
        highestZIndex: highestZIndex + 1,
        startMenuOpen: false
      });
    }
  },

  toggleMaximize: (id) => set(state => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
  })),

  bringToFront: (id) => {
    const { highestZIndex, windows } = get();
    if (windows.find(w => w.id === id)?.zIndex === highestZIndex) return;
    
    set(state => ({
      windows: state.windows.map(w => w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w),
      highestZIndex: highestZIndex + 1,
      startMenuOpen: false
    }));
  },

  terminalHistory: [{ type: 'system', text: 'Microsoft Windows XP [Version 5.1.2600]\n(C) Copyright 1985-2001 Microsoft Corp.\n\nC:\\Documents and Settings\\Al-Moatasem>' }],
  addTerminalOutput: (output) => set(state => ({
    terminalHistory: [...state.terminalHistory, output]
  })),
  clearTerminal: () => set({ terminalHistory: [{ type: 'system', text: 'Microsoft Windows XP [Version 5.1.2600]\n(C) Copyright 1985-2001 Microsoft Corp.\n\nC:\\Documents and Settings\\Al-Moatasem>' }] }),
}));

export default useOSStore;
