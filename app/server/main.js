import { Meteor } from 'meteor/meteor';
import {
  LinksCollection,
  BooksCollection,
  BooksCollectionName,
  SimilarBooksCollectionName,
  SimilarBooksCollection, GenresCollectionName, GenresCollection, FullBooksCollection, FullBooksCollectionName
} from '/imports/api/links';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {

  Meteor.publish(BooksCollectionName, function () {
    return BooksCollection.find({});
  });

  Meteor.publish(FullBooksCollectionName, function () {
    return BooksCollection.find({});
  });


  Meteor.publish(SimilarBooksCollectionName, function () {
    return SimilarBooksCollection.find({});
  });

  Meteor.publish(GenresCollectionName, function () {
    return GenresCollection.find({});
  });

  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});
