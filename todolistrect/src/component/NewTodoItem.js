import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react'
import axios from 'axios'
const ADDURL='http://localhost:8000/api/v1/'

class NewTodoItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            TodoItem:{
                TodoContent:'在此输入内容',
                TodoPriority:3,
                TodoExpireDate:'',
                IsDone:false
            }
        }
        this.AddTodoItem=this.AddTodoItem.bind(this)
        this.GetTodoContent=this.GetTodoContent.bind(this)
        this.GetTodoExpireDate=this.GetTodoExpireDate.bind(this)
        this.GetTodoPriority=this.GetTodoPriority.bind(this)
    }
    AddTodoItem(event){
        axios({
            headers:{'Content-Type': 'application/json'},
            method:'POST',
            url:ADDURL,
            data:JSON.stringify({
                'TodoContent':this.state.TodoItem.TodoContent,
                'TodoPriority':this.state.TodoItem.TodoPriority,
                'TodoExpireDate':this.state.TodoItem.TodoExpireDate,
                'IsDone':false
            })
        })
        .then(function (response){
            this.setState({TodoItem:{
                TodoContent:'在此输入内容',
                TodoPriority:3,
                TodoExpireDate:'',
                IsDone:false
            }})
        }.bind(this))
    }
    GetTodoContent(event){
        let TodoItemTemp=this.state.TodoItem
        TodoItemTemp.TodoContent=event.target.value
        this.setState({TodoItem:TodoItemTemp})
    }
    GetTodoPriority(event){
        let TodoItemTemp=this.state.TodoItem
		console.log(event.target.value)
		TodoItemTemp.TodoPriority=event.target.value
        this.setState({TodoItem:TodoItemTemp})
    }
    GetTodoExpireDate(event){
        let TodoItemTemp=this.state.TodoItem
        TodoItemTemp.TodoExpireDate=event.target.value
        this.setState({TodoItem:TodoItemTemp})
    }
    render(){
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="add">
                            <input type="image" src={require('./icon/addBtn.png')} className="btn-add" alt="Add Todo" onClick={this.AddTodoItem}/>
                        </div>
                        <div className="content">
                            <input className="form-control" type="text" value={this.state.TodoItem.TodoContent} onChange={this.GetTodoContent}/>
                        </div>
                        <div className="expire_date">
                            <input className="form-control" type="date" value={this.state.TodoItem.TodoExpireDate} onChange={this.GetTodoExpireDate}/>
                        </div>
                        <div className="priority">
                            <select className="form-control" value={this.state.TodoItem.TodoPriority} onChange={this.GetTodoPriority}>
                            <option value="0">!!!!</option>
                            <option value="1">!!!</option>
                            <option value="2">!!</option>
                            <option value="3">!</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
export default NewTodoItem