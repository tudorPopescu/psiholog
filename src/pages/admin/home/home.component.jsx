import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../../../components/header/header.component';
import ErrorPage from '../error/error.component';
import DraftBudgetarySectorPage from '../draft-budgetary-sector/draft-budgetary-sector.component';

const AdminHomePage = () => {
  return (
    <div className='home'>
      <Header />
      <Route exact strict path='/errors' component={ErrorPage} />
      <Route exact strict path='/draftBudgetarySector' component={DraftBudgetarySectorPage} />
    </div>
  );
};

export default AdminHomePage;
