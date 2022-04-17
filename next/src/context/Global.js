import { createContext, useReducer, useContext, useMemo } from 'react'

const initialState = {
  starter: null,
}

export const GlobalContext = createContext(initialState)

GlobalContext.displayName = 'GlobalContext'

const globalReducer = (state, action) => {
  switch (action.type) {
    case `UPDATE_STARTER`:
      const { starter } = action
      return {
        ...state,
        starter,
      }
    default: {
      console.error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState)

  const updateStarter = (starter) => dispatch({ type: 'UPDATE_STARTER', starter })

  const value = useMemo(
    () => ({
      ...state,
      updateStarter,
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
