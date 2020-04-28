import { createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme();

export const formStyle =  {
  width: '100%', 
  marginTop: theme.spacing(3)
}
export const submitButton = {
  margin: theme.spacing(3, 0 , 2)
}
export const avatar =  {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  };
export const paper = {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};