export const groupsReducer = (state,action) => {
    switch(action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    index: action.index,
                    isForwardChevron: action.isForwardChevron
                }];
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
        case 'DELETE':

        default:
            return state;
    }
};