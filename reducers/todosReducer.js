export const todosReducer = (state,action) => {
    switch(action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    index: action.index,
                    checked: false
                }
            ];
            case 'UNCHECKED_ADD':
                return [
                    ...state,
                    {
                        text: action.text,
                        id: action.id,
                        index: action.index,
                        checked: false
                    }
                ];
                case 'CHECKED_ADD':
                    return [
                        ...state,
                        {
                            text: action.text,
                            id: action.id,
                            index: action.index,
                            checked: true
                        }
                    ];
        case 'DELETE':
            return state.filter((todo) => todo.id !== action.id);
        case 'UNCHECKED_DELETE':
                return state.filter((todo) => todo.id !== action.id);
        case 'CHECKED_DELETE':
            return state.filter((todo) => todo.id !== action.id);
        case 'UPDATE':
            const updatableTodoID = state.findIndex(
                (todo) => todo.id === action.id
            );
            const updatableTodo = state[updatableTodoID];
            const updatedItem = {
                ...updatableTodo,
                ...action.payload
            };
            const updatedTodo = [...state];
            updatedTodo[updatableTodoID] = updatedItem;
            return updatedTodo;
            case 'UNCHECKED_UPDATE':
                const updatableUncheckedTodoID = state.findIndex(
                    (todo) => todo.id === action.id
                );
                const updatableUncheckedTodo = state[updatableUncheckedTodoID];
                const updatedUncheckedItem = {
                    ...updatableUncheckedTodo,
                    ...action.payload
                };
                const updatedUncheckedTodo = [...state];
                updatedUncheckedTodo[updatableUncheckedTodoID] = updatedUncheckedItem;
                return updatedUncheckedTodo;
                case 'CHECKED_UPDATE':
                    const updatableCheckedTodoID = state.findIndex(
                        (todo) => todo.id === action.id
                    );
                    const updatableCheckedTodo = state[updatableCheckedTodoID];
                    const updatedCheckedItem = {
                        ...updatableCheckedTodo,
                        ...action.payload
                    };
                    const updatedCheckedTodo = [...state];
                    updatedCheckedTodo[updatableCheckedTodoID] = updatedCheckedItem;
                    return updatedCheckedTodo;
        default:
            return state;
    }
};