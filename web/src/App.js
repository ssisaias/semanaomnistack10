import React, {useState, useEffect} from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm'
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);


  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
  }

  useEffect(() => {
    loadDevs(); // this makes it run when the application starts 
  }, []);

  async function handleAddDev(data){
    
    const response = await api.post('/devs', data)
    console.log(response.data);


    if(response.status===200){
      setDevs([...devs, response.data]);
    }
  }

  async function handleDeleteDev(data){
    console.log(`Deleting:::${data}`);
    await api.delete(`/devs?devId=${data}`);
    loadDevs(); //reload after delete 
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onDeleteDev={handleDeleteDev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
