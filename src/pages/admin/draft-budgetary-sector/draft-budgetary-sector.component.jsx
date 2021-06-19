import React from 'react';
import axios from 'axios';
class DraftBudgetarySectorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pending: false
    }
  }

  componentDidMount() {
    axios.get('/api/draftBudgetarySector').then(resp => {
      console.log(resp.data)
    }).catch(() => null);
  }

  render() {
    return (
      <div>
        test
      </div>
    )
  }
}

export default DraftBudgetarySectorPage;