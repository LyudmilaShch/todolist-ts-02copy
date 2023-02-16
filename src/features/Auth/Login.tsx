import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from '@material-ui/core';
import {FormikHelpers, useFormik} from "formik";
import {AppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {isLoginInSelector} from "./selectors";
import {authActions} from "./index";
import {useActions} from "../../hooks/useActions";

type FormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = AppDispatch()
    const isLoginIn = useAppSelector(isLoginInSelector)
    const {loginTC} = useActions(authActions)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email){
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password){
                return {
                    password: 'Password is required'
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
          const action = await dispatch(authActions.loginTC(values));

          if (loginTC.rejected.match(action)) {
              if (action.payload?.fieldsErrors?.length){
                  const error = action.payload?.fieldsErrors[0]
                  formikHelpers.setFieldError(error.field, error.error)
              }
          }
        },
    });

    if (isLoginIn){
        return <Navigate to={"/"}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>

                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox/> }
                                          {...formik.getFieldProps("rememberMe")}
                                          checked={formik.values.rememberMe}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}