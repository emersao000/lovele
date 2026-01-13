import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { TextElement } from './TextElement';
import { StickerElement } from './StickerElement';
import { DrawingCanvas } from './DrawingCanvas';
import {
  TextElement as TextElementType,
  StickerElement as StickerElementType,
  DrawingPath,
} from '@/stores/storyEditorStore';

interface CanvasProps {
  backgroundImage: any | null;
  backgroundColor: string;
  backgroundFilter: string;
  backgroundFilterIntensity: number;
  textElements: TextElementType[];
  stickerElements: StickerElementType[];
  drawingPaths: DrawingPath[];
  selectedTextId: string | null;
  selectedStickerId: string | null;
  currentTool: string;
  currentColor: string;
  onSelectText: (id: string | null) => void;
  onUpdateText: (id: string, updates: Partial<TextElementType>) => void;
  onDeleteText: (id: string) => void;
  onSelectSticker: (id: string | null) => void;
  onUpdateSticker: (id: string, updates: Partial<StickerElementType>) => void;
  onDeleteSticker: (id: string) => void;
  onAddDrawingPath: (path: DrawingPath) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
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
  onSelectText,
  onUpdateText,
  onDeleteText,
  onSelectSticker,
  onUpdateSticker,
  onDeleteSticker,
  onAddDrawingPath,
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const canvasWidth = screenWidth;
  const canvasHeight = screenHeight - 220; // Space for toolbar

  const getFilterStyle = () => {
    switch (backgroundFilter) {
      case 'blackwhite':
        return { filter: `grayscale(${backgroundFilterIntensity})` };
      case 'sepia':
        return { filter: `sepia(${backgroundFilterIntensity})` };
      case 'vintage':
        return {
          filter: `saturate(${1.2 * backgroundFilterIntensity}) brightness(${
            1.1 * backgroundFilterIntensity
          })`,
        };
      case 'cool':
        return { filter: `hue-rotate(-30deg) saturate(1.2)` };
      case 'warm':
        return { filter: `hue-rotate(30deg) saturate(1.2)` };
      default:
        return {};
    }
  };

  const renderBackground = () => {
    if (backgroundImage && backgroundImage.uri) {
      return (
        <Image
          source={{ uri: backgroundImage.uri }}
          style={{
            width: canvasWidth,
            height: canvasHeight,
            opacity: backgroundFilterIntensity,
          }}
        />
      );
    }

    if (backgroundColor) {
      return (
        <View
          style={{
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor,
          }}
        />
      );
    }

    return (
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: canvasWidth,
          height: canvasHeight,
        }}
      />
    );
  };

  return (
    <View
      style={[styles.container, { width: canvasWidth, height: canvasHeight }]}
    >
      {/* Background */}
      {renderBackground()}

      {/* Drawing Canvas */}
      {currentTool === 'drawing' && (
        <DrawingCanvas
          paths={drawingPaths}
          color={currentColor}
          lineWidth={5}
          isDrawing={currentTool === 'drawing'}
          onAddPath={onAddDrawingPath}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      )}

      {/* Text Elements */}
      {textElements.map((element) => (
        <TextElement
          key={element.id}
          element={element}
          isSelected={element.id === selectedTextId}
          onSelect={onSelectText}
          onUpdate={onUpdateText}
          containerWidth={canvasWidth}
          containerHeight={canvasHeight}
        />
      ))}

      {/* Sticker Elements */}
      {stickerElements.map((element) => (
        <StickerElement
          key={element.id}
          element={element}
          isSelected={element.id === selectedStickerId}
          onSelect={onSelectSticker}
          onUpdate={onUpdateSticker}
          onDelete={onDeleteSticker}
        />
      ))}

      {/* Drawing Paths Display */}
      {drawingPaths.length > 0 && (
        <DrawingCanvas
          paths={drawingPaths}
          color={currentColor}
          lineWidth={5}
          isDrawing={false}
          onAddPath={() => {}}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
});
