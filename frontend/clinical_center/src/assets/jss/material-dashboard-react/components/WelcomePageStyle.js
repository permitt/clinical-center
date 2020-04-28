import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme();

export const root = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };
 export const main =  {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  };
export const button = {
    margin: theme.spacing(1)
  }