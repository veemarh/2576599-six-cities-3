export type CityCoordinatesType = {
  latitude: number;
  longitude: number;
};

export const cityCoordinatesMap: Record<string, CityCoordinatesType> = {
  'Tokyo': {latitude: 35.6762, longitude: 139.6503},
  'Paris': {latitude: 48.8566, longitude: 2.3522},
};
