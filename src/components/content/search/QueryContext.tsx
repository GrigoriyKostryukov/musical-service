import React from 'react';
import { useContext } from 'react';

export { useQuery, QueryContext }

const QueryContext = React.createContext('');

function useQuery() {
    return useContext(QueryContext);
}