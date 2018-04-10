import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
// import {middleware} from 'redux-data-table';

export const history = createHistory();
const middleware = routerMiddleware(history);
const middlewares = [
    thunk, middleware
];

const enhancers = [
    applyMiddleware(...middlewares),
];
// export function configureStore(initialState) {
//     return createStore(
//         rootReducer,
//         initialState,
//         compose(
//             // applyMiddleware(middleware),
//             ...enhancers,
//             DevTools.instrument()
//         )
//     );
// }


export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
        // applyMiddleware(middleware),
        ...enhancers,
        DevTools.instrument()
    ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
