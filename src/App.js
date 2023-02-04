import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import About from './pages/About';

function App() {
  return (
    <div>
    <ResponsiveAppBar/>
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
