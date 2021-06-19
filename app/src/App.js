import { Switch } from 'react-router-dom'
import Routes from './router/router';

function App() {
  return (
    <div className="App container-fluid">
      <Switch>
        <Routes />
      </Switch>
    </div>
  );
}

export default App;
