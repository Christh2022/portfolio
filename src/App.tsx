import { useState } from 'react'
import { LangContext } from './i18n/LangContext'
import type { Lang } from './i18n/translations'
import { LangSelect } from './Screens/LangSelect/LangSelect'
import Intro from './Screens/IntroSection/Intro'
import HeroSection from './Screens/HeroSection/HeroSection'
import ProjectsSection from './Screens/ProjectsSection/ProjectsSection'
import { AboutMe } from './Screens/AboutMe/AboutMe'
import { ContactSection } from './Screens/ContactSection/ContactSection'

type Screen = 'lang' | 'intro' | 'hero' | 'projects' | 'about' | 'contact'

function App() {
  const [screen, setScreen] = useState<Screen>('lang')
  const [lang,   setLang]   = useState<Lang>('fr')

  if (screen === 'lang') {
    return (
      <LangSelect onSelect={(l) => { console.log('[App] langue choisie:', l); setLang(l); setScreen('intro'); }} />
    )
  }

  return (
    <LangContext.Provider value={lang}>
      {screen === 'intro'    && <Intro      onEnter={() => setScreen('hero')} />}
      {screen === 'projects' && <ProjectsSection onBack={() => setScreen('hero')} />}
      {screen === 'about'    && <AboutMe    onBack={() => setScreen('hero')} />}
      {screen === 'contact'  && <ContactSection  onBack={() => setScreen('hero')} />}
      {screen === 'hero'     && (
        <HeroSection
          onProjects={() => setScreen('projects')}
          onAbout={()    => setScreen('about')}
          onContact={()  => setScreen('contact')}
        />
      )}
    </LangContext.Provider>
  )
}

export default App
