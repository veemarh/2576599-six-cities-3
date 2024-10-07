import {HousingType} from './housing-type.enum.js';
import {ConvenienceType} from './conveniences-type.enum.js';
import {User} from './user.type.js';
import {CityCoordinatesType} from './city.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  preview: string;
  images: string[];
  premium: boolean;
  favorites: boolean;
  type: HousingType
  rooms: number;
  guests: number;
  price: number;
  conveniences: ConvenienceType[];
  author: User;
  coordinates: CityCoordinatesType;
}
