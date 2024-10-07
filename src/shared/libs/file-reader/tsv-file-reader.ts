import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {ConvenienceType, HousingType, Offer} from '../../types/index.js';
import {UserType} from '../../types/user-type.enum.js';
import {cityCoordinatesMap} from "../../types/index.js";

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, preview, images, premium, favorites, type, rooms, guests, price, conveniences, firstname, email, avatarPath, userType]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city,
        preview,
        images: images.split(';')
          .map((img) => img || 'default.jpg'),
        premium: premium === 'true',
        favorites: favorites === 'true',
        type: HousingType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';')
          .map((convenience) => ConvenienceType[convenience as 'Breakfast' | 'AirConditioning' | 'LaptopFriendly' | 'Workspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
        author: {firstname, email, avatarPath, userType: UserType[userType as 'Regular' | 'Pro']},
        coordinates: cityCoordinatesMap[city],
      }));
  }
}
