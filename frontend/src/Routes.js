import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Login from './Pages/Login';
import Main from './Pages/Main';
import Feed from './Pages/Feed';
import Detail from './Pages/Detail';


export default function Routes(){
    return(
        <BrowserRouter>
            <Route path= "/" exact component={Login} /> 
            <Route path= "/dev/:id" component={Main} />   
            <Route path="/login"  component={Login} /> 
            <Route path="/Detail" component={Detail}/>
            <Route path="/Feed" component={Feed}/>
        </BrowserRouter>
    );
}