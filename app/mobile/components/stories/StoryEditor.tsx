import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Button, Card } from '../ui';
import { X, Camera } from 'lucide-react-native';

interface StoryEditorProps {
  onSubmit: (image: string) => void;
  onClose: () => void;
  loading?: boolean;
}

export function StoryEditor({
  onSubmit,
  onClose,
  loading = false,
}: StoryEditorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImage = () => {
    // This would normally open a camera/image picker
    // For now, we'll just show a placeholder
    setSelectedImage('https://via.placeholder.com/400x800');
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onSubmit(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <View style={styles.container}>
      {!selectedImage ? (
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleSelectImage}
          >
            <Camera size={48} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.emptyText}>Toque para adicionar uma foto</Text>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          label="Cancelar"
          onPress={onClose}
          variant="secondary"
          style={styles.actionButton}
        />
        <Button
          label="Compartilhar"
          onPress={handleSubmit}
          disabled={!selectedImage || loading}
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
  },
});
