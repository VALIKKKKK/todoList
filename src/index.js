import React from 'react';
import ReactDom from 'react-dom';
import ToDoList from './components/todo-list/todo-list';
import AppHeader from './components/app-header/app-header';
import SearchPanel from './components/search-panel/search-panel'
import ItemStatusFilter from './components/item-status-filter/item-status-filter'
import './index.css'
import ItemAddForm from './components/item-add-form/index'

class App extends React.Component{

    maxId = 4;

    state = {
        todoDate:
            ['Drink Coffee', 'Make Awesome App', 'Have a lunch'].map((i)=> this.createTodoItem(i)),
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
      this.setState(({todoDate}) => {
          const idD = todoDate.findIndex((el)=>el.id === id);
          const before = todoDate.slice(0,idD);
          const after = todoDate.slice(idD + 1);
          const newArr = [...before, ...after];
          return {
              todoDate: newArr
          };
      })
    };

    AddItem = (text) => {
          const newItem = this.createTodoItem(text);


        this.setState(({todoDate})=>{
            const newArr = [
                ...todoDate,
                newItem
            ];
            return {
                todoDate: newArr
            };
        })

    };

onToggleProperty = (id, todoDate, propName) => {
    const index = todoDate.findIndex((el) => el.id === id);
    const oldItem = todoDate[index];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
        ...todoDate.slice(0, index),
        newItem,
        ...todoDate.slice(index + 1)
    ];
};

    onToggleImportant = (id) => {
        this.setState(({todoDate}) => {
            return {todoDate: this.onToggleProperty(id, todoDate, 'Important')};
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoDate}) => {
            return {todoDate: this.onToggleProperty(id, todoDate, 'Done')};
        })
    };

    // onToggleDone = (id) => {
    //     this.setState(({todoDate}) => {
    //         const idD = todoDate.findIndex((el) => el.id === id);
    //         const oldItem = todoDate[idD];
    //         const newItem = {...oldItem, done: !oldItem.done};
    //         const newArray = [
    //             ...todoDate.slice(0, idD),
    //             newItem,
    //             ...todoDate.slice(idD + 1)
    //         ];
    //
    //         return {
    //             todoDate: newArray
    //         };
    //     });
    // };

    search(items, term) {

        if (term.length === 0){
            return items;
        }

       return items.filter((item) => {
            return item.label.toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchChange = (term) => {
        this.setState({term});
    };

    filter(items, filter) {
        switch (filter) {

            case 'all' :
                return items;

            case 'active' :
                return items.filter((item) => !item.done);

            case 'done' :
                return items.filter((item) => item.done);

            default :
                return items;

        }
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    render() {

        const visibleItems = this.filter(
            this.search(this.state.todoDate, this.state.term),
            this.state.filter);

        const doneCount = this.state.todoDate
            .filter((el) => el.done).length;

        const todoCount = this.state.todoDate.length - doneCount;

        return  (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={this.state.filter}
                    onFilterChange={this.onFilterChange}/>
                </div>

                <ToDoList todos={visibleItems}
                          onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}/>
                <ItemAddForm onAddItem={this.AddItem}/>
            </div>
        );
    }
}

ReactDom.render(<App/>,
    document.getElementById('root'));