import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';

interface MediaItem {
  id: string;
  uri: string;
  type: 'image' | 'video';
  duration?: number;
}

interface MediaPreviewProps {
  media: MediaItem[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
}

export function MediaPreview({
  media,
  onRemove,
  onClearAll,
}: MediaPreviewProps) {
  if (media.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {media.length} {media.length === 1 ? 'arquivo' : 'arquivos'}{' '}
          selecionado(s)
        </Text>
        {onClearAll && (
          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.clearText}>Limpar tudo</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {media.map((item) => (
          <View key={item.id} style={styles.mediaItem}>
            <Image
              source={{ uri: item.uri }}
              style={styles.thumbnail}
              resizeMode="cover"
            />

            {item.type === 'video' && item.duration && (
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>
                  {formatDuration(item.duration)}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemove(item.id)}
            >
              <X size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  clearText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  mediaItem: {
    position: 'relative',
    marginRight: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
