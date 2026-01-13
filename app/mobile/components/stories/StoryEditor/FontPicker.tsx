import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FontPickerProps {
  visible: boolean;
  currentFont: string;
  currentFontSize: number;
  currentTextAlign: 'left' | 'center' | 'right';
  onFontSelect: (font: string) => void;
  onFontSizeChange: (size: number) => void;
  onTextAlignChange: (align: 'left' | 'center' | 'right') => void;
  onClose: () => void;
}

const FONTS = [
  { id: 'system', name: 'System', family: 'System' },
  { id: 'monospace', name: 'Monospace', family: 'Courier New' },
  { id: 'serif', name: 'Serif', family: 'Georgia' },
];

export const FontPicker: React.FC<FontPickerProps> = ({
  visible,
  currentFont,
  currentFontSize,
  currentTextAlign,
  onFontSelect,
  onFontSizeChange,
  onTextAlignChange,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Text Formatting</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333333" />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          {/* Font Selection */}
          <Text style={styles.sectionTitle}>Font Family</Text>
          <View style={styles.fontList}>
            {FONTS.map((font) => (
              <Pressable
                key={font.id}
                style={[
                  styles.fontButton,
                  currentFont === font.id && styles.fontButtonActive,
                ]}
                onPress={() => onFontSelect(font.id)}
              >
                <Text
                  style={[
                    styles.fontButtonText,
                    { fontFamily: font.family },
                    currentFont === font.id && styles.fontButtonTextActive,
                  ]}
                >
                  {font.name}
                </Text>
                {currentFont === font.id && (
                  <MaterialIcons name="check" size={20} color="#667eea" />
                )}
              </Pressable>
            ))}
          </View>

          {/* Font Size Slider */}
          <Text style={styles.sectionTitle}>
            Font Size: {currentFontSize}px
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>12</Text>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  {
                    width: `${((currentFontSize - 12) / (64 - 12)) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.sliderLabel}>64</Text>
          </View>
          <View style={styles.fontSizeButtons}>
            <Pressable
              style={styles.decreaseButton}
              onPress={() =>
                onFontSizeChange(Math.max(12, currentFontSize - 4))
              }
            >
              <MaterialIcons name="remove" size={20} color="#FFFFFF" />
            </Pressable>
            <TextInput
              style={styles.fontSizeInput}
              value={String(currentFontSize)}
              onChangeText={(text) => {
                const size = parseInt(text) || 32;
                onFontSizeChange(Math.max(12, Math.min(64, size)));
              }}
              keyboardType="number-pad"
            />
            <Pressable
              style={styles.increaseButton}
              onPress={() =>
                onFontSizeChange(Math.min(64, currentFontSize + 4))
              }
            >
              <MaterialIcons name="add" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Text Alignment */}
          <Text style={styles.sectionTitle}>Text Alignment</Text>
          <View style={styles.alignmentButtons}>
            <Pressable
              style={[
                styles.alignButton,
                currentTextAlign === 'left' && styles.alignButtonActive,
              ]}
              onPress={() => onTextAlignChange('left')}
            >
              <MaterialIcons
                name="format-align-left"
                size={24}
                color={currentTextAlign === 'left' ? '#667eea' : '#999999'}
              />
            </Pressable>
            <Pressable
              style={[
                styles.alignButton,
                currentTextAlign === 'center' && styles.alignButtonActive,
              ]}
              onPress={() => onTextAlignChange('center')}
            >
              <MaterialIcons
                name="format-align-center"
                size={24}
                color={currentTextAlign === 'center' ? '#667eea' : '#999999'}
              />
            </Pressable>
            <Pressable
              style={[
                styles.alignButton,
                currentTextAlign === 'right' && styles.alignButtonActive,
              ]}
              onPress={() => onTextAlignChange('right')}
            >
              <MaterialIcons
                name="format-align-right"
                size={24}
                color={currentTextAlign === 'right' ? '#667eea' : '#999999'}
              />
            </Pressable>
          </View>

          {/* Preview */}
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewBox}>
            <Text
              style={{
                fontSize: currentFontSize,
                textAlign: currentTextAlign,
                color: '#333333',
              }}
            >
              Sample Text
            </Text>
          </View>
        </ScrollView>

        <Pressable style={styles.confirmButton} onPress={onClose}>
          <Text style={styles.confirmButtonText}>Done</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
    marginTop: 16,
  },
  fontList: {
    gap: 8,
    marginBottom: 16,
  },
  fontButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fontButtonActive: {
    backgroundColor: '#F0F3FF',
    borderColor: '#667eea',
  },
  fontButtonText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  fontButtonTextActive: {
    color: '#667eea',
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666666',
    minWidth: 30,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  fontSizeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  decreaseButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  increaseButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSizeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  alignButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignButtonActive: {
    borderColor: '#667eea',
    backgroundColor: '#F0F3FF',
  },
  previewBox: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    minHeight: 100,
    justifyContent: 'center',
  },
  confirmButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#667eea',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
