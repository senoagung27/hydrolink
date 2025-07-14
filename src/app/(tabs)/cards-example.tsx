import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectableCard } from '../../components/SelectableCard';
import { ThemedView } from '../../components/ThemedView';
import { ThemedButton } from '../../components/ThemedButton';

export default function CardsExampleScreen() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleSelectCard = (title: string) => {
    setSelectedCard(title);
  };

  return (
    <ThemedView style={styles.container}>
      <SelectableCard
        title="Card 1"
        isSelected={selectedCard === 'Card 1'}
        onSelect={() => handleSelectCard('Card 1')}
      />
      <SelectableCard
        title="Card 2"
        isSelected={selectedCard === 'Card 2'}
        onSelect={() => handleSelectCard('Card 2')}
      />
      <SelectableCard
        title="Card 3"
        isSelected={selectedCard === 'Card 3'}
        onSelect={() => handleSelectCard('Card 3')}
      />
      <ThemedButton title="Klik" onPress={() => {}} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
});