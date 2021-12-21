import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import Medical from './containers/medical_bill';
import MedicalRecord from './containers/medical_record';
import TestResult from './containers/test_result';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path='/' exact component={SignIn} />
        <PrivateRoute path='/home' exact component={Home} />
        <PrivateRoute path='/medical' exact component={Medical} />
        <PrivateRoute path='/test-result' exact component={TestResult} />
        <PrivateRoute path='/medical-record/:slug' exact component={MedicalRecord} />
        <Route path='/signIn' component={SignIn} />
        {/* <Route path='/signUp' component={Signup} /> */}
      </Switch>
    </div>
  );
}

export default App;
