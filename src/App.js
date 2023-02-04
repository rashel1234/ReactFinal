import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
    <ResponsiveAppBar/>
    </div>
  );
}

export default App;
