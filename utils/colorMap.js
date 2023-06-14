// colorMap.js
const colorMap = new Map([
  [
    'white',
    {
      name: 'white',
      image: require('../assets/noise_colours/white.png'),
      thumbnail: require('../assets/noise_colours/white.png'),
      audio_file: require('../assets/noise_audios/white.mp3'),
    },
  ],
  [
    'brown',
    {
      name: 'Brown',
      image: require('../assets/noise_colours/brown.png'),
      thumbnail: require('../assets/noise_colours/brown.png'),
      audio_file: require('../assets/noise_audios/brown.mp3'),
    },
  ],
  [
    'pink',
    {
      name: 'Pink',
      image: require('../assets/noise_colours/pink.png'),
      thumbnail: require('../assets/noise_colours/pink.png'),
      audio_file: require('../assets/noise_audios/pink.mp3'),
    },
  ],
]);

export default colorMap;
