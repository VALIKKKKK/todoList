import React from 'react';
import './todo-list-item.css'

class ToDoListItem extends React.Component {

    render() {

        const {label, onDeleted,
        onToggleImportant,
        onToggleDone, important: isImportant, done: isDone} = this.props;

        const style = {
            color: isImportant ? 'red' : 'black',
            fontWeight: isImportant ? 'bold' : 'normal'
        };

        let classNames = 'todo-list-item';

        if(isDone) {
            classNames += ' done';
        }

        if(isImportant) {
            classNames += ' important'
        }

        return (
            <span className={classNames}>
            <span className={"todo-list-item-label"}
                  style={style}
                  onClick={onToggleDone}>
              {label}
            </span>
        <button type={"button"}
                className={"btn btn-outline-success btn-sm float-right"}
        onClick={onToggleImportant}>
            <i className={"fa fa-exclamation"}/>
        </button>
        <button type={"button"}
                className={"btn btn-outline-danger btn-sm float-right"}
        onClick={onDeleted}>
            <i className={"fa fa-trash-o"}/>
        </button>
      </span>
        );
    }

}


export default ToDoListItem;