import React, {Component} from 'react';

export class Tab extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        id: React.PropTypes.string.isRequired,
        faClassName: React.PropTypes.string.isRequired
    }

    render(){
        return(
            <div className="tab-content">
               {this.props.children}
            </div>
        )
    }

}
