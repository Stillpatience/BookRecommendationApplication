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

export const updateRecommendations = (similarBooksList, books) => {
    let newlyRecommendedBooks = [];
     selectedBooks.forEach(selectedBook =>{
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
         if (typeof book == 'undefined' || recommendedBooks.includes(book)){

         } else{
             recommendedBooks.push(book);
         }
     }
    )
}

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