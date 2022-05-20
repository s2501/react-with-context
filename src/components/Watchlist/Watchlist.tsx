import { FC, useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import { CryptoContext } from '../../providers/CryptoProvider/CryptoProvider';
import Loading from '../Layout/Loading/Loading';
import { ColDef, GridOptions, GridReadyEvent, RowNode, RowSelectedEvent } from 'ag-grid-community';

const WatchList: FC = () => {
  const cryptoContext = useContext(CryptoContext);
  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'name',
      sortable: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: 'exchangeId', sortable: true  },
    { field: 'rank', sortable: true },
    { field: 'percentTotalVolume', sortable: true },
    { field: 'volumeUsd', sortable: true },
    { field: 'tradingPairs', sortable: true },
  ]);
  
  const [gridOptions, setGridOptions] = useState<GridOptions>({
    rowData: [],
    columnDefs: columnDefs,
    pagination: true,
    paginationPageSize: 10,
    rowMultiSelectWithClick: true,
    rowSelection: 'multiple',

    onRowSelected: (event: RowSelectedEvent) => {
      if (typeof cryptoContext?.manageWatchlist === 'function') {
        cryptoContext.manageWatchlist(event.data.exchangeId, !!event.node.isSelected())
      }
    },
    onGridReady: (event: GridReadyEvent) => {
      event.api.forEachNode((row: RowNode) => {
        row.setSelected(cryptoContext.watchlist.has(row.data.exchangeId));
      });
    },

  });

  useEffect(() => {
    if(cryptoContext.crypto.length) {
      const rowData = [...cryptoContext.crypto].filter(item => cryptoContext.watchlist.has(item.exchangeId));
      setGridOptions({...gridOptions, rowData});
    };
  }, [cryptoContext.crypto?.length]);

  if (cryptoContext.error) {
    return (<div>Error</div>)
  }

  const uiItems = () => gridOptions.rowData?.length ?
      <div className="ag-theme-alpine"><AgGridReact gridOptions={gridOptions}></AgGridReact></div> :
      <div>No results</div>;
  
  return (
    <div>
      { cryptoContext.loading ? <Loading /> : uiItems()}
    </div>
  );
}

export default WatchList;