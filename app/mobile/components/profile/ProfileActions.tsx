import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { LogOut, Settings, Share2, Flag } from 'lucide-react-native';

interface ProfileActionsProps {
  isOwnProfile?: boolean;
  onSettingsPress?: () => void;
  onLogoutPress?: () => void;
  onSharePress?: () => void;
  onReportPress?: () => void;
}

export function ProfileActions({
  isOwnProfile = false,
  onSettingsPress,
  onLogoutPress,
  onSharePress,
  onReportPress,
}: ProfileActionsProps) {
  const handleLogout = () => {
    Alert.alert('Sair', 'Você tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: onLogoutPress,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {isOwnProfile ? (
        <>
          <TouchableOpacity style={styles.action} onPress={onSettingsPress}>
            <Settings size={20} color="#007AFF" />
            <Text style={styles.label}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={handleLogout}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={[styles.label, styles.dangerLabel]}>Sair</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.action} onPress={onSharePress}>
            <Share2 size={20} color="#007AFF" />
            <Text style={styles.label}>Compartilhar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={onReportPress}>
            <Flag size={20} color="#FF3B30" />
            <Text style={[styles.label, styles.dangerLabel]}>Denunciar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  action: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '500',
  },
  dangerLabel: {
    color: '#FF3B30',
  },
});
