import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios"

function App() {
  const [list, setList] = useState([])
  // eslint-disable-next-line
  const [user, setUser] = useState({
    name: 'kyle',
    bio: 'loving lambda'
  })
  const [update, setUpdate] = useState(false)

  useEffect(()=> {
    axios
      .get('http://localhost:8000/api/users')
      .then(res=> {
        setList(res.data)
      })
      .catch(err=> console.log(err))
  }, [update])

  return (
    <div className="App" style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center'
    }}>
      {list.map(user => {
        return (
          <div key={user.id} style={{
            border: '1px solid blue', 
            borderRadius: '4px', 
            padding: '20px', 
            marginBottom: '10px', 
            textAlign: 'left'
          }}>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Bio: {user.bio}</p>
            <p>Created on: {user.created_at}</p>
            <p>Last updated: {user.updated_at}</p>
            <div style={{
              borderRadius: '4px', 
              background: 'red', 
              padding: '10px', 
              marginBottom: '10px', 
              color: 'white', 
              cursor: 'pointer'
            }} onClick={()=>{
              axios.delete(`http://localhost:8000/api/users/${user.id}`)
                .then(res=> {
                  setUpdate(!update)
                })
                .catch(err => console.log(err))
            }}>Delete User</div>
            <div style={{
              borderRadius: '4px', 
              background: 'lightblue', 
              padding: '10px', 
              marginBottom: '10px', 
              cursor: 'pointer'
            }} onClick={()=>{
              axios.put(`http://localhost:8000/api/users/${user.id}`, { name: 'edited test', bio: 'edited bio'})
              .then(res=> {
                setUpdate(!update)
              })
                .catch(err => console.log(err))
            }}>Edit user</div>

          </div>
        )
      })}
      <div style={{
        borderRadius: '4px', 
        background: 'lightgreen', 
        padding: '10px', 
        marginBottom: '10px', 
        cursor: 'pointer'
      }} onClick={()=> {
        axios.post(`http://localhost:8000/api/users`, user)
        .then(res=> {
          setUpdate(!update)
        })
          .catch(err=> console.log(err))
          
      }} > Add new test user</div>
    </div>
  );
}

export default App;
