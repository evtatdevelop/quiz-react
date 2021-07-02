import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';

// import classes from './App.module.scss';
// console.log(classes);
class App extends Component {
  render() {
  return (
    <Layout>

      <div style = {{width: 400, outline: '1px solid #424242'}}>
        <h1>Layout works</h1>
      </div>
    </Layout>    
  )
}
}

export default App;
