import React from 'react';
import '../styles.css';
//import {API} from '../backend';
import Base from './Base'
const Home = ()=>{
    return(
        <Base title="Home Page" description="Welcome To Our Store">
            <div className="row">
            <div className="col-4">
                <button>test</button>
            </div>
            <div className="col-4">
                <button>test</button>
            </div>
            <div className="col-4">
                <button>test</button>
            </div>    
            </div>
        </Base>
    );
}

export default Home;