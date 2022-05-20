import * as React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

type LayoutProps = {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
        <main>
          {children}  
        </main>
      <Footer />
      
    </div>
  );
}
