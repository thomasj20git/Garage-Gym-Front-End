
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GymPostContainer from './gymPostContainer/gymPostContainer';
import WorkoutPage from './workoutLogContainer/workoutLogContainer';
import UserContainer from './userContainer/usercontainer';
import LoginContainer from './userContainer/userlogin';
// import { router } from '../../../../Back-End/controllers/gymController';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<GymPostContainer></GymPostContainer>}/>
        <Route path='/workout-log' element={<WorkoutPage></WorkoutPage>}/>
        <Route path='/users' element={<UserContainer></UserContainer>}/>
        <Route path='/login' element={<LoginContainer></LoginContainer>}/>
      </Routes>
    </Router>

  );
}

export default App;
