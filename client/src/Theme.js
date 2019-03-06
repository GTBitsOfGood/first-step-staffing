import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#809bb3',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#efbc81',
      contrastText: '#ffffff'
    }
  },
  typography: { useNextVariants: true }
})

export default theme
