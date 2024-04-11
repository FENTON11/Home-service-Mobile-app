import { ACTIONS } from './actions';
import { getUser, logout,setUser} from './appControllers';
export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.GET_USER:
                return getUser(state);
        case ACTIONS.SET_USER:
                return setUser(state,action.payload);
        case ACTIONS.LOGOUT:
                return logout(state);
        default:
            throw new Error('Unhandled action type: ' + action.type);
    }
};
