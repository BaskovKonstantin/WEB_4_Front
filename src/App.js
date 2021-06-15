import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.scss';
import SideBar from './component/SideBar'
import Hat from './component/Hat'
import Content from './component/Content';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/WEB_4">
          <Hat/>
        <div className="App">

          <SideBar/>
          <Content/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
