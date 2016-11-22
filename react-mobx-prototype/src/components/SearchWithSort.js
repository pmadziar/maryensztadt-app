import React, {Component} from 'react';

class SearchWithSort extends Component {
    render () {
        return (
            <span className="search-with-sort-container">
                <input type="text" name="search" placeholder={'\uD83D\uDD0E Search..'} />
                &nbsp; <a className="fa fa-sort-alpha-asc"  href="javascript:alert('Clickety click 1'); return false;"></a>
                &nbsp; <a className="fa fa-sort-alpha-desc" href="javascript:alert('Clickety click 2'); return false;"></a>
            </span>
        );
    }
}

export default SearchWithSort;
