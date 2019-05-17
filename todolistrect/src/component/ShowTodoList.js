import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react'
import axios from 'axios'
import UndoItem from './UndoItem'
const GETUNDOLISTURL='http://localhost:8000/api/v1/'
const GETLISTBYPRIURL='http://localhost:8000/api/v1/getlistbypri/'
const GETLISTBYEXDATEURL='http://localhost:8000/api/v1/getlistbyexdate/'
const DELETEURL='http://localhost:8000/api/v1/'
const MAKEDONEURL='http://localhost:8000/api/v1/'

class ShowTodoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            PreviousPageUrl:"",
            NextPageUrl:"",
            PreviousPageUrlByPri:"",
            NextPageUrlByPri:"",
            PreviousPageUrlByDate:"",
            NextPageUrlByDate:"",
            OrderType:0,
            TodoList:[]
        }
        this.componentWillMount=this.componentWillMount.bind(this)
        this.GetUndoList=this.GetUndoList.bind(this)
        this.GetListByPri=this.GetListByPri.bind(this)
        this.GetListByeExDate=this.GetListByeExDate.bind(this)
        this.DeleteTodoItem=this.DeleteTodoItem.bind(this)
        this.MarkDone=this.MarkDone.bind(this)
        this.NextPage=this.NextPage.bind(this)
        this.PreviousPage=this.PreviousPage.bind(this)
        this.GetListByPriBtn=this.GetListByPriBtn.bind(this)
        this.GetListByeExDateBtn=this.GetListByeExDateBtn.bind(this)
        this.GetUndoListBtn=this.GetUndoListBtn.bind(this)
    }
    componentWillMount(){
        this.GetUndoListBtn()
    }
    GetUndoListBtn(){
        axios.get(GETUNDOLISTURL)
        .then(function(response){
            this.setState({OrderType:0,NextPageUrl:response.data.next,PreviousPageUrl:response.data.previous,TodoList:response.data.results})
        }.bind(this))
    }
    GetListByPriBtn(){
        axios.get(GETLISTBYPRIURL)
        .then(function(response){
            this.setState({OrderType:2,NextPageUrlByPri:response.data.next,PreviousPageUrlByPri:response.data.previous,TodoList:response.data.results})
        }.bind(this))
    }
    GetListByeExDateBtn(){
        axios.get(GETLISTBYEXDATEURL)
        .then(function(response){
            this.setState({OrderType:1,NextPageUrlByDate:response.data.next,PreviousPageUrlByDate:response.data.previous,TodoList:response.data.results})
        }.bind(this))
    }
    GetUndoList(url){
        axios.get(url)
        .then(function(response){
            this.setState({NextPageUrl:response.data.next,PreviousPageUrl:response.data.previous,TodoList:response.data.results})
        }.bind(this))
    }
    GetListByPri(url){
        axios.get(url)
        .then(function(response){
            this.setState({NextPageUrlByPri:response.data.next,PreviousPageUrlByPri:response.data.previous,TodoList:response.data.results})
        }.bind(this))
    }
    GetListByeExDate(url){
        axios.get(url)
        .then(function(response){
            this.setState({NextPageUrlByDate:response.data.next,PreviousPageUrlByDate:response.data.previous,TodoList:response.data.results})
        }.bind(this))
    }
    DeleteTodoItem(id){
        //参数是id
        axios({
            method:'DELETE',
            url:DELETEURL+id+'/',
        })
        .then(function(response){
            let TodoListTemp=[]
            this.state.TodoList.forEach(TodoItemTemp => {
                if(TodoItemTemp.id!==id){
                    TodoListTemp.push(TodoItemTemp)
                }
            })
            this.setState({TodoList:TodoListTemp})
        }.bind(this))
    }
    MarkDone(id){
        //参数是id
        axios({
            method:'PATCH',
            url:MAKEDONEURL+id+'/',
            headers:{'Content-Type':'application/json'},
            data:JSON.stringify({
                'IsDone':true
            })
        })
        .then(function(response){
            let TodoListTemp=[]
            this.state.TodoList.forEach(TodoItemTemp => {
                if(TodoItemTemp.id!==id){
                    TodoListTemp.push(TodoItemTemp)
                }
            })
            this.setState({TodoList:TodoListTemp})
        }.bind(this))
    }
    NextPage(){
        let OrderType=this.state.OrderType
        if(OrderType===0){
            this.GetUndoList(this.state.NextPageUrl)
        }
        else if(OrderType===1){
            this.GetListByeExDate(this.state.NextPageUrlByDate)
        }
        else{
            this.GetListByPri(this.state.NextPageUrlByPri)
        }
    }
    PreviousPage(){
        let OrderType=this.state.OrderType
        if(OrderType===0){
            this.GetUndoList(this.state.PreviousPageUrl)
        }
        else if(OrderType===1){
            this.GetListByeExDate(this.state.PreviousPageUrlByDate)
        }
        else{
            this.GetListByPri(this.state.PreviousPageUrlByPri)
        }
    }
    render(){
        return(
            <div>
                <div className="btn-group" role="group" aria-label="Order">
                    <button type="button" className="btn btn-secondary" onClick={this.GetUndoListBtn}>NO Order</button>
                    <button type="button" className="btn btn-secondary" onClick={this.GetListByeExDateBtn}>Order by Expire Date</button>
                    <button type="button" className="btn btn-secondary" onClick={this.GetListByPriBtn}>Order by Priority</button>
                </div>
                <ul className = "list-group">
                {
                    this.state.TodoList.map((TodoItemTemp)=> (
                    <UndoItem TodoItem={TodoItemTemp} key={TodoItemTemp.id} 
                        onDelete={() => this.DeleteTodoItem(TodoItemTemp.id)}
                        onMakeDone={() => this.MarkDone(TodoItemTemp.id)}/>))
                }
                </ul>
                <nav className="text-center">
                <ul class="pager">
                    <li onClick={this.PreviousPage}><a href="#">上一页</a></li>
                    <li onClick={this.NextPage}><a href="#">下一页</a></li>
                </ul>
                </nav>
            </div>
        )
    }
}

export default ShowTodoList