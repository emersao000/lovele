import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface StoryData {
  id: string;
  backgroundImage?: string;
  textElements?: any[];
  stickerElements?: any[];
  duration?: number;
  privacy?: string;
}

export default function StoryPreviewPage() {
  const { storyData } = useLocalSearchParams();
  const [duration, setDuration] = useState(5);
  const [privacy, setPrivacy] = useState('friends');
  const [allowReplies, setAllowReplies] = useState(true);

  const story: StoryData = storyData
    ? JSON.parse(typeof storyData === 'string' ? storyData : JSON.stringify(storyData))
    : {};

  const handleBack = () => {
    router.back();
  };

  const handlePublish = async () => {
    // TODO: Save story to backend
    console.log('Publishing story:', {
      ...story,
      duration,
      privacy,
      allowReplies,
    });

    // Navigate back to stories
    router.replace('/stories');
  };

  const { width: screenWidth } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </Pressable>
        <Text style={styles.title}>Preview Story</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Story Preview */}
        <View style={styles.previewContainer}>
          <View style={styles.storyPreview}>
            {story.backgroundImage && (
              <Image
                source={{ uri: story.backgroundImage }}
                style={styles.previewImage}
              />
            )}
            <View style={styles.previewOverlay} />
            {/* TODO: Render text and sticker elements */}
            <Text style={styles.previewText}>Story Preview</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationButtons}>
            {[3, 5, 10].map((sec) => (
              <Pressable
                key={sec}
                style={[
                  styles.durationButton,
                  duration === sec && styles.durationButtonActive,
                ]}
                onPress={() => setDuration(sec)}
              >
                <Text
                  style={[
                    styles.durationButtonText,
                    duration === sec && styles.durationButtonTextActive,
                  ]}
                >
                  {sec}s
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who can view</Text>
          <View style={styles.privacyButtons}>
            {['everyone', 'friends', 'private'].map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.privacyButton,
                  privacy === option && styles.privacyButtonActive,
                ]}
                onPress={() => setPrivacy(option)}
              >
                <Text
                  style={[
                    styles.privacyButtonText,
                    privacy === option && styles.privacyButtonTextActive,
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Story Info</Text>
          <Text style={styles.infoText}>
            • Your story will be visible for 24 hours
          </Text>
          <Text style={styles.infoText}>
            • You can see who viewed your story
          </Text>
          <Text style={styles.infoText}>
            • Replies are {allowReplies ? 'enabled' : 'disabled'}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <MaterialIcons name="cloud-upload" size={20} color="#FFFFFF" />
          <Text style={styles.publishButtonText}>Publish</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 8,
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
  durationButtonTextActive: {
    color: '#FFFFFF',
  },
  privacyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  privacyButton: {
    flex: 1,
    paddingVertical: 8,
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
  privacyButtonTextActive: {
    color: '#FFFFFF',
  },
  infoSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFF9E6',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF9800',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#FF9800',
    lineHeight: 18,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  backButtonText: {
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
