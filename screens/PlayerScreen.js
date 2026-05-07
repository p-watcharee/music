import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';   // ← library เล่นเสียง
import SONGS from '../data/songs';

export default function PlayerScreen({ route, navigation }) {

  // ── รับ id จาก params ──────────────────────────────────────
  const { id } = route.params;
  const song = SONGS[id];

  // ── State ──────────────────────────────────────────────────
  const [sound, setSound]       = useState(null);   // object เพลง
  const [isPlaying, setPlaying] = useState(false);  // กำลังเล่นอยู่ไหม
  const [position, setPosition] = useState(0);      // ตำแหน่งปัจจุบัน (ms)
  const [duration, setDuration] = useState(0);      // ความยาวทั้งหมด (ms)

  // ── โหลดเพลงเมื่อหน้าเปิด ─────────────────────────────────
  useEffect(() => {
    loadAudio();

    // Cleanup — หยุดเพลงเมื่อออกจากหน้า
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const loadAudio = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      song.audio,
      { shouldPlay: false },
      onPlaybackUpdate    // callback อัปเดต position
    );
    setSound(newSound);
  };

  // ── อัปเดตตำแหน่งขณะเล่น ──────────────────────────────────
  const onPlaybackUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setPlaying(status.isPlaying);
    }
  };

  // ── เล่น / หยุด ────────────────────────────────────────────
  const togglePlay = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  // ── แปลง ms → นาที:วินาที ─────────────────────────────────
  const formatTime = (ms) => {
    const sec = Math.floor(ms / 1000);
    const m   = Math.floor(sec / 60);
    const s   = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // ── Progress bar ───────────────────────────────────────────
  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={styles.screen}>

      {/* Artwork */}
      <View style={[styles.artwork, { backgroundColor: song.color }]}>
        <Text style={styles.artworkEmoji}>{song.emoji}</Text>
      </View>

      {/* ชื่อเพลง */}
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      {/* Progress Bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.time}>{formatTime(position)}</Text>
          <Text style={styles.time}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* ปุ่มเล่น/หยุด */}
      <TouchableOpacity
        style={[styles.playBtn, { backgroundColor: song.color }]}
        onPress={togglePlay}
      >
        <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶️'}</Text>
      </TouchableOpacity>

      {/* ปุ่มกลับ */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => { sound?.unloadAsync(); navigation.goBack(); }}
      >
        <Text style={styles.backText}>← รายการเพลง</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  screen:       { flex:1, backgroundColor:'#1A1A2E', alignItems:'center',
                  justifyContent:'center', padding:24 },
  artwork:      { width:200, height:200, borderRadius:24,
                  alignItems:'center', justifyContent:'center', marginBottom:28 },
  artworkEmoji: { fontSize:80 },
  title:        { fontSize:26, fontWeight:'bold', color:'#fff', marginBottom:6 },
  artist:       { fontSize:15, color:'#888', marginBottom:32 },
  progressWrap: { width:'100%', marginBottom:32 },
  progressBg:   { height:6, backgroundColor:'#333', borderRadius:3,
                  overflow:'hidden', marginBottom:8 },
  progressFill: { height:'100%', backgroundColor:'#F9C74F', borderRadius:3 },
  timeRow:      { flexDirection:'row', justifyContent:'space-between' },
  time:         { fontSize:12, color:'#666' },
  playBtn:      { width:72, height:72, borderRadius:36,
                  alignItems:'center', justifyContent:'center', marginBottom:24 },
  playIcon:     { fontSize:28 },
  backBtn:      { padding:12 },
  backText:     { fontSize:15, color:'#555' },
});