import { FC } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { INavItem, navItems } from './utils/consts';
import { Layout } from './components/Layout/Layout';
import { CryptoContextProvider } from './providers/CryptoProvider/CryptoProvider';

const App: FC = () => {
  return (
    <div className="App">
      <Layout>
        <h1>test</h1>
        <CryptoContextProvider>
          <Routes>
            {navItems.map((item: INavItem) => <Route path={item.path} element={item.component} key={item.path} />)}
          </Routes>
        </CryptoContextProvider>

      </Layout>
    </div>
  );
}

export default App;
