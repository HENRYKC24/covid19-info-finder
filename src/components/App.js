import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getCovidInfoFromServer } from '../redux/covid19/covid19';

import HomePage from '../pages/HomePage';
import CountryPage from '../pages/CountryPage';
import RegionPage from '../pages/RegionPage';
import PageNotFound from '../pages/PageNotFound';
import Footer from './Footer';
import Header from './Header';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCovidInfoFromServer());
  }, []);

  return (
    <div className="main">
      <section>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/country">
            <CountryPage />
          </Route>
          <Route path="/region">
            <RegionPage />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default App;
