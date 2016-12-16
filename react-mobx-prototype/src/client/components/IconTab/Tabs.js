import React, {Component} from 'react';
import _ from 'ramda';
import uuid from 'uuid';

export class Tabs extends Component {
    


    getRadiosAndLabels(){
        let ret = [];
        let checked = true;
        const idPrefix = uuid.v4().toString();
        const rbname = `tabRadioButton_${idPrefix}`;
        _.forEach((child) =>{
            console.log(`Child props => id${child.props.id}, faClassName: ${child.props.faClassName}`);
            let rbid = `rb_${idPrefix}_${child.props.id}`;
            ret.push(
                <input key={rbid} id={rbid} type="radio" name={rbname} className="tab" defaultChecked={checked} />
            );
            checked=false;
        }, this.props.children);
        _.forEach((child) =>{
            let lblid = `lbl_${idPrefix}_${child.props.id}`;
            let rbid = `rb_${idPrefix}_${child.props.id}`;
            let faClass = `fa ${child.props.faClassName} fa-2x`;
            ret.push(
                <label id={lblid} key={lblid} htmlFor={rbid}><i className={faClass} aria-hidden="true"></i></label>
            );
        }, this.props.children);
        return ret;
    }

    render(){
        return(
            <div className="tab-and-content-container">
                {this.getRadiosAndLabels()}
                <div className="tabs-conent-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

