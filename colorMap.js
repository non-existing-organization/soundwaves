// colorMap.js


const colorMap = new Map([
    [
      'white',
      {
        name: 'white',
        image: require('./assets/noise_colours/white.png'),
        thumbnail: require('./assets/noise_colours/white.png'),
        audio_file: require('./assets/noise_audios/brown.mp3'),
      }
    ],
    [
      'brown',
      {
        name: 'Brown',
        image: require('./assets/noise_colours/brown.png'),
        thumbnail: require('./assets/noise_colours/brown.png'),
        audio_file: require('./assets/noise_audios/brown.mp3'),
      },
    ],
    // ... Repeat for the rest of the colors
  ]);





export default colorMap;
