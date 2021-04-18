import {genresMap, ratings} from "../ui/Books";
import {BooksCollection, GenresCollection, SimilarBooksCollection} from "../api/links";

export const setBooks = (books, search) =>{
    let titles = []
    const new_books = BooksCollection.find({"title" : {$regex : ".*"+search+".*", $options: 'i'}}).fetch();
    new_books.forEach(book =>
        titles.push(book["title"])
    )

    const node = document.getElementById("books");

    const children = node.childNodes;
    children.forEach(child =>
        {
            if (!titles.includes(child.id)){
                child.style.display = "none";
            } else {
                child.style.display = "block";
            }
        }
    )
}
export const removeItemOnce = (arr, value) => {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export let recommendedBooks = [];

export let previouslyLikedBooks = [];

export const updateRecommendations = (similarBooksList1, books) => {
     let newlyRecommendedBooks = [];
    selectedBooks.forEach(selectedBook =>{
         let similarBooksList = SimilarBooksCollection.find({"id":selectedBook}).fetch();

         similarBooksList.forEach(similarBook => {
             if (similarBook["id"] === selectedBook){
                 newlyRecommendedBooks.push(getBookFromID(similarBook["similar1"], books));
                 newlyRecommendedBooks.push(getBookFromID(similarBook["similar2"], books));
                 newlyRecommendedBooks.push(getBookFromID(similarBook["similar3"], books));
                 newlyRecommendedBooks.push(getBookFromID(similarBook["similar4"], books));
                 newlyRecommendedBooks.push(getBookFromID(similarBook["similar5"], books));
             }
         })
     })
    newlyRecommendedBooks.forEach(book => {
         if (typeof book == 'undefined'){

         } else if (recommendedBooks.includes(book)) {
             updateWeight(book, weightedRecommendedBooks,
                 weightedRecommendedBooks.get(book) +  getRating(1, book));
         } else {
             updateWeight(book, weightedRecommendedBooks,
                 typeof getRating(1, book) == 'undefined' ?
                     2.5 : getRating(1, book));
         }
     }
    )

    for (let key in ratings) {
        let res = key.split(",");
        let book_id = parseInt(res[1]);
        let user = parseInt(res[0]);
        let rating = parseFloat(ratings[key]);

        if (newlyRatedBooks.includes(book_id)){
            const similarBooks = SimilarBooksCollection.findOne({"id":book_id});
            const similars = ["similar1", "similar2", "similar3", "similar4", "similar5"];
            if (rating >= 3) {
                similars.forEach(similarString => {
                    const book_id = parseInt(similarBooks[similarString]);
                    const prevRating = getRating(user, book_id)
                    if (typeof prevRating !== 'undefined') {
                        setRating(user, book_id, prevRating + rating, true);
                    } else {
                        setRating(user, book_id, rating, true);
                    }
                });
                newlyRatedBooks = [];
            }
        }
    }

    let items = Object.keys(ratings).map(function(key) {
        return [key, ratings[key]];
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    ratings = [];
    items.forEach(item => {
        let res = item[0].split(",");
        let book_id = parseInt(res[1]);
        let user = parseInt(res[0]);
        ratings[[user, book_id]] = parseFloat(item[1]);
    })

    recommendedBooks = [];
    newlyRecommendedBooks.forEach(book => {
            if (typeof book !== 'undefined' && !recommendedBooks.includes(book)) {
                recommendedBooks.push(book);
            }
        }
    )
    for (let key in ratings) {
        let res = key.split(",");
        let book_id = parseInt(res[1]);
        let book = getBookFromID(book_id, books);
        if (typeof book !== 'undefined' && !recommendedBooks.includes(book)){
            recommendedBooks.push(book);
        }
    }

}

export let newlyRatedBooks = [];
export const getSimilarBooks = (similarBooksList, id) => {
    let result = null;
    similarBooksList.forEach(similarBook => {
        if (parseInt(similarBook["id"]) === id){
            result = similarBook;
        }
    })
    return result
}
export const updateWeight = (book, weightedRecommendedBooks, newWeight) => {
    weightedRecommendedBooks.forEach(weightedRecommendation => {
        if (weightedRecommendation["id"] === book["id"]){
            const current_weight = weightedRecommendation.get(book["id"]);
            if (typeof current_weight == 'undefined') {
                weightedRecommendation.set(book["id"], newWeight);
            } else {
                weightedRecommendation.set(book["id"], current_weight + newWeight);
                }
            }
        }
    )
    if (weightedRecommendedBooks.size === 0){
        weightedRecommendedBooks.set(book["id"], newWeight);
    }
    else if (typeof weightedRecommendedBooks.get(book["id"]) == 'undefined'){
        weightedRecommendedBooks.set(book["id"], newWeight);
    }
}

export let weightedRecommendedBooks = new Map();

export const getBookFromID = (id, books) => {
    let result_book = undefined;
    books.forEach(book => {
        if (book["id"] === id){
            result_book = book;
        }
    })
    return result_book;
}

export let selectedBooks = []
export let propagatedIDs = []
export const setRating = (user, book_id, newValue, propagated) => {
    newlyRatedBooks.push(book_id);
    ratings[[user, book_id]] = newValue;
    if (propagated) {
        propagatedIDs.push(book_id);
    }
    if (!propagated && propagatedIDs.includes(book_id)){
        removeItemOnce(propagatedIDs, book_id);

    }
}

export const getRating = (user, book_id) => {
    return ratings[[user, book_id]];
}

export const addGenres = (book_id, genres) => {
    genres.forEach(genre => {
        const genre_name = genre["genres"];
        if (typeof genresMap[book_id] == 'undefined'){
            genresMap[book_id] = [genre_name]
        }
        else {
            genresMap[book_id].push(genre_name)
        }
    });
}

export const getHighestCountMap = (genresCount) => {
    let total_count = 0
    let newMap = []
    let highest_count = 0
    for (const key in genresCount) {
        if (genresCount.hasOwnProperty(key)) {
            total_count = total_count + genresCount[key];
            if (genresCount[key] > highest_count) {
                highest_count = genresCount[key]
            }
        }
    }
    for (const key in genresCount) {
        if (genresCount.hasOwnProperty(key)) {
            let new_value = Math.floor((genresCount[key]/highest_count) * 100)
            newMap.push({"name":key, "value": new_value})
        }
    }
    return newMap;
}

export const countSimilarGenres = (genresCount, book_id) => {
    const genres_in_book = GenresCollection.find({"id":book_id}, {}).fetch();
    let selectedGenres = {}
    genres_in_book.forEach(genre => {
        if (genre["genres"] in genresCount){
            const genre_name = genre["genres"]
            selectedGenres[genre_name] = genresCount[genre_name]
        }
    })
    return selectedGenres
}

export const countGenresMap = () => {
    let genresCount = {}

    for (const key in genresMap) {
        if (genresMap.hasOwnProperty(key)) {
            const genres = genresMap[key];
            genres.forEach(genre => {
                if (Object.keys(genresCount).includes(genre)){
                    genresCount[genre] = genresCount[genre] + 1
                }
                else{
                    genresCount[genre] = 1
                }
            })
        }
    }
    return genresCount;
}

export const visualizationsMap = {
    1:"barchart",
    2:"venn-diagram",
    3:"other-books",
    4:"double-barchart",
    5:"arrows",
    6:"baseline"
}