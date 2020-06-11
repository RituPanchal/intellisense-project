import React, { Component } from 'react';
import Rows from './rows.component';
import _ from 'lodash';

class Table extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data : [ ]
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.filterData();
        }
    }
    filterData = () => {
        let filtered = _.pickBy(this.props.items, function(value, key) {
            return _.startsWith(key, "RD:647-");
        });
        this.setState({data: filtered})
    }

    render() {
        if(!this.props){return}
        return (
            <React.Fragment>
                <Rows filteredItems={this.state.data}/>
            </React.Fragment>
        )
    }
}
export default Table;
