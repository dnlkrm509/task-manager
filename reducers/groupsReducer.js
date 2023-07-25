export const groupsReducer = (state,action) => {
    switch(action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    index: action.index
                }];
        case 'UPDATE':

        case 'DELETE':

        default:
            return state;
    }
};