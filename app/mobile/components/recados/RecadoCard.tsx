import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Avatar } from '../ui';
import { Trash2, MoreVertical, Heart } from 'lucide-react-native';

export interface Recado {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  };
  content: string;
  createdAt: string;
  category?: string;
  isLiked?: boolean;
  likes?: number;
  onDelete?: () => void;
  onLike?: () => void;
  onMore?: () => void;
}

export function RecadoCard({
  id,
  author,
  content,
  createdAt,
  category,
  isLiked = false,
  likes = 0,
  onDelete,
  onLike,
  onMore,
}: Recado) {
  return (
    <Card style={styles.card} variant="outlined">
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Avatar source={author.avatar} initials={author.initials} size="sm" />
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>{author.name}</Text>
            <Text style={styles.timestamp}>{createdAt}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onMore}>
          <MoreVertical size={16} color="#999999" />
        </TouchableOpacity>
      </View>

      {category && (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}

      <Text style={styles.content}>{content}</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.action} onPress={onLike}>
          <Heart
            size={16}
            color={isLiked ? '#FF3B30' : '#999999'}
            fill={isLiked ? '#FF3B30' : 'transparent'}
          />
          <Text style={[styles.actionText, isLiked && styles.actionTextActive]}>
            {likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onDelete}>
          <Trash2 size={16} color="#FF3B30" />
          <Text style={styles.deleteText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorDetails: {
    marginLeft: 8,
    flex: 1,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F2',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
  content: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
    fontWeight: '500',
  },
  actionTextActive: {
    color: '#FF3B30',
  },
  deleteText: {
    fontSize: 12,
    color: '#FF3B30',
    marginLeft: 4,
    fontWeight: '500',
  },
});
