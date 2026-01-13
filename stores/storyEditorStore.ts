import { create } from 'zustand';
import { ImagePickerAsset } from 'expo-image-picker';

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: 'system' | 'monospace' | 'serif';
  color: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  rotation: number;
  scale: number;
  textAlign: 'left' | 'center' | 'right';
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
}

export interface StickerElement {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface DrawingPath {
  id: string;
  points: Array<{ x: number; y: number }>;
  color: string;
  width: number;
}

export interface CanvasElement {
  type: 'text' | 'sticker' | 'drawing';
  data: TextElement | StickerElement | DrawingPath;
}

export interface StoryEditorState {
  // Background/Media
  backgroundImage: ImagePickerAsset | null;
  backgroundColor: string;
  backgroundFilter: 'none' | 'blackwhite' | 'vintage' | 'sepia' | 'cool' | 'warm';
  backgroundFilterIntensity: number;

  // Text elements
  textElements: TextElement[];
  selectedTextId: string | null;

  // Sticker elements
  stickerElements: StickerElement[];
  selectedStickerId: string | null;

  // Drawing
  drawingPaths: DrawingPath[];
  isDrawing: boolean;

  // UI State
  currentTool: 'text' | 'sticker' | 'drawing' | 'eraser' | 'none';
  currentColor: string;
  showColorPicker: boolean;
  showFontPicker: boolean;
  showFilterPicker: boolean;
  showMediaPicker: boolean;
  showEmojiPicker: boolean;

  // Undo/Redo
  history: CanvasElement[][];
  historyIndex: number;

  // Story metadata
  storyDuration: number;
  privacy: 'everyone' | 'friends' | 'private';

  // Actions
  setBackgroundImage: (image: ImagePickerAsset | null) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundFilter: (filter: StoryEditorState['backgroundFilter']) => void;
  setBackgroundFilterIntensity: (intensity: number) => void;

  // Text actions
  addTextElement: (text: string) => void;
  updateTextElement: (id: string, updates: Partial<TextElement>) => void;
  deleteTextElement: (id: string) => void;
  selectTextElement: (id: string | null) => void;

  // Sticker actions
  addStickerElement: (emoji: string, x?: number, y?: number) => void;
  updateStickerElement: (id: string, updates: Partial<StickerElement>) => void;
  deleteStickerElement: (id: string) => void;
  selectStickerElement: (id: string | null) => void;

  // Drawing actions
  addDrawingPath: (path: DrawingPath) => void;
  removeLastDrawingPath: () => void;
  clearDrawing: () => void;

  // UI actions
  setCurrentTool: (tool: StoryEditorState['currentTool']) => void;
  setCurrentColor: (color: string) => void;
  toggleColorPicker: () => void;
  toggleFontPicker: () => void;
  toggleFilterPicker: () => void;
  toggleMediaPicker: () => void;
  toggleEmojiPicker: () => void;

  // Undo/Redo
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;

  // Story metadata
  setStoryDuration: (duration: number) => void;
  setPrivacy: (privacy: StoryEditorState['privacy']) => void;

  // Get all canvas elements
  getAllElements: () => CanvasElement[];

