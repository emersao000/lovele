import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TextInputModalProps {
  visible: boolean;
  initialText?: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
}

export const TextInputModal: React.FC<TextInputModalProps> = ({
  visible,
  initialText = '',
  onSubmit,
  onClose,
}) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (visible) {
      setText(initialText);
    }
  }, [visible, initialText]);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Add Text to Story</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333333" />
            </Pressable>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Text Content</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your text here..."
              placeholderTextColor="#CCCCCC"
              value={text}
              onChangeText={setText}
              multiline
              maxLength={500}
              numberOfLines={5}
            />
            <Text style={styles.charCount}>{text.length}/500</Text>

            <View style={styles.tips}>
              <Text style={styles.tipsTitle}>Tips:</Text>
              <Text style={styles.tipItem}>• Keep text short and readable</Text>
              <Text style={styles.tipItem}>• Use contrast with background</Text>
              <Text style={styles.tipItem}>
                • Add multiple text layers for effect
              </Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.submitButton,
                !text.trim() && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!text.trim()}
            >
              <Text style={styles.submitButtonText}>Add Text</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333333',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    textAlign: 'right',
  },
  tips: {
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  tipsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#667eea',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
