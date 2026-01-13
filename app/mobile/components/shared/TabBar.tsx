import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Home, Heart, MessageCircle, Users, User } from 'lucide-react-native';

type TabName = 'home' | 'explore' | 'messages' | 'people' | 'profile';

interface TabBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

interface TabItem {
  name: TabName;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabItem[] = [
  { name: 'home', label: 'Home', icon: <Home size={24} /> },
  { name: 'explore', label: 'Explorar', icon: <Heart size={24} /> },
  { name: 'messages', label: 'Mensagens', icon: <MessageCircle size={24} /> },
  { name: 'people', label: 'Pessoas', icon: <Users size={24} /> },
  { name: 'profile', label: 'Perfil', icon: <User size={24} /> },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => onTabChange(tab.name)}
          >
            <View
              style={[
                styles.tabIcon,
                activeTab === tab.name && styles.tabIconActive,
              ]}
            >
              {React.cloneElement(tab.icon as React.ReactElement, {
                color: activeTab === tab.name ? '#007AFF' : '#999999',
                size: 24,
              })}
            </View>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.name && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 60,
    paddingVertical: 4,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#999999',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
