import React, { Component } from 'react';
import Search from 'components/Search.js';
import Table from 'components/Table.js';
import './App.css';


const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
];
class ViewOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: list,
            searchTerm: ""
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, list } = this.state;
        return (

            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >
                Search
                </Search>
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>

        );
    }
}
function isSearched(searchTerm) {
    return function (item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}
//const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

export default ViewOne;
