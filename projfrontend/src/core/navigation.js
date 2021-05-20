import {Link, withRouter} from 'react-router-dom';

const currentTab = (history, path) =>{
    console.log(history.location.pathname)
    if(history.location.pathname ===path){
        return {color:"#2ecc72"}
    }else{
        return {color:"#ffffff"}
    }
};

const Navigation = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/")} to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/cart")} to="/cart">
                    Cart
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/user/dashboard")} to="/user/dashboard">
                    DashBoard
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/admin/dashboard")} to="/admin/dashboard">
                    A. DashBoard
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/signup")} to="/signup">
                    SignUp
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/signin")} to="/signin">
                    SignIn
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history, "/signout")} to="/signout">
                    SignOut
                </Link>
            </li>
        </ul>
    </div>
);

export default withRouter(Navigation)