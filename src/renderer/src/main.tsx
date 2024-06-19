import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/App.css'
import App from './App'
import { createTheme, CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
const rootElement = document.getElementById('root')

const theme = createTheme({
  components: {
    MuiModal: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopover: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
