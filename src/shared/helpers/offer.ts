import {ConvenienceType, HousingType, Offer, UserType, cityCoordinatesMap} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [title, description, createdDate, city, preview, images, premium, favorites, type, rooms, guests, price, conveniences, firstname, email, avatarPath, userType] = offerData.replace('\n', '').split('\t');

  const author = {
    firstname,
    email,
    avatarPath,
    userType: UserType[userType as 'Regular' | 'Pro']
  };

  return {
    title,
    description,
    postDate: new Date(createdDate),
    city,
    preview,
    images: images.split(',')
      .map((img) => img || 'default.jpg'),
    premium: premium === 'true',
    favorites: favorites === 'true',
    type: HousingType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences.split(',')
      .map((convenience) => ConvenienceType[convenience as 'Breakfast' | 'AirConditioning' | 'LaptopFriendly' | 'Workspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
    author,
    coordinates: cityCoordinatesMap[city],
  };
}
