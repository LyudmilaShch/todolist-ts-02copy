import { createSelector } from '@reduxjs/toolkit'
import {AppRootStateType} from "./store";


const state = (state: AppRootStateType) => state

export const statusSelector = createSelector(state, state => state.app.status)
export const isInitializedSelector = createSelector(state, state => state.app.isInitialized)

export const errorSelector = createSelector(state, state => state.app.error)