import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Check, CheckCheck } from 'lucide-react-native';

export interface Message {
  id: string;
  content: string;
  image?: string;
  isOwn: boolean;
  timestamp: string;
  isRead?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export function MessageBubble({
  id,
  content,
  image,
  isOwn,
  timestamp,
  isRead = false,
  status = 'delivered',
}: Message) {
  return (
    <View style={[styles.container, isOwn && styles.containerOwn]}>
      <View
        style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.text, isOwn && styles.textOwn]}>{content}</Text>
      </View>

      <View style={[styles.footer, isOwn && styles.footerOwn]}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        {isOwn && (
          <View style={styles.statusIcon}>
            {status === 'sending' && (
              <Text style={styles.sendingText}>Enviando...</Text>
            )}
            {status === 'sent' && <Check size={12} color="#999999" />}
            {(status === 'delivered' || status === 'read') && (
              <CheckCheck
                size={12}
                color={status === 'read' ? '#007AFF' : '#999999'}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4,
    marginHorizontal: 12,
  },
  containerOwn: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  bubbleOwn: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  textOwn: {
    color: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  footerOwn: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 11,
    color: '#999999',
  },
  statusIcon: {
    marginTop: 2,
  },
  sendingText: {
    fontSize: 10,
    color: '#999999',
  },
});
