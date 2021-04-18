import { Mongo } from 'meteor/mongo';

export const BooksCollectionName = 'descriptions-selected-columns';
export const FullBooksCollectionName = 'full_descriptions';

export const LinksCollection = new Mongo.Collection('links');
export const BooksCollection = new Mongo.Collection(BooksCollectionName);
export const SimilarBooksCollectionName = 'similar_books';
export const SimilarBooksCollection = new Mongo.Collection(SimilarBooksCollectionName);
export const GenresCollectionName = 'book_genres';
export const GenresCollection = new Mongo.Collection(GenresCollectionName);