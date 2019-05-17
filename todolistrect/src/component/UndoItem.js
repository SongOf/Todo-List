import React from 'react'
import axios from 'axios'
const UPDATEITEMURL='http://localhost:8000/api/v1/'

class UndoItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UndoItem:this.props.TodoItem
        }
        this.UpdateContent=this.UpdateContent.bind(this)
        this.UpdateExpireDate=this.UpdateExpireDate.bind(this)
        this.UpdatePriority=this.UpdatePriority.bind(this)
        this.DeleteUndoItem=this.DeleteUndoItem.bind(this)
        this.MakeDoneUndoItem=this.MakeDoneUndoItem.bind(this)
    }
    MakeDoneUndoItem(event){
        this.props.onMakeDone()
    }
    DeleteUndoItem(event){
        this.props.onDelete()
    }
    UpdateContent(event){
        let UndoItemTemp=this.state.UndoItem
        UndoItemTemp.TodoContent=event.target.value
        this.setState({UndoItem:UndoItemTemp})
        axios({
            method:'PATCH',
            url:UPDATEITEMURL+this.state.UndoItem.id+'/',
            headers:{'Content-Type':'application/json'},
            data:JSON.stringify({
                'TodoContent':event.target.value
            })
        })
    }
    UpdatePriority(event){
		console.log(event.target.value)
        let UndoItemTemp=this.state.UndoItem
        UndoItemTemp.TodoPriority=event.target.value
        this.setState({UndoItem:UndoItemTemp})
        axios({
            method:'PATCH',
            url:UPDATEITEMURL+this.state.UndoItem.id+'/',
            headers:{'Content-Type':'application/json'},
            data:JSON.stringify({
                'TodoPriority':event.target.value
            })
        })
    }
    UpdateExpireDate(event){
        let UndoItemTemp=this.state.UndoItem
        UndoItemTemp.TodoExpireDate=event.target.value
        this.setState({UndoItem:UndoItemTemp})
        axios({
            method:'PATCH',
            url:UPDATEITEMURL+this.state.UndoItem.id+'/',
            headers:{'Content-Type':'application/json'},
            data:JSON.stringify({
                'TodoExpireDate':event.target.value
            })
        })
    }
    render(){
        return (
            <div>
                <ul className="list-group">
                <li className={`${this.props.TodoItem.IsDone === true ? "list-group-item checked" : "list-group-item"}`}>
                    <div className="checkbox">
                        <input type="checkbox" className="checkbox-item" onChange={this.MakeDoneUndoItem} checked={this.props.TodoItem.IsDone}/>
                    </div> 
                    <div className="content">
                        <input className="form-control" value={this.state.UndoItem.TodoContent} type="text" onChange={this.UpdateContent}/>
                    </div>
                    <div className="expire_date">
                        <input className="form-control" value={this.state.UndoItem.TodoExpireDate} type="date" onChange={this.UpdateExpireDate}/>
                    </div>
                    <div className="priority">
                        <select className="form-control" value={this.state.UndoItem.TodoPriority} onChange={this.UpdatePriority}>
                        <option value="3">!</option>
                        <option value="2">!!</option>
                        <option value="1">!!!</option>
                        <option value="0">!!!!</option>
                        </select>
                    </div>
                    <div className="btn-delete">
                        <input type="image" src={require('./icon/delete.jpg')} alt="delete" className="btn-delete" onClick={this.DeleteUndoItem}/>
                    </div>
                </li>
                </ul>
            </div>
        )
    }
}

export default UndoItem