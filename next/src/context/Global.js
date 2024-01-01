import { createContext, useReducer, useContext, useMemo, useEffect } from 'react'

const initialState = {
  pet: (typeof window !== 'undefined' && localStorage.getItem('pet')) || null,
  task:
    (typeof window !== 'undefined' && localStorage.getItem('task') && JSON.parse(localStorage.getItem('task'))) || null,
}

export const GlobalContext = createContext(initialState)

GlobalContext.displayName = 'GlobalContext'

const globalReducer = (state, action) => {
  switch (action.type) {
    case `UPDATE_PET`:
      const { pet } = action

      localStorage.setItem('pet', pet)

      return {
        ...state,
        pet,
      }
    case `UPDATE_TASK`:
      const { task } = action

      localStorage.setItem('task', JSON.stringify(task))

      return {
        ...state,
        task,
      }
    default: {
      console.error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)

  const updatePet = (pet) => dispatch({ type: 'UPDATE_PET', pet })
  const updateTask = (task) => dispatch({ type: 'UPDATE_TASK', task })

  const value = useMemo(
    () => ({
      ...state,
      updatePet,
      updateTask,
    }),
    [state]
  )

  return <GlobalContext.Provider value={value} {...props} />
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error(`useGlobal must be used within a GlobalProvider`)
  }
  return context
}

export const GlobalContextWrapper = ({ children }) => <GlobalProvider>{children}</GlobalProvider>
