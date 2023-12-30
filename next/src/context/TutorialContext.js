import React, { createContext, useContext, useState } from 'react'

const TutorialContext = createContext()

export const TutorialProvider = ({ children }) => {
  const [tutorialStep, setTutorialStep] = useState(0)

  // Functions to navigate through the tutorial
  const nextStep = () => setTutorialStep(tutorialStep + 1)
  const prevStep = () => setTutorialStep(tutorialStep - 1)
  const skipTutorial = () => setTutorialStep(null)

  return (
    <TutorialContext.Provider value={{ tutorialStep, nextStep, prevStep, skipTutorial }}>
      {children}
    </TutorialContext.Provider>
  )
}

export const useTutorial = () => useContext(TutorialContext)
