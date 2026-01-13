import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StoryCircle } from '@/app/mobile/components/stories/StoryCircle';
import { StoryViewer } from '@/app/mobile/components/stories/StoryViewer';

interface Story {
  id: string;
  userName: string;
  userImage?: string;
  storyImage?: string;
  content: string | { text: string; image?: string };
  timestamp: string;
  isViewed?: boolean;
  duration?: number;
}

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    userName: 'Your Story',
    content: { text: 'Add to your story' },
    timestamp: 'Now',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImage: 'https://i.pravatar.cc/150?img=1',
    content: 'https://picsum.photos/1080/1920?random=1',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    userName: 'Jane Smith',
    userImage: 'https://i.pravatar.cc/150?img=2',
    content: 'https://picsum.photos/1080/1920?random=2',
    timestamp: '5 hours ago',
    isViewed: true,
  },
  {
    id: '4',
    userName: 'Mike Johnson',
    userImage: 'https://i.pravatar.cc/150?img=3',
    content: { text: 'Check out my new project!' },
    timestamp: '1 day ago',
  },
  {
    id: '5',
    userName: 'Sarah Williams',
    userImage: 'https://i.pravatar.cc/150?img=4',
    content: 'https://picsum.photos/1080/1920?random=3',
    timestamp: '1 day ago',
    isViewed: true,
  },
];

export default function StoriesPage() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [viewingStoryIndex, setViewingStoryIndex] = useState(0);

  const handleStoryCirclePress = (id: string) => {
    if (id === '1') {
      // Your story - go to creation flow
      router.push('/stories/create');
    } else {
      // View other's story
      const index = MOCK_STORIES.findIndex((s) => s.id === id);
      setViewingStoryIndex(Math.max(0, index));
      setSelectedStoryId(id);
    }
  };

  const handleCloseViewer = () => {
    setSelectedStoryId(null);
  };

  const filteredStories = selectedStoryId
    ? MOCK_STORIES.filter((s) => s.id !== '1')
    : MOCK_STORIES;

  return (
    <SafeAreaView style={styles.container}>
      {selectedStoryId ? (
        <StoryViewer
          stories={filteredStories}
          initialIndex={viewingStoryIndex}
          onClose={handleCloseViewer}
        />
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Stories</Text>
            <Pressable
              style={styles.settingsButton}
              onPress={() => {
                // TODO: Navigate to settings
              }}
            >
              <MaterialIcons name="settings" size={24} color="#333333" />
            </Pressable>
          </View>

          {/* Stories List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}
          >
            {/* Horizontal Stories Carousel */}
            <View style={styles.storiesCarousel}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
              >
                {MOCK_STORIES.map((story) => (
                  <StoryCircle
                    key={story.id}
                    id={story.id}
                    userName={story.userName}
                    userImage={story.userImage}
                    storyImage={story.storyImage}
                    isViewed={story.isViewed}
                    onPress={handleStoryCirclePress}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Latest Stories Feed */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Latest</Text>

              {MOCK_STORIES.filter((s) => s.id !== '1').map((story, index) => (
                <Pressable
                  key={story.id}
                  style={styles.storyItem}
                  onPress={() => handleStoryCirclePress(story.id)}
                >
                  <View style={styles.storyItemContent}>
                    <View
                      style={[
                        styles.storyItemAvatar,
                        !story.isViewed && styles.storyItemAvatarNew,
                      ]}
                    >
                      {story.userImage && (
                        <Text style={styles.storyItemAvatarText}>
                          {story.userImage.charAt(0)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.storyItemInfo}>
                      <Text style={styles.storyItemName}>{story.userName}</Text>
                      <Text style={styles.storyItemTime}>
                        {story.timestamp}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="#CCCCCC"
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* FAB - Create Story */}
          <Pressable
            style={styles.fab}
            onPress={() => router.push('/stories/create')}
          >
            <MaterialIcons name="add" size={28} color="#FFFFFF" />
          </Pressable>
        </>
      )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  storiesCarousel: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  carouselContent: {
    paddingHorizontal: 8,
    gap: 8,
  },
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  storyItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  storyItemAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyItemAvatarNew: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  storyItemAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  storyItemInfo: {
    flex: 1,
  },
  storyItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  storyItemTime: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
