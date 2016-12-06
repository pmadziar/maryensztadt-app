import React, {Component} from 'react';
import { Link } from "react-router";

class TopNav extends Component {
    render () {
          return (
            <header className="app-topnav-nav">
                <nav>
                    <Link to="/" title="Home"><i className="fa fa-home"></i></Link>
                </nav>
                <nav>
                    <a href="#2" title="Back"><i className="fa fa-arrow-circle-left"></i></a>
                </nav>
                <nav className="email-badge">
                    <Link to="/Messages">
                        <i className="fa fa-envelope"></i>
                        <span>99</span>
                    </Link>
                </nav>
                <nav>
                    <span className="top-nav-hidden-small">Browar</span> Maryensztadt
                </nav>
            </header>
        );
    }
}

export default TopNav;
