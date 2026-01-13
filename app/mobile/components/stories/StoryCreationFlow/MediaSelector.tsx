import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface MediaSelectorProps {
  onMediaSelect: (image: ImagePicker.ImagePickerAsset) => void;
  onCancel: () => void;
}

export const MediaSelector: React.FC<MediaSelectorProps> = ({
  onMediaSelect,
  onCancel,
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
        onMediaSelect(result.assets[0]);
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
          'Camera permission is required to take a photo',
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
        onMediaSelect(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const skipMedia = () => {
    // Create a default image asset
    onMediaSelect({
      assetId: null,
      base64: null,
      duration: 0,
      exif: null,
      fileName: 'default',
      height: 1920,
      mimeType: 'image/jpeg',
      type: 'image',
      uri: '',
      width: 1080,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancel}>
          <MaterialIcons name="arrow-back" size={24} color="#333333" />
        </Pressable>
        <Text style={styles.title}>Create Story</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <MaterialIcons name="image-search" size={80} color="#667eea" />
          </View>

          <Text style={styles.subtitle}>Choose Your Background</Text>
          <Text style={styles.description}>
            Start by selecting a photo from your gallery or take a new one with
            your camera
          </Text>

          <View style={styles.optionsContainer}>
            <Pressable style={styles.option} onPress={pickFromGallery}>
              <View style={styles.optionIcon}>
                <MaterialIcons name="photo-library" size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.optionText}>From Gallery</Text>
            </Pressable>

            <Pressable style={styles.option} onPress={pickFromCamera}>
              <View style={styles.optionIcon}>
                <MaterialIcons name="photo-camera" size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.optionText}>Take Photo</Text>
            </Pressable>
          </View>

          <Pressable style={styles.skipButton} onPress={skipMedia}>
            <Text style={styles.skipButtonText}>Or start with blank</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    width: '100%',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  optionIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
});
