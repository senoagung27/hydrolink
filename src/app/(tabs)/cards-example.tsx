import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { SelectableCard } from '../../components/SelectableCard';
import { ThemedView } from '../../components/ThemedView';
import { ThemedButton } from '../../components/ThemedButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function CardsExampleScreen() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 1. Buat ref untuk TextInput nama
  const nameInputRef = useRef<TextInput>(null);

  // 2. Gunakan useEffect untuk memfokuskan input saat komponen dimuat
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSelectCard = (title: string) => {
    setSelectedCard(title);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Text>Name: </Text>
        <TextInput
          // 3. Lampirkan ref ke TextInput
          ref={nameInputRef}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10 }}
          placeholder="Type your name"
          value={name}
          onChangeText={setName}
        />
        <Text style={{ margin: 10 }}>
          Hello, {name}!
        </Text>
        <Text>Age: </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10 }}
          placeholder="Type your age"
          value={age}
          onChangeText={setAge}
          keyboardType='numeric'
        />
        <Text>Password: </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10 }}
          placeholder="Type your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {/* <ThemedView style={styles.container}>
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
    </ThemedView> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
});