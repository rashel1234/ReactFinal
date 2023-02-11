import { Switch, Route } from 'react-router-dom';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import ApartmentsPage from './pages/ApartmentsPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import About from './pages/About';

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
      </Switch>
    </div>
  );
}

export default App;
