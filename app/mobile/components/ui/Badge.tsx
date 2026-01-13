import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  const sizeStyles = {
    sm: { paddingVertical: 2, paddingHorizontal: 6, fontSize: 10 },
    md: { paddingVertical: 4, paddingHorizontal: 8, fontSize: 12 },
    lg: { paddingVertical: 6, paddingHorizontal: 10, fontSize: 14 },
  };

  const variantStyles = {
    primary: { backgroundColor: '#007AFF', color: '#FFFFFF' },
    secondary: { backgroundColor: '#E5E5EA', color: '#000000' },
    success: { backgroundColor: '#34C759', color: '#FFFFFF' },
    danger: { backgroundColor: '#FF3B30', color: '#FFFFFF' },
    warning: { backgroundColor: '#FF9500', color: '#FFFFFF' },
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          backgroundColor: currentVariant.backgroundColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            fontSize: currentSize.fontSize,
            color: currentVariant.color,
          },
          styles.text,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});
