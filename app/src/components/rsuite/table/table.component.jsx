import { Component } from 'react';
import { Table as RsuiteTable, ColumnGroup as RsuiteColumnGroup, Column as RsuiteColumn, HeaderCell as RsuiteHeaderCell, Cell as RsuiteCell } from 'rsuite-table';
import { SET_HEIGHT } from '../../utils/utils.component';
import { cloneDeep, map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import '../../../styles/_rsuite.scss';

class Table extends Component {
  constructor() {
    super();

    this.state = {
      oldData: []
    }
  };

  componentDidMount = () => {
    const {distanceToTop, items, bottom, headerHeight, rowHeight} = this.props;

    this.setState({
      ...this.state,
      oldData: cloneDeep(items),
      bodyHeight: SET_HEIGHT(
        distanceToTop || 35,
        items.length,
        bottom || 150,
        headerHeight || 50,
        rowHeight || 50
      )
    });

    window.addEventListener('resize', this.handleDimensions);
  };

  componentWillUnmount = () => window.removeEventListener('resize', this.handleDimensions);

  handleDimensions = () => {
    const {distanceToTop, items, bottom, headerHeight, rowHeight} = this.props;

    this.setState({
      ...this.state,
      bodyHeight: SET_HEIGHT(
        distanceToTop || 35,
        items.length,
        bottom || 150,
        headerHeight || 50,
        rowHeight || 50
      )
    });
  };

  generateColumn = (column, index) => {
    return (
      <RsuiteColumn
        key={index}
        width={column.width || null}
        flexGrow={column.flexGrow || null}
        align={column.align || null}
        className={column.className || ''}
      >
        <RsuiteHeaderCell>
          { column.header }
          { column.filter }
        </RsuiteHeaderCell>
        {
          column.rowData ?
            <RsuiteCell>
              {
                column.rowData
              }
            </RsuiteCell>
          :
            <RsuiteCell dataKey={column.dataKey} />
        }
      </RsuiteColumn>
    )
  }

  handleScrollTop = () => {
    this.RsuiteTable.scrollTop(0);
    this.setState({ backTop: false });
  };

  render() {
    const { items, columns, headerHeight, rowHeight, onRowContextMenu, height, className } = this.props;
    const { bodyHeight, backTop } = this.state;

    return (
      <div className='table-component' style={{position: 'relative'}}>
        <button type='button' id='back-top' className={`${backTop ? 'show' : ''}`} onClick={this.handleScrollTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>

        <RsuiteTable
          virtualized={!!items.length}
          height={bodyHeight || height}
          data={items || []}
          locale={{emptyMessage: 'Date inexistente'}}
          headerHeight={headerHeight ? headerHeight : 50}
          rowHeight={rowHeight ? rowHeight : 50}
          bodyRef={e => (this.setState({bodyRef: e.parentElement.parentElement}))}
          ref={ref => this.RsuiteTable = ref}
          onScroll={(scrollX, scrollY) => {
            if (scrollY < -5000) {
              this.setState({ backTop: true });
            }
          }}
          onRowContextMenu={onRowContextMenu || null}
          className={className}
        >
          {
            map(columns, (column, index) => {
              if (column.columnGroup && column.columnGroup.length) {
                return (
                  <RsuiteColumnGroup align={column.align || null}  key={index} header={column.header}>
                    {
                      map(column.columnGroup, (item, i) => this.generateColumn(item, i))
                    }
                  </RsuiteColumnGroup>
                )
              } else {
                return this.generateColumn(column, index);
              }
            })
          }
        </RsuiteTable>
      </div>
    );
  };
};

export default Table;
