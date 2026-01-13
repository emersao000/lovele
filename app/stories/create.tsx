import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { MediaSelector } from '@/app/mobile/components/stories/StoryCreationFlow/MediaSelector';
import { EditorScreen } from '@/app/mobile/components/stories/StoryCreationFlow/EditorScreen';
import { PreviewScreen } from '@/app/mobile/components/stories/StoryCreationFlow/PreviewScreen';
import { useStoryEditorStore } from '@/stores/storyEditorStore';
import * as ImagePicker from 'expo-image-picker';

type CreateStep = 'media' | 'editor' | 'preview';

export default function CreateStoryPage() {
  const [currentStep, setCurrentStep] = useState<CreateStep>('media');
  const [selectedMedia, setSelectedMedia] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { resetEditor } = useStoryEditorStore();

  const handleMediaSelect = (image: ImagePicker.ImagePickerAsset) => {
    setSelectedMedia(image);
    setCurrentStep('editor');
  };

  const handleEditorBack = () => {
    setCurrentStep('media');
  };

  const handleEditorPreview = (story: any) => {
    setCurrentStep('preview');
  };

  const handlePreviewBack = () => {
    setCurrentStep('editor');
  };

  const handlePublish = async (story: any) => {
    // TODO: Save story to database
    console.log('Publishing story:', story);
    
    // Reset editor
    resetEditor();
    
    // Navigate back to stories list
    router.replace('/stories');
  };

  const handleCancel = () => {
    resetEditor();
    router.back();
  };

  return (
    <View style={styles.container}>
      {currentStep === 'media' && (
        <MediaSelector
          onMediaSelect={handleMediaSelect}
          onCancel={handleCancel}
        />
      )}

      {currentStep === 'editor' && (
        <EditorScreen
          onCancel={handleEditorBack}
          onPreview={handleEditorPreview}
        />
      )}

      {currentStep === 'preview' && (
        <PreviewScreen
          story={{ backgroundImage: selectedMedia }}
          onBack={handlePreviewBack}
          onPublish={handlePublish}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
