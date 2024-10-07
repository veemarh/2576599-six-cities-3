export type CityCoordinatesType = {
  latitude: number;
  longitude: number;
};

export const cityCoordinatesMap: Record<string, CityCoordinatesType> = {
  'Paris': {latitude: 48.85661, longitude: 2.351499},
  'Cologne': {latitude: 50.938361, longitude: 6.959974},
  'Brussels': {latitude: 50.846557, longitude: 4.351697},
  'Amsterdam': {latitude: 52.370216, longitude: 4.895168},
  'Hamburg': {latitude: 53.550341, longitude: 10.000654},
  'Dusseldorf': {latitude: 51.225402, longitude: 6.776314},
};
