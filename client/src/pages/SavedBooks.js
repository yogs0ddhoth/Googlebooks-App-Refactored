import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getME, deleteBook } from '../utils/API';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const user = data?.me || data?.user || {};

  const [removeBook, { mutationData, mutationError }] = useMutation(REMOVE_BOOK);

  const [userState, setUserState] = useState({ ...user });

  const userData = userState.savedBooks ? userState : user;
  // setUserData({ ...user })
  console.log('GET_ME:', user);
  console.log('STATE:', userState);
  console.log('USER_DATA:', userData);
  
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(user).length;

  // useEffect(() => {
  //   // const getUserData = async () => {
  //   //   try {
  //   //     setUserData(user);
  //   //     // console.log('useEffect Test:', userData);
  //   //   } catch (err) {
  //   //     console.error(err);
  //   //   }
  //   // };
    // const { loading, error, data } = useQuery(GET_ME, { fetchPolicy: 'no-cache' });
    // const user = data?.me || data?.user || {};
    
    // getUserData();
  //   setUserState({...user});
  //   console.log('STATE 3:', userState);
  // }, 
  // [userDataLength]
  // );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  async function handleDeleteBook(bookId) {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    // if (!token) {
    //   return false;
    // }
    try {
      // const response = await deleteBook(bookId, token);
      console.log('ARG:', bookId);
      const response = await removeBook({ variables: { bookId: bookId } });
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }
      console.log('RESPONSE:', response.data);
      // const updatedUser = await response.json();
      // user.savedBooks = response.data.removeBook.savedBooks;
      // console.log(userData);
      removeBookId(bookId);
      setUserState({ ...response.data.removeBook });
      // upon success, remove book's id from localStorage
    } catch (err) {
      console.error(err);
    }
  }
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length 
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
