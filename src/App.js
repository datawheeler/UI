import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout'
import './App.css';
import { pr } from './common';
const { v4: uuidv4 } = require('uuid');
//import{ uuidv4 } from 'uuid';



function App() {

    const [hidepanel, setHidepanel] = useState(true)
    const sidemenu = React.createRef();
    const pagecontainer = React.createElement('div', { id: 'page-content' });

    const handlePanel = (hidepanel) => {
        sidemenu.current.innerText = (hidepanel ? '☰ DW' : '⚟ DATAWHEELER')
        setHidepanel(hidepanel)
    }
    const menu = <h4 align="left" style={{ color: 'yellow' }} ref={sidemenu} onClick={() => handlePanel(!hidepanel)}   >☰ DW</h4>
 
    return (
      <BrowserRouter>
            <Layout title="" togglemenu={menu}
                hide={hidepanel}
                onNavClick={() => handlePanel(false)}>
           </Layout>
      </BrowserRouter>
  );
}

export default App;
