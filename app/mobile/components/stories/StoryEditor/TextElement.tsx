import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { TextElement as TextElementType } from '@/stores/storyEditorStore';

interface TextElementProps {
  element: TextElementType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TextElementType>) => void;
  containerWidth: number;
  containerHeight: number;
}

export const TextElement: React.FC<TextElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  containerWidth,
  containerHeight,
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

  const fontFamilyMap = {
    system: 'System',
    monospace: 'Courier New',
    serif: 'Georgia',
  };

  const containerStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    left: 0,
    top: 0,
  };

  const textStyle = {
    fontSize: element.fontSize,
    color: element.color,
    fontFamily: fontFamilyMap[element.fontFamily],
    textAlign: element.textAlign as 'auto' | 'left' | 'right' | 'center',
    backgroundColor: element.backgroundColor
      ? `${element.backgroundColor}${Math.round((element.backgroundOpacity || 0.8) * 255).toString(16).padStart(2, '0')}`
      : 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
  };

  return (
    <GestureDetector gesture={Gesture.Simultaneous(pan, pinch)}>
      <Animated.View
        style={[
          containerStyle,
          animatedStyle,
          isSelected && styles.selectedBorder,
        ]}
        onTouchStart={() => onSelect(element.id)}
      >
        <Text
          style={textStyle}
          numberOfLines={0}
        >
          {element.text}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 4,
  },
});
