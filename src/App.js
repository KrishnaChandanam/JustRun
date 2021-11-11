import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import'./App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import { LOGOUT } from './actions/types';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Blog from './components/Blog/Blog'



const App=()=>{

    useEffect(() => {
        // check for token in LS
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());
    
        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
          if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
      }, []);
    
    return(
        <Provider store={store}>
            <BrowserRouter>
              <Fragment>
                <Navbar/>
  
                    <Route  path='/'  exact component={Home}/> 
  
                    <Switch>
      
                        <Route  path="/contact" component={Contact}/>  
                        <Route  path="/register" component={Register}/>
                        <Route  path="/login" component={Login}/>
                        <Route  path="/blog" component={Blog}/>
                    </Switch>
  
                    </Fragment>
                    </BrowserRouter>
                    </Provider>

 
    )
}


export default App;