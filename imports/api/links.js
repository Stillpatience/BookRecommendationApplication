import { Mongo } from 'meteor/mongo';

export const BooksCollectionName = 'descriptions';
export const LinksCollection = new Mongo.Collection('links');
export const BooksCollection = new Mongo.Collection(BooksCollectionName);
