import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button } from '../ui';
import { MessageCircle, UserPlus } from 'lucide-react-native';

interface ProfileHeaderProps {
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  initials?: string;
  coverImage?: string;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onMessagePress?: () => void;
  onFollowPress?: () => void;
  onEditPress?: () => void;
}

export function ProfileHeader({
  name,
  username,
  bio,
  avatar,
  initials,
  coverImage,
  isOwnProfile = false,
  isFollowing = false,
  onMessagePress,
  onFollowPress,
  onEditPress,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Cover Image */}
      {coverImage && (
        <Image
          source={{ uri: coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      )}
      <View style={[styles.coverPlaceholder, !coverImage && styles.coverDefault]} />

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Avatar
          source={avatar}
          initials={initials}
          size="xl"
        />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
        {bio && <Text style={styles.bio}>{bio}</Text>}
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {isOwnProfile ? (
          <Button
            label="Editar Perfil"
            onPress={onEditPress || (() => {})}
            variant="secondary"
            style={styles.fullButton}
          />
        ) : (
          <View style={styles.actionButtons}>
            <Button
              label={isFollowing ? 'Seguindo' : 'Seguir'}
              onPress={onFollowPress || (() => {})}
              variant={isFollowing ? 'secondary' : 'primary'}
              size="md"
              style={styles.actionButton}
            />
            <TouchableOpacity style={styles.iconButton} onPress={onMessagePress}>
              <MessageCircle size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: 150,
  },
  coverPlaceholder: {
    width: '100%',
    height: 150,
  },
  coverDefault: {
    backgroundColor: '#E5E5EA',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -48,
    marginBottom: 12,
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  bio: {
    fontSize: 13,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 18,
  },
  actionsContainer: {
    paddingHorizontal: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
  },
  fullButton: {
    width: '100%',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
