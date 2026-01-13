import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../ui';
import { ChevronRight } from 'lucide-react-native';

export interface ChatItem {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    initials?: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  onPress?: () => void;
}

export function ChatListItem({
  id,
  user,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline = false,
  onPress,
}: ChatItem) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Avatar
          source={user.avatar}
          initials={user.initials}
          size="md"
        />
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.message} numberOfLines={1}>
            {lastMessage}
          </Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      <ChevronRight size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 13,
    color: '#666666',
    flex: 1,
  },
  badge: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
