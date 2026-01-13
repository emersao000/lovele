import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface FilterPickerProps {
  visible: boolean;
  currentFilter: string;
  filterIntensity: number;
  onFilterSelect: (filter: string) => void;
  onIntensityChange: (intensity: number) => void;
  onClose: () => void;
}

const FILTERS = [
  { id: 'none', name: 'None', icon: 'crop-original' },
  { id: 'blackwhite', name: 'B&W', icon: 'tonality' },
  { id: 'vintage', name: 'Vintage', icon: 'filter-frames' },
  { id: 'sepia', name: 'Sepia', icon: 'photo' },
  { id: 'cool', name: 'Cool', icon: 'snowflake' },
  { id: 'warm', name: 'Warm', icon: 'wb-sunny' },
];

export const FilterPicker: React.FC<FilterPickerProps> = ({
  visible,
  currentFilter,
  filterIntensity,
  onFilterSelect,
  onIntensityChange,
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
          <Text style={styles.title}>Filters</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333333" />
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          {/* Filter Selection Grid */}
          <View style={styles.filterGrid}>
            {FILTERS.map((filter) => (
              <Pressable
                key={filter.id}
                style={[
                  styles.filterButton,
                  currentFilter === filter.id && styles.filterButtonActive,
                ]}
                onPress={() => onFilterSelect(filter.id)}
              >
                <View
                  style={[
                    styles.filterPreview,
                    {
                      backgroundColor:
                        filter.id === 'cool'
                          ? '#4DD0E1'
                          : filter.id === 'warm'
                            ? '#FFB74D'
                            : filter.id === 'blackwhite'
                              ? '#999999'
                              : filter.id === 'sepia'
                                ? '#CD853F'
                                : filter.id === 'vintage'
                                  ? '#FF8A65'
                                  : '#CCCCCC',
                    },
                  ]}
                />
                <Text style={styles.filterName}>{filter.name}</Text>
                {currentFilter === filter.id && (
                  <View style={styles.checkmark}>
                    <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Intensity Control */}
          {currentFilter !== 'none' && (
            <>
              <Text style={styles.sectionTitle}>
                Intensity: {Math.round(filterIntensity * 100)}%
              </Text>
              <View style={styles.sliderContainer}>
                <MaterialIcons name="remove" size={20} color="#999999" />
                <View style={styles.sliderTrack}>
                  <View
                    style={[
                      styles.sliderFill,
                      { width: `${filterIntensity * 100}%` },
                    ]}
                  />
                </View>
                <MaterialIcons name="add" size={20} color="#999999" />
              </View>

              <View style={styles.intensityButtons}>
                <Pressable
                  style={styles.intensityButton}
                  onPress={() =>
                    onIntensityChange(Math.max(0, filterIntensity - 0.1))
                  }
                >
                  <Text style={styles.intensityButtonText}>-</Text>
                </Pressable>
                <View style={styles.intensityDisplay}>
                  <Text style={styles.intensityValue}>
                    {Math.round(filterIntensity * 100)}
                  </Text>
                </View>
                <Pressable
                  style={styles.intensityButton}
                  onPress={() =>
                    onIntensityChange(Math.min(1, filterIntensity + 0.1))
                  }
                >
                  <Text style={styles.intensityButtonText}>+</Text>
                </Pressable>
              </View>
            </>
          )}

          {/* Filter Descriptions */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Filter Guide</Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>None:</Text> Original image
            </Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>B&W:</Text> Black and white
            </Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Vintage:</Text> Retro/nostalgic feel
            </Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Sepia:</Text> Warm brown tones
            </Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Cool:</Text> Blue tones
            </Text>
            <Text style={styles.description}>
              <Text style={styles.bold}>Warm:</Text> Orange/yellow tones
            </Text>
          </View>
        </ScrollView>

        <Pressable
          style={styles.confirmButton}
          onPress={onClose}
        >
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
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#EEEEEE',
  },
  filterButtonActive: {
    borderColor: '#667eea',
    backgroundColor: '#F0F3FF',
  },
  filterPreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
    marginTop: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  intensityButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  intensityButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intensityButtonText: {
    fontSize: 24,
    color: '#333333',
  },
  intensityDisplay: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intensityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '600',
    color: '#333333',
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
