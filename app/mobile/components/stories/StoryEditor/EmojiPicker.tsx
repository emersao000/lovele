import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface EmojiPickerProps {
  visible: boolean;
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

const EMOJI_CATEGORIES = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😚', '😙'],
  'Gestures': ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌', '🤞', '🫰', '🤟', '🤘', '🤙', '👍', '👎', '✊', '👊', '🤛', '🤜'],
  'Hearts': ['❤', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '💌'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔'],
  'Food': ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥑', '🍅', '🍆', '🥒', '🥬', '🥦', '🌶'],
  'Activities': ['🎈', '🎉', '🎊', '🎁', '🎗', '🏆', '🏅', '🥇', '🥈', '🥉', '⚽', '⚾', '🥎', '🎾', '🏐', '🏈', '🏉', '🥏', '🎳', '🎣'],
  'Travel': ['✈', '🚁', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚎', '🚐', '🚑', '🚒', '🚓'],
  'Objects': ['⌚', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥'],
};

interface Category {
  name: string;
  emojis: string[];
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  visible,
  onEmojiSelect,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = React.useState('Smileys');

  const categories: Category[] = Object.entries(EMOJI_CATEGORIES).map(
    ([name, emojis]) => ({ name, emojis })
  );

  const activeEmojis = EMOJI_CATEGORIES[
    activeCategory as keyof typeof EMOJI_CATEGORIES
  ] || [];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose an Emoji</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333333" />
          </Pressable>
        </View>

        {/* Emoji Grid */}
        <ScrollView style={styles.emojiGrid}>
          <View style={styles.emojiRow}>
            {activeEmojis.map((emoji, index) => (
              <Pressable
                key={index}
                style={styles.emojiButton}
                onPress={() => {
                  onEmojiSelect(emoji);
                  onClose();
                }}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
        >
          {categories.map((category) => (
            <Pressable
              key={category.name}
              style={[
                styles.categoryTab,
                activeCategory === category.name && styles.categoryTabActive,
              ]}
              onPress={() => setActiveCategory(category.name)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  activeCategory === category.name && styles.categoryTabTextActive,
                ]}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.confirmButton}
          onPress={onClose}
        >
          <Text style={styles.confirmButtonText}>Close</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
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
  emojiGrid: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emojiButton: {
    width: '19%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  emoji: {
    fontSize: 32,
  },
  categoryTabs: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingHorizontal: 8,
  },
  categoryTab: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  categoryTabActive: {
    borderBottomColor: '#667eea',
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
  },
  categoryTabTextActive: {
    color: '#667eea',
  },
  confirmButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  confirmButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
});
