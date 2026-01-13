import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StoryCircle } from './StoryCircle';

interface StoryUser {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  hasUnwatchedStory?: boolean;
}

interface StoryListProps {
  stories: StoryUser[];
  onStoryPress: (userId: string) => void;
  onAddStoryPress: () => void;
}

export function StoryList({
  stories,
  onStoryPress,
  onAddStoryPress,
}: StoryListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <StoryCircle
        id="my-story"
        name="Minha história"
        initials="+"
        isAddStory={true}
        onPress={onAddStoryPress}
      />

      {stories.map((story) => (
        <StoryCircle
          key={story.id}
          id={story.id}
          name={story.name}
          avatar={story.avatar}
          initials={story.initials}
          hasUnwatchedStory={story.hasUnwatchedStory}
          onPress={onStoryPress}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
