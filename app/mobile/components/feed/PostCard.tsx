import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Avatar } from '../ui';
import { MessageCircle, Heart, Share2, MoreVertical } from 'lucide-react-native';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  onMorePress?: () => void;
}

export function PostCard({
  id,
  author,
  content,
  image,
  createdAt,
  likes,
  comments,
  shares,
  isLiked = false,
  onLikePress,
  onCommentPress,
  onSharePress,
  onMorePress,
}: Post) {
  return (
    <Card style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Avatar
            source={author.avatar}
            initials={author.initials}
            size="md"
          />
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>{author.name}</Text>
            <Text style={styles.timestamp}>{createdAt}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
          <MoreVertical size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text style={styles.content}>{content}</Text>

      {/* Image */}
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>{likes} curtidas</Text>
        <Text style={styles.statsText}>{comments} comentários</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onLikePress}>
          <Heart
            size={20}
            color={isLiked ? '#FF3B30' : '#666666'}
            fill={isLiked ? '#FF3B30' : 'transparent'}
          />
          <Text style={[styles.actionLabel, isLiked && styles.actionLabelActive]}>
            Curtir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onCommentPress}>
          <MessageCircle size={20} color="#666666" />
          <Text style={styles.actionLabel}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onSharePress}>
          <Share2 size={20} color="#666666" />
          <Text style={styles.actionLabel}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorDetails: {
    marginLeft: 12,
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  content: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
    marginVertical: 12,
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  statsText: {
    fontSize: 12,
    color: '#666666',
    marginRight: 20,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 6,
    fontWeight: '500',
  },
  actionLabelActive: {
    color: '#FF3B30',
  },
});
