import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import './bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './styles/style.css';
import registerServiceWorker from './registerServiceWorker';
import NavBooks from './components/misc/nav_books';
import { Footer } from './components/misc/footer';
import Home from './components/home/home';
import Cats from './components/cats/cats';
import Books from './components/books/books';
import SearchBooks from './components/books/search_books';
import BookResults from './components/books/book_results';
import BookDetails from './components/books/book_details';
import About from './components/misc/about';
import HowTo from './components/misc/howto';
import ModalsRoot from './components/modals_root/modals_root';
import Search from './components/form/search';
import reducers from './reducers';

const enhancers = [
  applyMiddleware(ReduxThunk),
  autoRehydrate()
];

const initialState = {};
const store = createStore(
  reducers,
  initialState,
  compose(...enhancers)
);
persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
          <Container fluid className="booksPage">
            <ModalsRoot />
            <Route path="/" component={NavBooks} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/cats" component={Cats} />
              <Route path="/books/:catId" component={Books} />
              <Route path="/search_books/:catId" component={SearchBooks} />
              <Route path="/book_results/:catId" component={BookResults} />
              <Route path="/bookdetails/:bookId" component={BookDetails} />
              <Route path="/about" component={About} />
              <Route path="/howto" component={HowTo} />
              <Route path="/search" component={Search} />
          </Switch>
          <Footer />
      </Container>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('#root'));

  /* ---------- without Debug ---------------
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>

    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
*/

registerServiceWorker();
