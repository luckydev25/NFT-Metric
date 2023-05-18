import logo from './logo.svg';
import AppRouter from './router/AppRouter';
import './App.css';
import './main.css';

function App() {
  return (
    <div className='mx-auto' style={{maxWidth: 1200}}>
      <AppRouter />
    </div>
  );
}

export default App;
