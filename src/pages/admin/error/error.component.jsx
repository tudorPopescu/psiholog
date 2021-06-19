import React from 'react';
import axios from 'axios';
import { toastr } from '../../../components/toastr/toastr.component';
import { Table } from 'react-bootstrap';
import Loading from '../../../components/loading/loading.component';
import Tooltip from '../../../components/tooltip/tooltip.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import DaysJS from 'react-dayjs';
import InfiniteScroll from "react-infinite-scroll-component";
import { setHeight, scrollTop } from '../../../components/utils/utils.component';

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class ErrorPage extends React.Component {
  errors = [];

  constructor() {
    super();

    this.state = {
      // errors: [],
      pending: true,
      limit: 20,
      show: false,
      items: [],
      hasMore: true
    };

    this.myTable = React.createRef();
  };

  componentDidMount() {
    axios.get('/api/logError').then(resp => {
      for (let i = 9; i <= 200; i++) {
        resp.data.push({id: i, action: 'test'})
      }
      this.errors = resp.data;
      this.setState({ pending: false, items: this.errors.slice(0, 40) });
      setHeight(this.myTable.current.el)
    }).catch((e) => toastr('error', 'Eroare la preluarea datelor!' + e));
  }

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      // console.log('aici intra?');
      let tmp = this.errors.slice(0, 10);
      // console.log(tmp);
      this.setState({
        // limit: this.state.limit+10,
        items: this.state.items.concat(tmp)
      }, () => {
        // console.log(this.state.items);

      });
    }, 500);

  };

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        {/* <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
        > */}
        <InfiniteScroll ref={this.myTable} id='scroll' className='view-scroll' loader={<h4>Loading...</h4>} dataLength={5} next={this.fetchMoreData} hasMore={false} height={100} >
        <button id='back-top' className={this.state.show ? 'show': ''} onClick={this.scrollTop}>
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <Table striped bordered hover size="sm">
              <tbody>
                  {
                    _.map(this.state.items, ({ id, id_user, email, name, action, error, createdAt }, index) => (
                      <tr key={index}>
                        <td width='40px' className='text-center'>{id_user}</td>
                        <td width='200px'>{email}</td>
                        <td width='200px'>{name}</td>
                        <td width='200px'>{action}</td>
                        <td>{error}</td>
                        <td width='120px' className='text-center'><DaysJS format='DD.MM.YYYY - HH:MM'>{createdAt}</DaysJS></td>
                        <td width='30px' className='cursor-pointer text-center' data-tip data-for='tooltip'>
                          <Tooltip id='tooltip' message='Șterge eroare'/>
                          <FontAwesomeIcon className='text-danger' icon={faTrashAlt} />
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
            </Table>
        </InfiniteScroll>
      </div>
    );
  }
}

export default ErrorPage;
