export const getSavedBookIds = () => { 
  // if 'saved_books' item exists in local storage, assign it to const savedBookIds and return
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : []; // if 'saved_objects' does not exists, assign an empty array
  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => { // expect an array of strings
  bookIdArr.length // if the argument is an array with items, set it to 'saved_books' in local storage
    ? localStorage.setItem('saved_books', JSON.stringify(bookIdArr)) 
    : localStorage.removeItem('saved_books') // else, remove 'saved_books' from local storage
};

export const removeBookId = (bookId) => { // expect a string
  // if 'saved_books' item exists in local storage, assign it to const savedBookIds
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null; // if 'saved_objects' does not exists, assign null
  if (!savedBookIds) {
    return false; // if null, return false
  } // asign savedBookIds filtered to remove items that match the argument 'bookId'
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds)); //stringify the array and save to local storage
  // return true if the operation is successful
  return true;
};
