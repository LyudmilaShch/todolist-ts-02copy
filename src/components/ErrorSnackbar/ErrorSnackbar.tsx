import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {appActions} from "../../features/CommonActions/App";
import {errorSelector} from "../../app/selectors";
import {useActions} from "../../utils/redux-utils";
import { useSelector } from 'react-redux';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ErrorSnackbar() {
    const error = useSelector(errorSelector)

    const {setAppError} = useActions(appActions)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppError({error: null})
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