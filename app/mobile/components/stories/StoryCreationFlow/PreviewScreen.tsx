import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface PreviewScreenProps {
  story: any;
  onBack: () => void;
  onPublish: (story: any) => void;
}

export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  story,
  onBack,
  onPublish,
}) => {
  const [duration, setDuration] = useState(story?.duration || 5);
  const [privacy, setPrivacy] = useState(story?.privacy || 'friends');
  const [allowReplies, setAllowReplies] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const handlePublish = () => {
    onPublish({
      ...story,
      duration,
      privacy,
      allowReplies,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </Pressable>
        <Text style={styles.title}>Preview Story</Text>
        <Pressable onPress={() => setShowOptions(!showOptions)}>
          <MaterialIcons name="more-vert" size={24} color="#333333" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Story Preview */}
        <View style={styles.previewContainer}>
          <View style={styles.storyPreview}>
            {story?.backgroundImage?.uri && (
              <Image
                source={{ uri: story.backgroundImage.uri }}
                style={styles.previewImage}
              />
            )}
            <View style={styles.previewOverlay} />
            <Text style={styles.previewText}>Story Preview</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Settings</Text>

          {/* Duration */}
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialIcons name="schedule" size={20} color="#667eea" />
              <Text style={styles.settingName}>Duration</Text>
            </View>
            <View style={styles.durationButtons}>
              <Pressable
                style={[
                  styles.durationButton,
                  duration === 3 && styles.durationButtonActive,
                ]}
                onPress={() => setDuration(3)}
              >
                <Text style={styles.durationButtonText}>3s</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.durationButton,
                  duration === 5 && styles.durationButtonActive,
                ]}
                onPress={() => setDuration(5)}
              >
                <Text style={styles.durationButtonText}>5s</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.durationButton,
                  duration === 10 && styles.durationButtonActive,
                ]}
                onPress={() => setDuration(10)}
              >
                <Text style={styles.durationButtonText}>10s</Text>
              </Pressable>
            </View>
          </View>

          {/* Privacy */}
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialIcons name="lock" size={20} color="#667eea" />
              <Text style={styles.settingName}>Who can view</Text>
            </View>
            <View style={styles.privacyOptions}>
              <Pressable
                style={[
                  styles.privacyButton,
                  privacy === 'everyone' && styles.privacyButtonActive,
                ]}
                onPress={() => setPrivacy('everyone')}
              >
                <Text style={styles.privacyButtonText}>Everyone</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.privacyButton,
                  privacy === 'friends' && styles.privacyButtonActive,
                ]}
                onPress={() => setPrivacy('friends')}
              >
                <Text style={styles.privacyButtonText}>Friends</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.privacyButton,
                  privacy === 'private' && styles.privacyButtonActive,
                ]}
                onPress={() => setPrivacy('private')}
              >
                <Text style={styles.privacyButtonText}>Private</Text>
              </Pressable>
            </View>
          </View>

          {/* Allow Replies */}
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <MaterialIcons name="chat" size={20} color="#667eea" />
              <Text style={styles.settingName}>Allow replies</Text>
            </View>
            <Switch
              value={allowReplies}
              onValueChange={setAllowReplies}
              trackColor={{ false: '#DDDDDD', true: '#667eea' }}
            />
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Story Info</Text>
          <View style={styles.infoItem}>
            <MaterialIcons name="info" size={20} color="#FF9800" />
            <Text style={styles.infoText}>
              Your story will be visible for 24 hours
            </Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="history" size={20} color="#FF9800" />
            <Text style={styles.infoText}>
              You can see who viewed your story
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <Pressable style={styles.cancelButton} onPress={onBack}>
          <Text style={styles.cancelButtonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.publishButton} onPress={handlePublish}>
          <MaterialIcons name="upload" size={20} color="#FFFFFF" />
          <Text style={styles.publishButtonText}>Publish Story</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  content: {
    flex: 1,
  },
  previewContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  storyPreview: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  previewText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  settingItem: {
    marginBottom: 16,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  settingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
  durationButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  durationButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  privacyButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
  privacyButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  privacyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFF9E6',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#FF9800',
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  publishButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  publishButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
