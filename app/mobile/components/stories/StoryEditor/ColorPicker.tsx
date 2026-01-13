import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ColorPickerProps {
  visible: boolean;
  currentColor: string;
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  '#000000',
  '#FFFFFF',
  '#FF6B6B',
  '#FFA500',
  '#FFD93D',
  '#6BCB77',
  '#4D96FF',
  '#9D84B7',
  '#FF1493',
  '#00CED1',
  '#32CD32',
  '#FFB6C1',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  visible,
  currentColor,
  onColorSelect,
  onClose,
}) => {
  const [customColor, setCustomColor] = useState(currentColor);

  const handleColorSelect = (color: string) => {
    setCustomColor(color);
    onColorSelect(color);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Color</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333333" />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          {/* Custom Color Input */}
          <View style={styles.customColorSection}>
            <View
              style={[styles.colorPreview, { backgroundColor: customColor }]}
            />
            <TextInput
              style={styles.colorInput}
              placeholder="#000000"
              value={customColor}
              onChangeText={(text) => {
                setCustomColor(text);
                if (/^#[0-9A-F]{6}$/i.test(text)) {
                  onColorSelect(text);
                }
              }}
              placeholderTextColor="#999999"
            />
          </View>

          {/* Preset Colors Grid */}
          <Text style={styles.sectionTitle}>Preset Colors</Text>
          <View style={styles.colorGrid}>
            {PRESET_COLORS.map((color) => (
              <Pressable
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  currentColor === color && styles.selectedColorButton,
                ]}
                onPress={() => handleColorSelect(color)}
              >
                {currentColor === color && (
                  <MaterialIcons name="check" size={20} color="#FFFFFF" />
                )}
              </Pressable>
            ))}
          </View>

          {/* Gradient Colors */}
          <Text style={styles.sectionTitle}>Popular Gradients</Text>
          <View style={styles.gradientGrid}>
            {[
              ['#667eea', '#764ba2'],
              ['#f093fb', '#f5576c'],
              ['#4facfe', '#00f2fe'],
              ['#43e97b', '#38f9d7'],
              ['#fa709a', '#fee140'],
              ['#30cfd0', '#330867'],
            ].map((gradient, index) => (
              <Pressable
                key={index}
                style={[
                  styles.gradientButton,
                  {
                    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                  },
                ]}
                onPress={() => handleColorSelect(gradient[0])}
              />
            ))}
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
  customColorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  colorInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
    marginTop: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  colorButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColorButton: {
    borderColor: '#333333',
  },
  gradientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  gradientButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
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
