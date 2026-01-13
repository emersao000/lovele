import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Avatar } from '../ui';
import { Image, Smile } from 'lucide-react-native';

interface CreatePostButtonProps {
  userAvatar?: string;
  userInitials?: string;
  onPress: () => void;
  onImagePress?: () => void;
  onEmojiPress?: () => void;
}

export function CreatePostButton({
  userAvatar,
  userInitials,
  onPress,
  onImagePress,
  onEmojiPress,
}: CreatePostButtonProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar source={userAvatar} initials={userInitials} size="md" />

        <TouchableOpacity style={styles.inputButton} onPress={onPress}>
          <Text style={styles.placeholder}>No que você está pensando?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onImagePress}>
          <Image size={20} color="#007AFF" />
          <Text style={styles.actionLabel}>Foto/Vídeo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onEmojiPress}>
          <Smile size={20} color="#FF9500" />
          <Text style={styles.actionLabel}>Sentimento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  inputButton: {
    flex: 1,
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    color: '#999999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  actions: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionLabel: {
    fontSize: 13,
    color: '#007AFF',
    marginLeft: 6,
    fontWeight: '500',
  },
});
