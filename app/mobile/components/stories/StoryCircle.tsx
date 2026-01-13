import React from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface StoryCircleProps {
  id: string;
  userName: string;
  userImage?: string;
  storyImage?: string;
  isViewed?: boolean;
  onPress: (id: string) => void;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({
  id,
  userName,
  userImage,
  storyImage,
  isViewed = false,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={() => onPress(id)}>
      <View style={[styles.circle, !isViewed && styles.circleBorder]}>
        {storyImage ? (
          <Image source={{ uri: storyImage }} style={styles.image} />
        ) : userImage ? (
          <Image source={{ uri: userImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={24} color="#FFFFFF" />
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {userName}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#DDDDDD',
    marginBottom: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBorder: {
    borderWidth: 3,
    borderColor: '#667eea',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    color: '#333333',
    maxWidth: 70,
    textAlign: 'center',
  },
});
