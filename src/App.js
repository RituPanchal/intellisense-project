import React, { Component } from 'react';
import axios from 'axios';
import Table from './Components/table.component';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  //API
  async componentDidMount() {
    let response = await axios.get('https://reference.intellisense.io/thickenernn/v1/referencia');
    this.setState({ items: response.data.current.data['pt2-scaled'] });
  }

  render() {
    return (
      <React.Fragment>
        <Table items={this.state.items}/>
      </React.Fragment>
    )
  }
}
export default App;