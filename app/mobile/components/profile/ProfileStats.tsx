import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Stat {
  label: string;
  value: number | string;
  onPress?: () => void;
}

interface ProfileStatsProps {
  stats: Stat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <TouchableOpacity
          key={index}
          style={styles.statItem}
          onPress={stat.onPress}
        >
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  statItem: {
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});
