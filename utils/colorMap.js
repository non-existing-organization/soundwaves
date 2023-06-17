// colorMap.js
const colorMap = new Map([
  [
    'white',
    {
      name: 'White',
      color: '#ffffff',
      image: require('../assets/noise_colours/white.png'),
      thumbnail: require('../assets/thumbnails/white.png'),
      audioFile: require('../assets/noise_audios/white.mp3'),
      description: 'White noise, often compared to the gentle hiss of a radio tuned to an unused frequency, distributes energy equally across all audible frequencies, providing a soothing backdrop that can enhance focus and facilitate restful sleep.',
    },
  ],
  [
    'brown',
    {
      name: 'Brown',
      color: '#964B00',
      image: require('../assets/noise_colours/brown.png'),
      thumbnail: require('../assets/thumbnails/brown.png'),
      audioFile: require('../assets/noise_audios/brown.mp3'),
      description: 'Brown noise, commonly associated with the calming rumble of a waterfall or distant thunder, presents greater energy at lower frequencies, offering a deep, ambient sound that may foster relaxation and aid in promoting deeper sleep.',
    },
  ],
  [
    'pink',
    {
      name: 'Pink',
      color: '#FF55FF',
      image: require('../assets/noise_colours/pink.png'),
      thumbnail: require('../assets/thumbnails/pink.png'),
      audioFile: require('../assets/noise_audios/pink.mp3'),
      description: 'Pink noise, often compared to the steady rustle of leaves in the wind, has equal energy per octave, providing a balanced mix of high and low frequency sounds that can help improve sleep and focus.',
    },
  ],

]);

export default colorMap;
