import { FC } from 'react';

export interface IHomeProps {
  title: string;
}

const Home: FC<IHomeProps> = ({title}) => {
  return (
    <h1>
      {title}
    </h1>
  );
}

export default Home;