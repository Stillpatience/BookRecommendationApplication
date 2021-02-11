import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
export const BooksCollection = new Mongo.Collection('books');
