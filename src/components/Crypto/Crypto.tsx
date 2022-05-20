import { FC, useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
// node_modules\ag-grid-community\dist\styles\ag-theme-alpine.css
import { CryptoContext } from '../../providers/CryptoProvider/CryptoProvider';
import { CryptoModel } from '../../providers/CryptoProvider/CryptoProviders.type';
import Loading from '../Layout/Loading/Loading';
import { ColDef, ColGroupDef, GridOptions, GridReadyEvent, RowNode, RowSelectedEvent } from 'ag-grid-community';

const Crypto: FC = () => {
  const cryptoContext = useContext(CryptoContext);
  const [crypto, setCrypto] = useState<CryptoModel[]>([]);
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
    // PROPERTIES
    // Objects like myRowData and myColDefs would be created in your application
    rowData: [],
    columnDefs: columnDefs,
    pagination: true,
    paginationPageSize: 10,
    rowMultiSelectWithClick: true,
    rowSelection: 'multiple',

    // EVENTS
    // Add event handlers
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
    if(cryptoContext.getCrypto) {
      cryptoContext.getCrypto();
    };
  }, []);

  useEffect(() => {
    if(!cryptoContext.loading && cryptoContext.crypto.length) {
      setCrypto(cryptoContext.crypto);
      setGridOptions({...gridOptions, rowData: [...cryptoContext.crypto]});
    };
  }, [cryptoContext.loading, cryptoContext.crypto.length]);

  if (cryptoContext.error) {
    return (<div>Error</div>)
  }

  const uiItems = () => crypto.length ?
      <div className="ag-theme-alpine"><AgGridReact gridOptions={gridOptions}></AgGridReact></div> :
      <div>No results</div>;
  
  return (
    <div>
      { cryptoContext.loading ? <Loading /> : uiItems()}
    </div>
  );
}

export default Crypto;