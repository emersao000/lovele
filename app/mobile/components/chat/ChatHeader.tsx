import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Avatar } from '../ui';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react-native';

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  initials?: string;
  isOnline?: boolean;
  onBackPress?: () => void;
  onCallPress?: () => void;
  onVideoPress?: () => void;
  onMorePress?: () => void;
}

export function ChatHeader({
  name,
  avatar,
  initials,
  isOnline = false,
  onBackPress,
  onCallPress,
  onVideoPress,
  onMorePress,
}: ChatHeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ArrowLeft size={24} color="#000000" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Avatar
              source={avatar}
              initials={initials}
              size="sm"
            />

            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.status}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity onPress={onCallPress} style={styles.actionButton}>
            <Phone size={20} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onVideoPress} style={styles.actionButton}>
            <Video size={20} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onMorePress} style={styles.actionButton}>
            <MoreVertical size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameContainer: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  status: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});
