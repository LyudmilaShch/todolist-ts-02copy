import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {AppDispatch, useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";
import {errorSelector} from "../../app/selectors";
import {useAppDispatch} from "../../hooks/hooks";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
    const error = useAppSelector(errorSelector)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
    };


    const isOpen = error !== null

    return (
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
    );
}