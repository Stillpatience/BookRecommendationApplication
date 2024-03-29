import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import {BooksCollectionName, GenresCollectionName, SimilarBooksCollectionName} from "../imports/api/links";

Meteor.startup(() => {
  Meteor.subscribe(BooksCollectionName);
  Meteor.subscribe(SimilarBooksCollectionName);
  Meteor.subscribe(GenresCollectionName);

  render(<App/>, document.getElementById('react-target'));
});
