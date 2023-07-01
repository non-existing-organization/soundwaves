// colorMap.js
const colorMap = new Map([
  [
    'white',
    {
      name: 'White',
      colors: ['#f1f1f1', '#f2f2f2', '#e5e5e5', '#d9d9d9', '#cccccc'],
      thumbnail: require('../assets/thumbnails/white.png'),
      audioFile: require('../assets/noise_audios/white.mp3'),
      description: 'White noise, often compared to the gentle hiss of a radio tuned to an unused frequency, distributes energy equally across all audible frequencies, providing a soothing backdrop that can enhance focus and facilitate restful sleep.',
    },
  ],
  [
    'brown',
    {
      name: 'Brown',
      colors: ['#964B00', '#A55C00', '#B96D00', '#CC7E00', '#DF8F00'],
      thumbnail: require('../assets/thumbnails/brown.png'),
      audioFile: require('../assets/noise_audios/brown.mp3'),
      description: 'Brown noise, commonly associated with the calming rumble of a waterfall or distant thunder, presents greater energy at lower frequencies, offering a deep, ambient sound that may foster relaxation and aid in promoting deeper sleep.',
    },
  ],
  [
    'pink',
    {
      name: 'Pink',
      colors: ['#FF55FF', '#FF6EFF', '#FF88FF', '#FFA5FF', '#FFC1FF'],
      thumbnail: require('../assets/thumbnails/pink.png'),
      audioFile: require('../assets/noise_audios/pink.mp3'),
      description: 'Pink noise, often compared to the steady rustle of leaves in the wind, has equal energy per octave, providing a balanced mix of high and low frequency sounds that can help improve sleep and focus.',
    },
  ],

]);

export default colorMap;
