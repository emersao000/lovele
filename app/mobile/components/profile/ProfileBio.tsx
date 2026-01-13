import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui';
import { Calendar, MapPin, Link } from 'lucide-react-native';

interface ProfileBioProps {
  bio?: string;
  location?: string;
  website?: string;
  joinDate?: string;
  tags?: string[];
}

export function ProfileBio({
  bio,
  location,
  website,
  joinDate,
  tags,
}: ProfileBioProps) {
  return (
    <Card style={styles.card}>
      {bio && (
        <View style={styles.section}>
          <Text style={styles.bioText}>{bio}</Text>
        </View>
      )}

      <View style={styles.infoItems}>
        {location && (
          <View style={styles.infoItem}>
            <MapPin size={16} color="#666666" />
            <Text style={styles.infoText}>{location}</Text>
          </View>
        )}

        {website && (
          <View style={styles.infoItem}>
            <Link size={16} color="#007AFF" />
            <Text style={[styles.infoText, styles.linkText]}>{website}</Text>
          </View>
        )}

        {joinDate && (
          <View style={styles.infoItem}>
            <Calendar size={16} color="#666666" />
            <Text style={styles.infoText}>Entrou em {joinDate}</Text>
          </View>
        )}
      </View>

      {tags && tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  section: {
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  infoItems: {
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 8,
  },
  linkText: {
    color: '#007AFF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});
