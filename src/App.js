import { Switch, Route } from 'react-router-dom';

import ResponsiveAppBar from './components/ResponsiveAppBar';
import ApartmentsPage from './pages/ApartmentsPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ManageListing from './pages/ManageListing.js';
import Logout from './pages/Logout';
import ProfilePage from './pages/ProfilePage';
import Statistics from './pages/Statistics';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';

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
        <Route path='/addlisting'>
          <ManageListing id={null}/>
        </Route>
        <Route path='/logout'>
          <Logout/>
        </Route>        
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route path='/statistics'>
          <Statistics/>
        </Route>
        <Route path='/UserList'>
          <UserList/>
        </Route>        
        <Route path='/addUser'>
          <AddUser />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
