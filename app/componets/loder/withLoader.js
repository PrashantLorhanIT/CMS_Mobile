import React, { Component } from 'react';
import Loader from './Loader';
import { useSelector } from 'react-redux';

const withLoader = (WrappedComponent) => {
    return (props) => {
        const isLoading = useSelector(state => state.globalReducer.isLoading);
        return (
            <>
                <WrappedComponent {...props} />
                <Loader isLoading={isLoading} />
            </>
        );
    }
}

export default withLoader;