import { createSelector } from '@reduxjs/toolkit'
import {AppRootStateType} from "../app/store";


const state = (state: AppRootStateType) => state

export const statusSelector = createSelector(state, state => state.app.status)

export const errorSelector = createSelector(state, state => state.app.error)