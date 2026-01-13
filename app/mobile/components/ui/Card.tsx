import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  style,
  variant = 'elevated',
  padding = 'md',
}: CardProps) {
  const paddingSizes = {
    sm: 8,
    md: 12,
    lg: 16,
  };

  return (
    <View
      style={[
        styles.card,
        styles[`card_${variant}`],
        {
          padding: paddingSizes[padding],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  card_elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card_outlined: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  card_filled: {
    backgroundColor: '#F9F9F9',
  },
});
