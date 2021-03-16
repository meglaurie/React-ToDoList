import React, { Component } from 'react';
import ToDoForm from './ToDoForm';
import ToDoItem from "./ToDoItem";

class Todo extends Component{
    state = {
        todos: [],
        toShow: 'all',
        toggleAllComplete: true
    };

    addToDo = (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id === id){
                   return{ 
                    id: todo.id,
                    text: todo.text,
                    complete: !todo.complete
                   }
                }else{
                    return todo;
                }
            })
        })
    }

    updateToShow = (s) => {
        this.setState({
            toShow: s
        })
    }

    handleDeleteToDo = id => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    removeComplete = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }

    render(){
        let todos = [];
         if(this.state.toShow === 'all'){
             todos = this.state.todos;
         }else if(this.state.toShow === 'active'){
             todos = this.state.todos.filter(todo => !todo.complete);
         }
         else if(this.state.toShow === 'complete'){
            todos = this.state.todos.filter(todo => todo.complete);
        }
        return (
            <div>
               <ToDoForm onSubmit={this.addToDo}/>
               {todos.map(todo =>(
                <ToDoItem
                    key={todo.id} 
                    toggleComplete={() => this.toggleAllComplete(todo.id)}  
                    onDelete = {() => this.handleDeleteToDo(todo.id)}
                    todo={todo}/>
                ))}
                <div>Todos left: {this.state.todos.filter(todo => !todo.complete).length}</div>
                <div>
                    <button onClick={() => this.updateToShow('all')}>All</button>
                    <button onClick={() => this.updateToShow('active')}>Active</button>
                    <button onClick={() => this.updateToShow('complete')}>Complete</button>
                </div>
                <div>
                    {this.state.todos.filter(todo => todo.complete).length ? 
                    <button onClick={this.removeComplete}>Remove all completed items</button> : null
                    }
                    </div>

                <div>
                    <button 
                        onClick={() => 
                            this.setState({
                                todos: this.state.todos.map( todo => ({
                                    ...todo,
                                    complete: this.state.toggleAllComplete
                                })),
                                toggleAllComplete: !this.state.toggleAllComplete
                            })
                        }
                    >Toggle all complete: {`${this.state.toggleAllComplete}`}</button>
                </div>
            </div>
        )
    }

}

export default Todo;