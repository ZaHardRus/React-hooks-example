import './App.css'
import { BrowserRouter} from 'react-router-dom';
import { MyNavbar } from './components/UI/myNavbar/MyNavbar';
import {AppRouter} from './routes/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;