import Crypto from "../components/Crypto/Crypto";
import Home from "../components/Home/Home";
import WatchList from "../components/Watchlist/Watchlist";

export interface INavItem {
  path: string;
  name: string;
  component: JSX.Element;
}

export const navItems: INavItem[] = [
  {
    path: '/',
    name: 'Home',
    component: <Home title="Wellcome" />,
  },
  {
    path: 'crypto',
    name: 'Crypto',
    component: <Crypto />,
  },
  {
    path: 'watchlist',
    name: 'Wachlist',
    component: <WatchList />,
  },
  {
    path: '*',
    name: '404',
    component: <Home title="Error 404" />,
  },  
];

export const apiUrl = 'https://api.coincap.io/v2/exchanges';

export const noOp = () => {};

export const config = {
  headers: {
    Accept: 'application/json',
  },
};