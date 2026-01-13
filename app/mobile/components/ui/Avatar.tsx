import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

interface AvatarProps {
  source?: string | { uri: string };
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onPress?: () => void;
  style?: any;
}

export function Avatar({
  source,
  initials,
  size = 'md',
  style,
}: AvatarProps) {
  const sizeStyles = {
    xs: { width: 28, height: 28, fontSize: 10 },
    sm: { width: 36, height: 36, fontSize: 12 },
    md: { width: 48, height: 48, fontSize: 14 },
    lg: { width: 64, height: 64, fontSize: 16 },
    xl: { width: 96, height: 96, fontSize: 20 },
  };

  const currentSize = sizeStyles[size];

  if (source) {
    const imageSource = typeof source === 'string' ? { uri: source } : source;
    return (
      <Image
        source={imageSource}
        style={[
          styles.avatar,
          {
            width: currentSize.width,
            height: currentSize.height,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatarPlaceholder,
        {
          width: currentSize.width,
          height: currentSize.height,
        },
        style,
      ]}
    >
      <Text style={[styles.initials, { fontSize: currentSize.fontSize }]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    backgroundColor: '#E5E5EA',
  },
  avatarPlaceholder: {
    borderRadius: 999,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
