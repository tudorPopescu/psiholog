import { Switch } from 'react-router-dom'
import Routes from './routes/routes';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Routes />
      </Switch>
    </div>
  );
}

export default App;
