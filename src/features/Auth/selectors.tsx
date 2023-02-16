import {createSelector} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../app/store";
const state = (state: AppRootStateType) => state
export const isLoginInSelector = createSelector(state, state => state.auth.isLoginIn)