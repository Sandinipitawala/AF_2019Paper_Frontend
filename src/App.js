import './App.css'
import Navbar from "./components/navBar/navBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateCategory from './components/createCategory/createCategory';
import CreateRoom from './components/createRoom/createRoom';
import Rooms from './components/categories/rooms';
import Categories from './components/categories/categories';
 
function App() {
  return (
    <div>
       <Router>
         <Navbar/>
         <section>
           <Switch>
             <Route path="/create-category" component={CreateCategory} />
             <Route path="/create-room" component={CreateRoom} />
             <Route path="/" component={Categories} exact />
             <Route path= "/:id" component={Rooms} />
           </Switch>
         </section>
       </Router>
    </div>
  );
}

export default App;
