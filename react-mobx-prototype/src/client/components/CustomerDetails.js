import React, {Component} from 'react';
import {observer} from 'mobx-react'; 

import * as IconTab from "./IconTab";
import * as CustomerTabs from "./CustomerTabs";

@observer class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.uistate = props.UiState;
        this.CustomersStore = props.CustomersStore;
    }

    componentWillMount = () => {
        this.uistate.setIsLoadin(true);
        this.CustomersStore.loadCustomer(() => this.uistate.setIsLoadin(false), this.props.params.id);
    };

    static propTypes = {
        CustomersStore: React.PropTypes.object.isRequired,
        UiState: React.PropTypes.object.isRequired
    }

    render () {
        const RenderTabs = observer(()=>{
            let ret = <span>Wczytywanie danych ....</span>;
            if(!this.uistate.isLoading){
                ret = (
                    <IconTab.Tabs>
                        <IconTab.Tab id="tab01" faClassName="fa-building">
                            <CustomerTabs.CustomerDetails {...this.props} CurrentCustomer={this.CustomersStore.CurrentCustomer} />
                        </IconTab.Tab>
                        <IconTab.Tab id="tab02" faClassName="fa-sticky-note">
                            <h1>Where can I get some 11111111111111?</h1>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                        </IconTab.Tab>
                        <IconTab.Tab id="tab03" faClassName="fa-phone">
                            <h1>Why do we use it?</h1>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </IconTab.Tab>
                        <IconTab.Tab id="tab04" faClassName="fa-shopping-cart">
                            <h1>Where can I get some 2222222222222?</h1>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

                        </IconTab.Tab>
                    </IconTab.Tabs>
                );
            }
            return ret;
        });

        return (
            <RenderTabs />
        );
    }
}

export default CustomerDetails;
