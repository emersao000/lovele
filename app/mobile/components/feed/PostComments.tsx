import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar } from '../ui';
import { Heart, Reply } from 'lucide-react-native';

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  onLike?: () => void;
  onReply?: () => void;
}

interface PostCommentsProps {
  comments: Comment[];
  loading?: boolean;
  onLoadMore?: () => void;
}

function CommentItem({
  author,
  content,
  createdAt,
  likes,
  isLiked = false,
  onLike,
  onReply,
}: Comment) {
  return (
    <View style={styles.commentItem}>
      <Avatar
        source={author.avatar}
        initials={author.initials}
        size="sm"
      />
      
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.authorName}>{author.name}</Text>
          <Text style={styles.timestamp}>{createdAt}</Text>
        </View>
        
        <Text style={styles.commentText}>{content}</Text>
        
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <Heart
              size={14}
              color={isLiked ? '#FF3B30' : '#999999'}
              fill={isLiked ? '#FF3B30' : 'transparent'}
            />
            <Text style={styles.likeText}>{likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onReply}>
            <Reply size={14} color="#999999" />
            <Text style={styles.replyText}>Responder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function PostComments({
  comments,
  loading = false,
  onLoadMore,
}: PostCommentsProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.commentsTitle}>
        Comentários ({comments.length})
      </Text>
      
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem {...item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        onEndReached={onLoadMore}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
  },
  commentText: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 18,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  likeText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  replyText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
});
