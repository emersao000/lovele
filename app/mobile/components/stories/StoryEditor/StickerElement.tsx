import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { StickerElement as StickerElementType } from '@/stores/storyEditorStore';

interface StickerElementProps {
  element: StickerElementType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<StickerElementType>) => void;
  onDelete: (id: string) => void;
}

export const StickerElement: React.FC<StickerElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}) => {
  const offsetX = useSharedValue(element.x);
  const offsetY = useSharedValue(element.y);
  const scale = useSharedValue(element.scale);
  const rotation = useSharedValue(element.rotation);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      offsetX.value = event.translationX + element.x;
      offsetY.value = event.translationY + element.y;
    })
    .onEnd(() => {
      onUpdate(element.id, {
        x: offsetX.value,
        y: offsetY.value,
      });
    });

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = element.scale * event.scale;
    })
    .onEnd(() => {
      onUpdate(element.id, {
        scale: Math.max(0.5, Math.min(3, scale.value)),
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pan, pinch)}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          isSelected && styles.selectedBorder,
        ]}
        onTouchStart={() => onSelect(element.id)}
      >
        <Text style={styles.emoji}>{element.emoji}</Text>
        {isSelected && (
          <Pressable
            style={styles.deleteButton}
            onPress={() => onDelete(element.id)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </Pressable>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 50,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 30,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
