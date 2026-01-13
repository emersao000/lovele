import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Send, Plus, Smile } from 'lucide-react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onAttachmentPress?: () => void;
  onEmojiPress?: () => void;
  placeholder?: string;
  loading?: boolean;
}

export function ChatInput({
  onSendMessage,
  onAttachmentPress,
  onEmojiPress,
  placeholder = 'Digite uma mensagem...',
  loading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onAttachmentPress}
          style={styles.iconButton}
          disabled={loading}
        >
          <Plus size={24} color="#007AFF" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={message}
          onChangeText={setMessage}
          multiline
          maxHeight={100}
          editable={!loading}
          placeholderTextColor="#999999"
        />

        <TouchableOpacity
          onPress={onEmojiPress}
          style={styles.iconButton}
          disabled={loading}
        >
          <Smile size={24} color="#FF9500" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSend}
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          disabled={!message.trim() || loading}
        >
          <Send size={20} color={message.trim() ? '#007AFF' : '#CCCCCC'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    color: '#000000',
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
