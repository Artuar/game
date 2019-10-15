import * as React from 'react';
import { Search } from 'app/components/Search/Search';
import { Map } from 'app/components/Map/Map';
// import * as styles from './GameApp.css';

export const GameApp: React.FunctionComponent = () => (
  <div>
    <Search/>
    <Map/>
  </div>
);
