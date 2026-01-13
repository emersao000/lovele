import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImagePickerAssets from 'expo-image-picker';

interface MediaPickerProps {
  visible: boolean;
  onImageSelect: (image: ImagePickerAssets.ImagePickerAsset) => void;
  onClose: () => void;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  visible,
  onImageSelect,
  onClose,
}) => {
  const [loading, setLoading] = React.useState(false);

  const pickFromGallery = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelect(result.assets[0]);
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pickFromCamera = async () => {
    try {
      setLoading(true);
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permission',
          'Camera permission is required to take a photo'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelect(result.assets[0]);
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    } finally {
      setLoading(false);
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
        <View style={styles.header}>
          <Text style={styles.title}>Select Background Image</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333333" />
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#667eea" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <ScrollView style={styles.content}>
            {/* Gallery Option */}
            <Pressable
              style={styles.optionButton}
              onPress={pickFromGallery}
            >
              <View style={styles.optionIconContainer}>
                <MaterialIcons name="image" size={48} color="#FFFFFF" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Gallery</Text>
                <Text style={styles.optionDescription}>
                  Choose a photo from your device
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#999999" />
            </Pressable>

            {/* Camera Option */}
            <Pressable
              style={styles.optionButton}
              onPress={pickFromCamera}
            >
              <View style={styles.optionIconContainer}>
                <MaterialIcons name="photo-camera" size={48} color="#FFFFFF" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Camera</Text>
                <Text style={styles.optionDescription}>
                  Take a new photo with your camera
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#999999" />
            </Pressable>

            {/* Color Background Option */}
            <Pressable
              style={styles.optionButton}
              onPress={onClose}
            >
              <View style={styles.optionIconContainer}>
                <MaterialIcons name="palette" size={48} color="#FFFFFF" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Color Background</Text>
                <Text style={styles.optionDescription}>
                  Use a solid color background
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#999999" />
            </Pressable>

            {/* Tips Section */}
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tips for Best Results</Text>
              <Text style={styles.tipItem}>
                • Use high-quality images (1080x1920 or larger)
              </Text>
              <Text style={styles.tipItem}>
                • Portrait orientation (9:16) works best for stories
              </Text>
              <Text style={styles.tipItem}>
                • Add filters to enhance your background
              </Text>
              <Text style={styles.tipItem}>
                • Use simple backgrounds to make text stand out
              </Text>
            </View>
          </ScrollView>
        )}

        <Pressable
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Close</Text>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  optionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#999999',
  },
  tipsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE680',
    marginTop: 24,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 12,
    color: '#FF9800',
    lineHeight: 18,
    marginBottom: 8,
  },
  closeButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  closeButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
});
