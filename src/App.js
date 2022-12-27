
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import Header from './components/Header'


function App() {
  return (
    <BrowserRouter>    
      <RoutesApp/>
    </BrowserRouter>  
  );
}

export default App;
