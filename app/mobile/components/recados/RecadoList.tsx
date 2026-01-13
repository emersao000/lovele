import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { RecadoCard, type Recado } from './RecadoCard';
import { EmptyState } from '../shared';

interface RecadoListProps {
  recados: Recado[];
  loading?: boolean;
  onLoadMore?: () => void;
  onRecadoDelete?: (id: string) => void;
  onRecadoLike?: (id: string) => void;
}

export function RecadoList({
  recados,
  loading = false,
  onLoadMore,
  onRecadoDelete,
  onRecadoLike,
}: RecadoListProps) {
  if (!loading && recados.length === 0) {
    return (
      <EmptyState
        title="Nenhum recado"
        description="Seja o primeiro a deixar um recado!"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recados}
        renderItem={({ item }) => (
          <RecadoCard
            {...item}
            onDelete={() => onRecadoDelete?.(item.id)}
            onLike={() => onRecadoLike?.(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        onEndReached={onLoadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