  // Reset
  resetEditor: () => void;
}

const initialState = {
  backgroundImage: null,
  backgroundColor: '#FFFFFF',
  backgroundFilter: 'none' as const,
  backgroundFilterIntensity: 1,
  textElements: [],
  selectedTextId: null,
  stickerElements: [],
  selectedStickerId: null,
  drawingPaths: [],
  isDrawing: false,
  currentTool: 'none' as const,
  currentColor: '#000000',
  showColorPicker: false,
  showFontPicker: false,
  showFilterPicker: false,
  showMediaPicker: false,
  showEmojiPicker: false,
  history: [],
  historyIndex: -1,
  storyDuration: 5,
  privacy: 'friends' as const,
};

export const useStoryEditorStore = create<StoryEditorState>((set, get) => ({
  ...initialState,

  // Background actions
  setBackgroundImage: (image) =>
    set({ backgroundImage: image }),

  setBackgroundColor: (color) =>
    set({ backgroundColor: color }),

  setBackgroundFilter: (filter) =>
    set({ backgroundFilter: filter }),

  setBackgroundFilterIntensity: (intensity) =>
    set({ backgroundFilterIntensity: intensity }),

  // Text actions
  addTextElement: (text) => {
    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      text,
      x: 50,
      y: 100,
      fontSize: 32,
      fontFamily: 'system',
      color: get().currentColor,
      rotation: 0,
      scale: 1,
      textAlign: 'center',
    };

    set((state) => ({
      textElements: [...state.textElements, newElement],
    }));

    get().saveToHistory();
  },

  updateTextElement: (id, updates) => {
    set((state) => ({
      textElements: state.textElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  },

  deleteTextElement: (id) => {
    set((state) => ({
      textElements: state.textElements.filter((el) => el.id !== id),
      selectedTextId: state.selectedTextId === id ? null : state.selectedTextId,
    }));

    get().saveToHistory();
  },

  selectTextElement: (id) =>
    set({ selectedTextId: id }),

  // Sticker actions
  addStickerElement: (emoji, x = 100, y = 200) => {
    const newElement: StickerElement = {
      id: `sticker-${Date.now()}`,
      emoji,
      x,
      y,
      scale: 1,
      rotation: 0,
    };

    set((state) => ({
      stickerElements: [...state.stickerElements, newElement],
    }));

    get().saveToHistory();
  },

  updateStickerElement: (id, updates) => {
    set((state) => ({
      stickerElements: state.stickerElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    }));
  },

  deleteStickerElement: (id) => {
    set((state) => ({
      stickerElements: state.stickerElements.filter((el) => el.id !== id),
      selectedStickerId: state.selectedStickerId === id ? null : state.selectedStickerId,
    }));

    get().saveToHistory();
  },

  selectStickerElement: (id) =>
    set({ selectedStickerId: id }),

  // Drawing actions
  addDrawingPath: (path) => {
    set((state) => ({
      drawingPaths: [...state.drawingPaths, path],
    }));
  },

  removeLastDrawingPath: () => {
    set((state) => ({
      drawingPaths: state.drawingPaths.slice(0, -1),
    }));
  },

  clearDrawing: () => {
    set({ drawingPaths: [] });
    get().saveToHistory();
  },

  // UI actions
  setCurrentTool: (tool) =>
    set({ currentTool: tool }),

  setCurrentColor: (color) =>
    set({ currentColor: color }),

  toggleColorPicker: () =>
    set((state) => ({ showColorPicker: !state.showColorPicker })),

  toggleFontPicker: () =>
    set((state) => ({ showFontPicker: !state.showFontPicker })),

  toggleFilterPicker: () =>
    set((state) => ({ showFilterPicker: !state.showFilterPicker })),

  toggleMediaPicker: () =>
    set((state) => ({ showMediaPicker: !state.showMediaPicker })),

  toggleEmojiPicker: () =>
    set((state) => ({ showEmojiPicker: !state.showEmojiPicker })),

  // Undo/Redo
  saveToHistory: () => {
    const state = get();
    const currentElements = state.getAllElements();
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(currentElements);

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const previousIndex = state.historyIndex - 1;
      const previousElements = state.history[previousIndex];

      // Restore from history
      const textElements = previousElements
        .filter((el) => el.type === 'text')
        .map((el) => el.data as TextElement);

      const stickerElements = previousElements
        .filter((el) => el.type === 'sticker')
        .map((el) => el.data as StickerElement);

      const drawingPaths = previousElements
        .filter((el) => el.type === 'drawing')
        .map((el) => el.data as DrawingPath);

      set({
        textElements,
        stickerElements,
        drawingPaths,
        historyIndex: previousIndex,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const nextIndex = state.historyIndex + 1;
      const nextElements = state.history[nextIndex];

      const textElements = nextElements
        .filter((el) => el.type === 'text')
        .map((el) => el.data as TextElement);

      const stickerElements = nextElements
        .filter((el) => el.type === 'sticker')
        .map((el) => el.data as StickerElement);

      const drawingPaths = nextElements
        .filter((el) => el.type === 'drawing')
        .map((el) => el.data as DrawingPath);

      set({
        textElements,
        stickerElements,
        drawingPaths,
        historyIndex: nextIndex,
      });
    }
  },

  // Story metadata
  setStoryDuration: (duration) =>
    set({ storyDuration: Math.max(1, Math.min(60, duration)) }),

  setPrivacy: (privacy) =>
    set({ privacy }),

  // Get all elements
  getAllElements: () => {
    const state = get();
    const elements: CanvasElement[] = [];

    state.textElements.forEach((text) => {
      elements.push({ type: 'text', data: text });
    });

    state.stickerElements.forEach((sticker) => {
      elements.push({ type: 'sticker', data: sticker });
    });

    state.drawingPaths.forEach((path) => {
      elements.push({ type: 'drawing', data: path });
    });

    return elements;
  },

  // Reset
  resetEditor: () => {
    set(initialState);
  },
}));
