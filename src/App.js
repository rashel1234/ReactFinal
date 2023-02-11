import { Switch, Route } from 'react-router-dom';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import ApartmentsPage from './pages/ApartmentsPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import About from './pages/About';
import AddApartment from './pages/AddApartment';

import Checkout from './components/test/Checkout.js ';

function App() {
  return (
    <div>
    <ResponsiveAppBar/>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/about'>
          <About></About>
        </Route>
        <Route path='/apartments'>
          <ApartmentsPage />
        </Route>
        <Route path='/add'>
          <AddApartment />
        </Route>
        <Route path='/checkout'>
          <Checkout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
