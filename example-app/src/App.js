import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"

function App() {
  const [list, setList] = useState([{
    name: 'wow',
    bio: 'test'
  }])
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
    <div className="App">
      {list.map(user => {
        return (
          <div>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Bio: {user.bio}</p>
            <p>Created on: {user.created_at}</p>
            <p>Last updated: {user.updated_at}</p>
            <div onClick={()=>{
              axios.delete(`http://localhost:8000/api/users/${user.id}`)
                .then(res=> {
                  console.log(res)
                  setUpdate(!update)
                })
                .catch(err => console.log(err))
            }}>Delete User</div>
            <div onClick={()=>{
              axios.delete(`http://localhost:8000/api/users/${user.id}`, { name: 'edited test', bio: 'edited bio'})
              .then(res=> {
                console.log(res)
                setUpdate(!update)
              })
                .catch(err => console.log(err))
            }}>Edit user</div>

          </div>
        )
      })}
      <div onClick={()=> {
        axios.post(`http://localhost:8000/api/users`, { name: 'test', bio: 'test bio'})
        .then(res=> {
          console.log(res)
          setUpdate(!update)
        })
          .catch(err=> console.log(err))
          
      }} > Add new test user</div>
    </div>
  );
}

export default App;
