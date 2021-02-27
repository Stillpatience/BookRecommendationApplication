import { Mongo } from 'meteor/mongo';

export const BooksCollectionName = 'descriptions';
export const LinksCollection = new Mongo.Collection('links');
export const BooksCollection = new Mongo.Collection(BooksCollectionName);
export const SimilarBooksCollectionName = 'similar_books';
export const SimilarBooksCollection = new Mongo.Collection(SimilarBooksCollectionName);