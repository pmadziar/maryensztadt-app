import React, {Component} from 'react';
import { Link } from "react-router";

class DashboardIcon extends Component {
    
    static propTypes = {
        page: React.PropTypes.object.isRequired
    }

    render () {
    	const page = this.props.page;
        return (
			<Link to={page.url}>
				<img src={page.img} />
				<span>{page.text}</span>
			</Link>
        );
    }
}

export default DashboardIcon;
