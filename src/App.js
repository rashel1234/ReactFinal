import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ApartmentsPage from './pages/ApartmentsPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/apartments'>
          <ApartmentsPage />
        </Route>
        <Route path='/profile'>
          <ProfilePage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
