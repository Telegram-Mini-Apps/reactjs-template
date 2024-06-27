import { FC } from 'react';
import TapArea from "@/components/TapArea/TapArea.tsx";
import './HomePage.css'

const HomePage: FC = () => {
  return (
    <div>
      <h1 className='title'>Home page</h1>

      <TapArea />
    </div>
  );
};

export default HomePage;
