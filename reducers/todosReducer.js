export const todosReducer = (state,action) => {
    switch(action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    text: action.text,
                    id: Math.random().toString(),
                    index: action.index,
                    checked: false
                }
            ];
        case 'DELETE':
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
        default:
            return state;
    }
};