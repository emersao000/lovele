import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome</Text>
          <Pressable
            onPress={() => {
              // TODO: Navigate to settings
            }}
          >
            <MaterialIcons name="settings" size={24} color="#333333" />
          </Pressable>
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <MaterialIcons name="photo-library" size={60} color="#FFFFFF" />
          <Text style={styles.heroTitle}>Story Editor</Text>
          <Text style={styles.heroSubtitle}>
            Create beautiful stories with text, stickers, and filters
          </Text>
        </LinearGradient>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureGrid}>
            <FeatureCard
              icon="edit"
              title="Text Editor"
              description="Add and style text with multiple fonts and colors"
            />
            <FeatureCard
              icon="emoji-emotions"
              title="Stickers"
              description="Decorate your story with fun emojis"
            />
            <FeatureCard
              icon="brush"
              title="Drawing"
              description="Draw freehand on your stories"
            />
            <FeatureCard
              icon="filter-alt"
              title="Filters"
              description="Apply beautiful filters to your images"
            />
            <FeatureCard
              icon="undo"
              title="Undo/Redo"
              description="Never worry about mistakes again"
            />
            <FeatureCard
              icon="share"
              title="Sharing"
              description="Control who sees your stories"
            />
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Pressable
            style={styles.ctaButton}
            onPress={() => router.push('/stories')}
          >
            <MaterialIcons name="add-circle" size={24} color="#FFFFFF" />
            <Text style={styles.ctaButtonText}>Create Your First Story</Text>
          </Pressable>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works</Text>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Choose or take a background image
            </Text>
          </View>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Add text, stickers, and drawings
            </Text>
          </View>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Preview and customize settings</Text>
          </View>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>Publish to your story</Text>
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable style={styles.fab} onPress={() => router.push('/stories')}>
        <MaterialIcons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <View style={styles.featureCard}>
    <View style={styles.featureIcon}>
      <MaterialIcons name={icon as any} size={32} color="#667eea" />
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
  },
  heroSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FFFFFF80',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '90%',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48.5%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
