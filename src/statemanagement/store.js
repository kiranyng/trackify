import { configureStore } from '@reduxjs/toolkit'

import projectStateReducer from './Project/ProjectReducer'

const store = configureStore({ reducer: projectStateReducer })

console.log(store.getState())

export default store;