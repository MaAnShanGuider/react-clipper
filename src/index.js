import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import { Store } from './store/store';

import Clipper from '@/component/Clipper';

import './component/style.scss';

import domtoimage  from './utils/dom-to-image';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        
    }
    render() {
        return (
            <Provider store={Store}>
                <div>         
                   <Clipper />
                </div>
            </Provider>
            )
    }
}

ReactDOM.render(<App />, document.getElementById('box'));