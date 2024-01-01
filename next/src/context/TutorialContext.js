import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const TutorialContext = createContext()

export const TutorialProvider = ({ children }) => {
  const [tutorialStep, setTutorialStep] = useState(
    () => (typeof window !== 'undefined' && +localStorage.getItem('tutorial')) || 0
  )

  useEffect(() => {
    if (tutorialStep) {
      localStorage.setItem('tutorial', tutorialStep)
    } else {
      localStorage.removeItem('tutorial')
    }
  }, [tutorialStep])

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
