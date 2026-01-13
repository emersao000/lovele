import React from 'react';
import { View, StyleSheet, SafeAreaView, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StoryEditor } from '../StoryEditor';

interface EditorScreenProps {
  onCancel: () => void;
  onPreview: (story: any) => void;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({
  onCancel,
  onPreview,
}) => {
  return (
    <View style={styles.container}>
      <StoryEditor onStoryCreate={onPreview} onCancel={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
