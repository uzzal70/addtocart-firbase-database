import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddProducts from './AddProducts';
import UserData from './components/UserData';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/user" element={<UserData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
