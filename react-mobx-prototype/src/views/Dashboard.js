import React, {Component} from 'react';

import MyDataService from "../services/MyDataService";
import DashboardIcon from "../components/DashboardIcon";

class Dashboard extends Component {

    render () {
        const pages = MyDataService.getActivePagesForCurrentUser();
        return (
            <div className="svg-icons">
            {pages.map((page, index)=>{
                const childId = `dashboardIcon_${index}`;
                return(
                    <DashboardIcon key={childId} page={page} />
                )
            })}
            </div>
        );
    }
}

export default Dashboard;
