import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Avatar } from '../ui';
import { Plus } from 'lucide-react-native';

interface StoryCircleProps {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  hasUnwatchedStory?: boolean;
  isAddStory?: boolean;
  onPress: (id: string) => void;
}

export function StoryCircle({
  id,
  name,
  avatar,
  initials,
  hasUnwatchedStory = false,
  isAddStory = false,
  onPress,
}: StoryCircleProps) {
  if (isAddStory) {
    return (
      <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
        <View style={styles.addStoryCircle}>
          <Plus size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.name}>Minha história</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View
        style={[
          styles.storyBorder,
          hasUnwatchedStory && styles.storyBorderActive,
        ]}
      >
        <Avatar source={avatar} initials={initials} size="lg" />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyBorder: {
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 999,
    padding: 2,
    marginBottom: 8,
  },
  storyBorderActive: {
    borderColor: '#007AFF',
  },
  addStoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
});
