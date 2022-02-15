import { Component } from 'react';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom'

class Navbar extends Component{
    render(){
        return(
            <nav className="uk-navbar-container uk-navbar">
                <div className="uk-navbar-left">
            
                    <a className="uk-navbar-item uk-logo"><span className="logoImg">S</span></a>
            
                    <ul className="uk-navbar-nav">
                        {MenuItems.map((item, index) =>{
                            return(
                                <li>
                                   <Link to="/">{item.title} <span className="uk-icon uk-margin-small-right" uk-icon={item.icon}></span></Link>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
                <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav">
                            <li className="p_relative">
                                <a><span className="uk-icon uk-margin-small-right" uk-icon="icon: bell"></span><span className="notif">5</span></a>
                                <div className="uk-navbar-dropdown">
                                    <ul className="uk-nav uk-navbar-dropdown-nav">
                                        <li className="uk-active"><Link to="#">Active</Link></li>
                                        <li><Link to="#">Item</Link></li>
                                        <li><Link to="#">Item</Link></li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link to="#">Monica Simons  <span className="avatar-img"></span><span className="uk-icon uk-margin-medium-right" uk-icon="icon: chevron-down"></span></Link>
                               
                            </li>
                        
                        </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar