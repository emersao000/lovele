import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StoryViewer } from '@/app/mobile/components/stories/StoryViewer';

interface Story {
  id: string;
  userName: string;
  userImage?: string;
  content: string | { text: string; image?: string };
  timestamp: string;
  isViewed?: boolean;
  duration?: number;
}

// Mock data - in a real app, this would come from a database
const MOCK_STORIES: Story[] = [
  {
    id: '1',
    userName: 'John Doe',
    userImage: 'https://i.pravatar.cc/150?img=1',
    content: 'https://picsum.photos/1080/1920?random=1',
    timestamp: '2 hours ago',
    duration: 5,
  },
  {
    id: '2',
    userName: 'Jane Smith',
    userImage: 'https://i.pravatar.cc/150?img=2',
    content: 'https://picsum.photos/1080/1920?random=2',
    timestamp: '5 hours ago',
    duration: 5,
  },
  {
    id: '3',
    userName: 'Mike Johnson',
    userImage: 'https://i.pravatar.cc/150?img=3',
    content: { text: 'Check out my new project!' },
    timestamp: '1 day ago',
    duration: 5,
  },
];

export default function StoryViewerPage() {
  const { userId } = useLocalSearchParams();

  const handleClose = () => {
    router.back();
  };

  const handleReply = (storyId: string, message: string) => {
    // TODO: Send reply to story
    console.log(`Reply to story ${storyId}: ${message}`);
  };

  // Find the index of the story to view
  const initialIndex = userId
    ? MOCK_STORIES.findIndex((s) => s.id === userId)
    : 0;

  return (
    <View style={styles.container}>
      <StoryViewer
        stories={MOCK_STORIES}
        initialIndex={Math.max(0, initialIndex)}
        onClose={handleClose}
        onReply={handleReply}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
