import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks 
            books={this.state.books}
            reloadList={this.getAll}
          />
        )} />
        <Route exact path='/search' render={() => (
          <SearchBook
            booksOnShelf={this.state.books}
            reloadShelves={this.getAll}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
