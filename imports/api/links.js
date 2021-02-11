import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
export const Books = new Mongo.Collection('books');
