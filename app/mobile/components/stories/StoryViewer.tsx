import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar } from '../ui';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';

export interface Story {
  id: string;
  image: string;
  duration?: number;
}

interface StoryViewerProps {
  author: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  stories: Story[];
  initialIndex?: number;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function StoryViewer({
  author,
  stories,
  initialIndex = 0,
  onClose,
  onPrevious,
  onNext,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];
  const storyDuration = currentStory?.duration || 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
            onNext?.();
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, storyDuration, stories.length, onClose, onNext]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
      onPrevious?.();
    } else {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
      onNext?.();
    } else {
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bars */}
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              {
                opacity: index < currentIndex ? 1 : index === currentIndex ? 1 : 0.3,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Avatar
            source={author.avatar}
            initials={author.initials}
            size="sm"
          />
          <Text style={styles.authorName}>{author.name}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image
        source={{ uri: currentStory?.image }}
        style={styles.storyImage}
        resizeMode="cover"
      />

      {/* Navigation */}
      <TouchableOpacity
        style={[styles.navButton, styles.prevButton]}
        onPress={handlePrevious}
      >
        <ChevronLeft size={32} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.nextButton]}
        onPress={handleNext}
      >
        <ChevronRight size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Story Counter */}
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {stories.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  progressContainer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 8,
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
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
    paddingVertical: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  storyImage: {
    flex: 1,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
  },
  prevButton: {
    left: 12,
  },
  nextButton: {
    right: 12,
  },
  counter: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
