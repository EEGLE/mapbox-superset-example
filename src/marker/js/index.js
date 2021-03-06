import mapboxgl from 'mapbox-gl';
import mapboxSuperset from 'mapbox-superset';

mapboxgl.accessToken = 'pk.eyJ1IjoieXVuamllbGkiLCJhIjoiY2lxdmV5MG5rMDAxNmZta3FlNGhyMmpicSJ9.CTEQgAyZGROcpJouZuzJyA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/basic-v9'
});

map.on('load', () => {
  const eiffelTower = {lng: 2.294694, lat: 48.858093};

  const marker = mapboxSuperset.marker.add(map, eiffelTower);

  setTimeout(() => {
    mapboxSuperset.marker.remove(map, marker);
  }, 3000);
});

