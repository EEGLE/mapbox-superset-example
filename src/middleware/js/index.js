import mapboxgl from 'mapbox-gl';
import mapboxSuperSet from 'mapbox-superset';

mapboxgl.accessToken = 'pk.eyJ1IjoieXVuamllbGkiLCJhIjoiY2lxdmV5MG5rMDAxNmZta3FlNGhyMmpicSJ9.CTEQgAyZGROcpJouZuzJyA';

const StyleList = [
  'mapbox://styles/mapbox/basic-v9',
  'mapbox://styles/mapbox/streets-v9',
  'mapbox://styles/mapbox/bright-v9',
  'mapbox://styles/mapbox/light-v9',
  'mapbox://styles/mapbox/dark-v9',
  'mapbox://styles/mapbox/satellite-v9'
];

function getRandomStyle(styleList) {
  return styleList[Math.floor(Math.random() * styleList.length)];
}

// source: https://www.mapbox.com/mapbox-gl-js/example/geojson-polygon/
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/basic-v9',
  center: [-68.13734351262877, 45.137451890638886],
  zoom: 5
});

map.on('load', () => {
  const buttonChangeStyle = document.getElementById('change-style--button');
  buttonChangeStyle.addEventListener('click', () => {
    // save the data
    const layers = mapboxSuperSet.middleware.layers.slice(0);
    const sources = Object.assign({}, mapboxSuperSet.middleware.sources);

    // remove the data
    mapboxSuperSet.middleware.removeSource(map, 'polygon');
    mapboxSuperSet.middleware.removeLayer(map, 'maine');

    // change map style
    map.setStyle(getRandomStyle(StyleList));

    // re-add the data
    map.once('data', () => {
      // source
      Object.entries(sources).forEach(([id, source]) => {
        mapboxSuperSet.middleware.addSource(map, id, source);
      });

      // layers
      layers.forEach(layer => {
        mapboxSuperSet.middleware.addLayer(map, layer);
      });
    });
  });

  const src = {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[-67.13734351262877, 45.137451890638886],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573401557249, 43.090083319667144],
          [-70.75102474636725, 43.08003225358635],
          [-70.79761105007827, 43.21973948828747],
          [-70.98176001655037, 43.36789581966826],
          [-70.94416541205806, 43.46633942318431],
          [-71.08482, 45.3052400000002],
          [-70.6600225491012, 45.46022288673396],
          [-70.30495378282376, 45.914794623389355],
          [-70.00014034695016, 46.69317088478567],
          [-69.23708614772835, 47.44777598732787],
          [-68.90478084987546, 47.184794623394396],
          [-68.23430497910454, 47.35462921812177],
          [-67.79035274928509, 47.066248887716995],
          [-67.79141211614706, 45.702585354182816],
          [-67.13734351262877, 45.137451890638886]]]
      }
    }
  };

  mapboxSuperSet.middleware.addSource(map, 'polygon', src);

  const layer = {
    id: 'maine',
    source: 'polygon',
    type: 'fill',
    layout: {},
    paint: {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  };

  mapboxSuperSet.middleware.addLayer(map, layer);
});
