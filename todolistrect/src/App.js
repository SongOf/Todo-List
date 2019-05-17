import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import React from 'react'
import './App.css'
import NewTodoItem from './component/NewTodoItem'
import ShowTodoList from './component/ShowTodoList'

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1 className="navbar-brand">Todo List</h1>
            </div>
          </div>
        </nav>
        <div className="body">
          <NewTodoItem></NewTodoItem>
          <ShowTodoList></ShowTodoList>
        </div>
        <div className="footer navbar-fixed-bottom">
          <div className="jumbotron text-center">联系我们</div>
        </div> 
      </div> 
    )
  }
}

export default App;
