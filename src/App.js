import './App.css';
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import {originals, action, comedy, horror, romance, documentaries} from './urls'
import RowPost from './Components/RowPost/RowPost';


function App() {
  let year = new Date().getFullYear()
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title="Netflix Originals"  />
      <RowPost url={action} title="Action" isSmall />
      <RowPost url={comedy} title="Comedy" isSmall />
      <RowPost url={horror} title="Horror" isSmall />
      <RowPost url={documentaries} title="Documentaries" isSmall />
      
      
  );
}

export default App;
