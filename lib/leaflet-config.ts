import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [40, 65],
  iconAnchor: [20, 65],
  popupAnchor: [0, -60],
});

L.Marker.prototype.options.icon = DefaultIcon;