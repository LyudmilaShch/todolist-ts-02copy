import {useAppDispatch} from "./hooks";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";


export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T){
    const dispatch = useAppDispatch()
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}