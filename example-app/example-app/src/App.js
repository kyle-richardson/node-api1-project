import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"

function App() {
  const [list, setList] = useState({})
  const [user, setUser] = useState({
    name: 'kyle',
    bio: 'loving lambda'
  })

  useEffect(()=> {
    setList(axios.get('localhost:8000/api/users'))
  }, [])

  return (
    <div className="App">
      {list.map(user => {
        return (
          <div>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <p>{user.created_at}</p>
            <p>{user.modified_at}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
