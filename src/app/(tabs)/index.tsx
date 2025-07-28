import { useNotes } from '../../context/NotesContext';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const { addNote } = useNotes();

  const handleAdd = () => {
   if (input.trim()) {
    addNote(input);
    setInput('');
   }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home Screen</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter note text"
        style={{ borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 }}
        autoCorrect={false}
      />
      <Button title="Add Note" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24 },
});