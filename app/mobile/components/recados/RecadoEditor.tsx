import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Input, Button } from '../ui';
import { Send } from 'lucide-react-native';

interface RecadoEditorProps {
  onSubmit: (content: string, category: string) => void;
  loading?: boolean;
}

const CATEGORIES = ['Diário', 'Depoimento', 'Conselho', 'Piada', 'Outro'];

export function RecadoEditor({ onSubmit, loading = false }: RecadoEditorProps) {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Diário');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, selectedCategory);
      setContent('');
      setSelectedCategory('Diário');
    }
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Deixar um recado</Text>

      <Input
        label="Categoria"
        value={selectedCategory}
        onChangeText={setSelectedCategory}
        editable={false}
      />

      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input
        label="Mensagem"
        placeholder="Deixe seu recado aqui..."
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={4}
      />

      <View style={styles.actions}>
        <Button
          label="Enviar"
          onPress={handleSubmit}
          disabled={!content.trim() || loading}
          style={styles.submitButton}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  actions: {
    marginTop: 12,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
