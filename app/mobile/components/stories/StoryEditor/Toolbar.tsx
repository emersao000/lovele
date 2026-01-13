import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface ToolbarProps {
  currentTool: string;
  onToolChange: (tool: string) => void;
  onColorPicker: () => void;
  onFontPicker: () => void;
  onFilterPicker: () => void;
  onMediaPicker: () => void;
  onEmojiPicker: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearDrawing: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  onToolChange,
  onColorPicker,
  onFontPicker,
  onFilterPicker,
  onMediaPicker,
  onEmojiPicker,
  onUndo,
  onRedo,
  onClearDrawing,
}) => {
  const { width: screenWidth } = Dimensions.get('window');

  const ToolButton = ({
    icon,
    label,
    tool,
    onPress,
  }: {
    icon: string;
    label: string;
    tool?: string;
    onPress?: () => void;
  }) => {
    const isActive = tool && currentTool === tool;
    return (
      <Pressable
        style={[styles.toolButton, isActive && styles.activeToolButton]}
        onPress={onPress || (() => tool && onToolChange(tool))}
      >
        <MaterialIcons
          name={icon as any}
          size={24}
          color={isActive ? '#FFFFFF' : '#333333'}
        />
        <Text style={[styles.toolLabel, isActive && styles.activeToolLabel]}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <BlurView intensity={90} style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Text Tool */}
        <ToolButton
          icon="text-fields"
          label="Text"
          tool="text"
          onPress={() => {
            onToolChange('text');
            onFontPicker();
          }}
        />

        {/* Sticker/Emoji Tool */}
        <ToolButton
          icon="emoji-emotions"
          label="Emoji"
          tool="sticker"
          onPress={() => {
            onToolChange('sticker');
            onEmojiPicker();
          }}
        />

        {/* Drawing Tool */}
        <ToolButton icon="edit" label="Draw" tool="drawing" />

        {/* Eraser Tool */}
        <ToolButton icon="brush" label="Erase" tool="eraser" />

        {/* Color Picker */}
        <ToolButton icon="palette" label="Color" onPress={onColorPicker} />

        {/* Background/Media */}
        <ToolButton icon="image" label="Image" onPress={onMediaPicker} />

        {/* Filters */}
        <ToolButton icon="filter-alt" label="Filter" onPress={onFilterPicker} />

        {/* Undo */}
        <ToolButton icon="undo" label="Undo" onPress={onUndo} />

        {/* Redo */}
        <ToolButton icon="redo" label="Redo" onPress={onRedo} />

        {/* Clear Drawing */}
        <ToolButton icon="delete" label="Clear" onPress={onClearDrawing} />
      </ScrollView>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  scrollView: {
    maxHeight: 80,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 4,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  activeToolButton: {
    backgroundColor: '#667eea',
  },
  toolLabel: {
    fontSize: 10,
    color: '#333333',
    marginTop: 4,
  },
  activeToolLabel: {
    color: '#FFFFFF',
  },
});
