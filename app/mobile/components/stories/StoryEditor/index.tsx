import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useStoryEditorStore } from '@/stores/storyEditorStore';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { ColorPicker } from './ColorPicker';
import { FontPicker } from './FontPicker';
import { FilterPicker } from './FilterPicker';
import { MediaPicker } from './MediaPicker';
import { EmojiPicker } from './EmojiPicker';
import { TextInputModal } from './TextInputModal';

interface StoryEditorProps {
  onStoryCreate?: (story: any) => void;
  onCancel?: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  onStoryCreate,
  onCancel,
}) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [currentTextEditId, setCurrentTextEditId] = useState<string | null>(
    null,
  );

  const {
    // State
    backgroundImage,
    backgroundColor,
    backgroundFilter,
    backgroundFilterIntensity,
    textElements,
    stickerElements,
    drawingPaths,
    selectedTextId,
    selectedStickerId,
    currentTool,
    currentColor,
    showColorPicker,
    showFontPicker,
    showFilterPicker,
    showMediaPicker,
    showEmojiPicker,
    storyDuration,
    privacy,

    // Actions
    setBackgroundImage,
    setBackgroundColor,
    setBackgroundFilter,
    setBackgroundFilterIntensity,
    addTextElement,
    updateTextElement,
    deleteTextElement,
    selectTextElement,
    addStickerElement,
    updateStickerElement,
    deleteStickerElement,
    selectStickerElement,
    addDrawingPath,
    clearDrawing,
    setCurrentTool,
    setCurrentColor,
    toggleColorPicker,
    toggleFontPicker,
    toggleFilterPicker,
    toggleMediaPicker,
    toggleEmojiPicker,
    undo,
    redo,
    resetEditor,
  } = useStoryEditorStore();

  const handleAddText = () => {
    setShowTextInput(true);
    setCurrentTextEditId(null);
  };

  const handleTextInputSubmit = (text: string) => {
    if (text.trim()) {
      if (currentTextEditId) {
        updateTextElement(currentTextEditId, { text });
      } else {
        addTextElement(text);
      }
    }
    setShowTextInput(false);
    setCurrentTextEditId(null);
  };

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editorContainer}>
        {/* Canvas */}
        <Canvas
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
          backgroundFilter={backgroundFilter}
          backgroundFilterIntensity={backgroundFilterIntensity}
          textElements={textElements}
          stickerElements={stickerElements}
          drawingPaths={drawingPaths}
          selectedTextId={selectedTextId}
          selectedStickerId={selectedStickerId}
          currentTool={currentTool}
          currentColor={currentColor}
          onSelectText={selectTextElement}
          onUpdateText={updateTextElement}
          onDeleteText={deleteTextElement}
          onSelectSticker={selectStickerElement}
          onUpdateSticker={updateStickerElement}
          onDeleteSticker={deleteStickerElement}
          onAddDrawingPath={addDrawingPath}
        />

        {/* Toolbar */}
        <Toolbar
          currentTool={currentTool}
          onToolChange={(tool) => {
            if (tool === 'text') {
              handleAddText();
            } else {
              setCurrentTool(tool);
            }
          }}
          onColorPicker={toggleColorPicker}
          onFontPicker={toggleFontPicker}
          onFilterPicker={toggleFilterPicker}
          onMediaPicker={toggleMediaPicker}
          onEmojiPicker={toggleEmojiPicker}
          onUndo={undo}
          onRedo={redo}
          onClearDrawing={clearDrawing}
        />
      </View>

      {/* Modals */}
      <ColorPicker
        visible={showColorPicker}
        currentColor={currentColor}
        onColorSelect={setCurrentColor}
        onClose={toggleColorPicker}
      />

      <FontPicker
        visible={showFontPicker}
        currentFont={
          selectedTextId
            ? textElements.find((t) => t.id === selectedTextId)?.fontFamily ||
              'system'
            : 'system'
        }
        currentFontSize={
          selectedTextId
            ? textElements.find((t) => t.id === selectedTextId)?.fontSize || 32
            : 32
        }
        currentTextAlign={
          selectedTextId
            ? textElements.find((t) => t.id === selectedTextId)?.textAlign ||
              'center'
            : 'center'
        }
        onFontSelect={(font) => {
          if (selectedTextId) {
            updateTextElement(selectedTextId, {
              fontFamily: font as any,
            });
          }
        }}
        onFontSizeChange={(size) => {
          if (selectedTextId) {
            updateTextElement(selectedTextId, { fontSize: size });
          }
        }}
        onTextAlignChange={(align) => {
          if (selectedTextId) {
            updateTextElement(selectedTextId, { textAlign: align });
          }
        }}
        onClose={toggleFontPicker}
      />

      <FilterPicker
        visible={showFilterPicker}
        currentFilter={backgroundFilter}
        filterIntensity={backgroundFilterIntensity}
        onFilterSelect={setBackgroundFilter}
        onIntensityChange={setBackgroundFilterIntensity}
        onClose={toggleFilterPicker}
      />

      <MediaPicker
        visible={showMediaPicker}
        onImageSelect={setBackgroundImage}
        onClose={toggleMediaPicker}
      />

      <EmojiPicker
        visible={showEmojiPicker}
        onEmojiSelect={(emoji) => {
          addStickerElement(emoji, 100, 200);
          toggleEmojiPicker();
        }}
        onClose={toggleEmojiPicker}
      />

      <TextInputModal
        visible={showTextInput}
        onSubmit={handleTextInputSubmit}
        onClose={() => {
          setShowTextInput(false);
          setCurrentTextEditId(null);
        }}
        initialText={
          currentTextEditId
            ? textElements.find((t) => t.id === currentTextEditId)?.text || ''
            : ''
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  editorContainer: {
    flex: 1,
  },
});
