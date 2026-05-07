const SONGS = [
  {
    id: 0,
    title:  'เพลงที่ 1',
    artist: 'ศิลปิน A',
    duration: '3:24',
    color:  '#F9C74F',
    emoji:  '🎵',
    // ไฟล์ใน assets/
    audio:  require('../assets/song1.mp3'),
    // หรือจาก URL
    // audio: { uri: 'https://..../song1.mp3' },
  },
  {
    id: 1,
    title:  'เพลงที่ 2',
    artist: 'ศิลปิน B',
    duration: '4:10',
    color:  '#90BE6D',
    emoji:  '🎶',
    audio:  require('../assets/song2.mp3'),
  },
  {
    id: 2,
    title:  'เพลงที่ 3',
    artist: 'ศิลปิน C',
    duration: '2:55',
    color:  '#4CC9F0',
    emoji:  '🎸',
    audio:  require('../assets/song3.mp3'),
  },
];

export default SONGS;