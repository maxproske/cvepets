import { createContext, useReducer, useContext, useMemo } from 'react'

const initialState = {
  pet: null,
}

export const GlobalContext = createContext(initialState)

GlobalContext.displayName = 'GlobalContext'

const globalReducer = (state, action) => {
  switch (action.type) {
    case `UPDATE_PET`:
      const { pet } = action
      return {
        ...state,
        pet,
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

  const value = useMemo(
    () => ({
      ...state,
      updatePet,
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
