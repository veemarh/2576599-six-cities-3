import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData, HousingType, ConvenienceType, UserType, cityCoordinatesMap} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';

const IMAGES_COUNT = 6;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const preview = getRandomItem<string>(this.mockData.preview);
    const images = getRandomItems<string>(this.mockData.images, IMAGES_COUNT);
    const firstname = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatars);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const conveniences = getRandomItems(Object.keys(ConvenienceType));
    const city = getRandomItem(Object.keys(cityCoordinatesMap));
    const type = getRandomItem([HousingType.Apartment, HousingType.House, HousingType.Room, HousingType.Hotel]);
    const premium = Math.random() < 0.5;
    const favorites = Math.random() < 0.5;
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const userType = getRandomItem([UserType.Regular, UserType.Pro]);
    const coordinates = cityCoordinatesMap[city];

    return [
      title, description, createdDate,
      city, preview, images, premium, favorites,
      type, rooms, guests, price, conveniences,
      firstname, email, avatarPath, userType, coordinates
    ].join('\t');
  }
}
