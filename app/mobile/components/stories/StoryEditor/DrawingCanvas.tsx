import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Canvas as RNCanvas,
  PanResponder,
  GestureResponderEvent,
} from 'react-native';
import { DrawingPath } from '@/stores/storyEditorStore';
import Svg, { Polyline } from 'react-native-svg';

interface DrawingCanvasProps {
  paths: DrawingPath[];
  color: string;
  lineWidth: number;
  isDrawing: boolean;
  onAddPath: (path: DrawingPath) => void;
  canvasWidth: number;
  canvasHeight: number;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  paths,
  color,
  lineWidth,
  isDrawing,
  onAddPath,
  canvasWidth,
  canvasHeight,
}) => {
  const currentPathRef = useRef<Array<{ x: number; y: number }>>([]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isDrawing,
      onMoveShouldSetPanResponder: () => isDrawing,
      onPanResponderGrant: (evt) => {
        if (isDrawing) {
          const { pageX, pageY } = evt.nativeEvent;
          currentPathRef.current = [{ x: pageX, y: pageY }];
        }
      },
      onPanResponderMove: (evt) => {
        if (isDrawing && currentPathRef.current) {
          const { pageX, pageY } = evt.nativeEvent;
          currentPathRef.current.push({ x: pageX, y: pageY });
        }
      },
      onPanResponderRelease: () => {
        if (isDrawing && currentPathRef.current.length > 0) {
          const newPath: DrawingPath = {
            id: `drawing-${Date.now()}`,
            points: currentPathRef.current,
            color,
            width: lineWidth,
          };
          onAddPath(newPath);
          currentPathRef.current = [];
        }
      },
    })
  ).current;

  return (
    <View
      style={[styles.container, { width: canvasWidth, height: canvasHeight }]}
      {...panResponder.panHandlers}
    >
      <Svg
        width={canvasWidth}
        height={canvasHeight}
        style={styles.svg}
      >
        {paths.map((path) => (
          <Polyline
            key={path.id}
            points={path.points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={path.color}
            strokeWidth={path.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svg: {
    backgroundColor: 'transparent',
  },
});
