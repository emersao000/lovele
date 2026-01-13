import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { ArrowLeft, Settings, Bell } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
  onNotificationsPress?: () => void;
  showBack?: boolean;
  showSettings?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
}

export function Header({
  title,
  onBackPress,
  onSettingsPress,
  onNotificationsPress,
  showBack = false,
  showSettings = false,
  showNotifications = false,
  notificationCount = 0,
}: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
              <ArrowLeft size={24} color="#000000" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          {showNotifications && (
            <TouchableOpacity onPress={onNotificationsPress} style={styles.iconButton}>
              <View style={styles.notificationBadge}>
                <Bell size={24} color="#000000" />
                {notificationCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          {showSettings && (
            <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
              <Settings size={24} color="#000000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
