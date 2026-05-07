import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import SONGS from '../data/songs';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎵 รายการเพลง</Text>

      {SONGS.map((song) => (
        <TouchableOpacity
          key={song.id}
          style={[styles.item, { borderLeftColor: song.color }]}
          onPress={() => navigation.navigate('Player', { id: song.id })}
        >
          <Text style={styles.emoji}>{song.emoji}</Text>
          <View style={styles.info}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>
          </View>
          <Text style={styles.duration}>{song.duration}</Text>
          <Text style={styles.arrow}>▶</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { padding: 20, backgroundColor: '#1A1A2E' },
  title:       { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  item:        { flexDirection: 'row', alignItems: 'center',
                 backgroundColor: '#16213E', borderRadius: 12,
                 padding: 14, marginBottom: 10, borderLeftWidth: 4 },
  emoji:       { fontSize: 28, marginRight: 12 },
  info:        { flex: 1 },
  songTitle:   { fontSize: 16, fontWeight: '700', color: '#fff' },
  artist:      { fontSize: 13, color: '#888', marginTop: 2 },
  duration:    { fontSize: 13, color: '#888', marginRight: 8 },
  arrow:       { fontSize: 14, color: '#555' },
});