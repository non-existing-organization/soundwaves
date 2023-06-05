// colorMap.js


const colorMap = new Map([
    [
      'blue',
      {
        name: 'Blue',
        image: require('./assets/noise_colours/blue.png'),
        thumbnail: require('./assets/noise_colours/blue.png'),
        buttons: [
          {
            name: 'Sub Button 1',
            image: require('./assets/noise_colours/blue.png'),
            thumbnail: require('./assets/noise_colours/blue.png'),
          },
          {
            name: 'Sub Button 2',
            image: require('./assets/noise_colours/blue.png'),
            thumbnail: require('./assets/noise_colours/blue.png'),
          },
        ],
      },
    ],
    [
      'brown',
      {
        name: 'Brown',
        image: require('./assets/noise_colours/brown.png'),
        thumbnail: require('./assets/noise_colours/brown.png'),
        buttons: [
          {
            name: 'Sub Button 1',
            image: require('./assets/noise_colours/blue.png'),
            thumbnail: require('./assets/noise_colours/blue.png'),
          },
        ],
      },
    ],
    // ... Repeat for the rest of the colors
  ]);





export default colorMap;
