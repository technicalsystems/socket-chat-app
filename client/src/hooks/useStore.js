import create from 'zustand'

const useStore = create((set, get) => ({

  file: null,
  showPreview: false,
  showEmoji: false,
  
  setFile: (file) => {
    const prevFile = get().file
    if (prevFile) {
      // ----------------------------------------------------------------
      // https://w3c.github.io/FileAPI/#creating-revoking
      // это позволяет избежать утечек памяти
      // ----------------------------------------------------------------
      URL.revokeObjectURL(prevFile)
    }
    // обновляем файл
    set({ file })
  },
  // ----------------------------------------------------------------
  // метод для обновления индикатора отображения превью
  // ----------------------------------------------------------------
  setShowPreview: (showPreview) => set({ showPreview }),
  // ----------------------------------------------------------------
  // метод для обновления индикатора отображения эмодзи
  // ----------------------------------------------------------------
  setShowEmoji: (showEmoji) => set({ showEmoji })
}))

export default useStore