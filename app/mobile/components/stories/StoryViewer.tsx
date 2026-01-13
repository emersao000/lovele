import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Story {
  id: string;
  userName: string;
  userImage?: string;
  content: string | { text: string; image?: string };
  timestamp: string;
  duration?: number;
}

interface StoryViewerProps {
  stories: Story[];
  initialIndex?: number;
  onClose: () => void;
  onReply?: (storyId: string, message: string) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialIndex = 0,
  onClose,
  onReply,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const currentStory = stories[currentIndex];
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  useEffect(() => {
    const duration = currentStory?.duration || 5;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (1 / (duration * 1000)) * 100;
        if (newProgress >= 100) {
          // Move to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setProgress(0);
          } else {
            onClose();
          }
          return 0;
        }
        return newProgress;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [currentIndex, stories.length, onClose, currentStory?.duration]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  if (!currentStory) {
    return null;
  }

  const isImage = typeof currentStory.content === 'string';

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundContainer}>
        {isImage ? (
          <Image
            source={{ uri: currentStory.content }}
            style={styles.backgroundImage}
          />
        ) : (
          <View
            style={[styles.backgroundImage, { backgroundColor: '#667eea' }]}
          />
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              {
                backgroundColor:
                  index < currentIndex
                    ? '#FFFFFF'
                    : index === currentIndex
                      ? '#FFFFFF'
                      : '#FFFFFF80',
                width: `${100 / stories.length}%`,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width:
                    index < currentIndex
                      ? '100%'
                      : index === currentIndex
                        ? `${progress}%`
                        : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {currentStory.userImage && (
            <Image
              source={{ uri: currentStory.userImage }}
              style={styles.userImage}
            />
          )}
          <View style={styles.userText}>
            <Text style={styles.userName}>{currentStory.userName}</Text>
            <Text style={styles.timestamp}>{currentStory.timestamp}</Text>
          </View>
        </View>
        <Pressable onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {!isImage && typeof currentStory.content === 'object' && (
          <View style={styles.textContent}>
            <Text style={styles.storyText}>{currentStory.content.text}</Text>
          </View>
        )}
      </View>

      {/* Navigation Gestures */}
      <Pressable
        style={[styles.gestureArea, { left: 0 }]}
        onPress={handlePrevious}
      />
      <Pressable
        style={[styles.gestureArea, { right: 0 }]}
        onPress={handleNext}
      />

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <Pressable
          style={styles.replyButton}
          onPress={() => {
            // TODO: Show reply modal
          }}
        >
          <MaterialIcons name="reply" size={20} color="#FFFFFF" />
          <Text style={styles.replyButtonText}>Reply</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#FFFFFF80',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
  userText: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#FFFFFF80',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  storyText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: '#00000080',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gestureArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '30%',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  replyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  replyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
