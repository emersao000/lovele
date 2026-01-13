import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Bookmark, Flag, Share } from 'lucide-react-native';

interface PostActionsProps {
  isSaved?: boolean;
  onSave?: () => void;
  onReport?: () => void;
  onShare?: () => void;
}

export function PostActions({
  isSaved = false,
  onSave,
  onReport,
  onShare,
}: PostActionsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action} onPress={onSave}>
        <Bookmark
          size={20}
          color="#007AFF"
          fill={isSaved ? '#007AFF' : 'transparent'}
        />
        <Text style={styles.label}>{isSaved ? 'Salvo' : 'Salvar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.action} onPress={onShare}>
        <Share size={20} color="#007AFF" />
        <Text style={styles.label}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.action} onPress={onReport}>
        <Flag size={20} color="#FF3B30" />
        <Text style={[styles.label, styles.reportLabel]}>Denunciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  },
  action: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '500',
  },
  reportLabel: {
    color: '#FF3B30',
  },
});
