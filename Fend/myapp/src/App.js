import './App.css';
import Home from './Component/Home';
import { Route ,Routes} from 'react-router-dom';
import Product from './Component/Product';
import ViewProduct from './Component/ViewProduct';

function App() {
  return (
   <>
   <div><h1>Add products details</h1></div>
   <Product/>
   <ViewProduct/>
    <Routes>
    <Route path="/product" element={<Home/>}/>
   </Routes> 
   </>
  );
}

export default App;
