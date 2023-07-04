export const groupsReducer = (state,action) => {
    switch(action.type) {
        case 'ADD':
            return [...state, { text: action.text, id: Math.random().toString(), index: action.index }];
        case 'UPDATE':

        case 'DELETE':

        default:
            return state;
    }
};