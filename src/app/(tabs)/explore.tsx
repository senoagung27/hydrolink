import React, { useState } from 'react';
import { useNotes } from "../../context/NotesContext";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ExploreScreen() {
  const { notes, removeNote, editNote } = useNotes();
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Semua Catatan</Text>
      {notes.length === 0 ? (
        <Text>Tidak ada catatan.</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              {editingId === item.id ? (
                <>
                  <TextInput
                    value={editText}
                    onChangeText={setEditText}
                    style={{ borderWidth: 1, padding: 5 }}
                  />
                  <Button
                    title="Simpan"
                    onPress={() => {
                      editNote(item.id, editText);
                      setEditingId(null);
                      setEditText('');
                    }}
                  />
                </>
              ) : (
                <>
                  <Text>{item.text}</Text>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button
                      title="Edit"
                      onPress={() => {
                        setEditingId(item.id);
                        setEditText(item.text);
                      }}
                    />
                    <Button title="Hapus" onPress={() => removeNote(item.id)} />
                  </View>
                </>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
});