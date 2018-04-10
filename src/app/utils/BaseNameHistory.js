import {browserHistory} from 'react-router';
import { useBasename } from 'history';

export  const baseHistory = () => {
    return useBasename(() => browserHistory)({basename: '/admin/corporate'});
};
