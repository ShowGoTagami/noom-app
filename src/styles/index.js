import { FONT_WEIGHT, FONT_SIZE, COLORS } from './constants';
import { makeStyles, createStyles } from '@material-ui/core/styles';
export { CssBaseline } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    mainContensHeight: {
      height: "calc(100vh - 64px)",
    },
    container: {
      position: 'relative',
      maxWidth: '600px',
      margin: '0 auto',
    },
    headerContainer: {
      margin: '0 auto',
      width: '600px',
    },
    fitWidth: {
      width: '100%',
    },
    fontWeightBold: {
      fontWeight: FONT_WEIGHT.bold,
    },
    textUnderline: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    noneLowerCase: {
      textTransform: 'none',
    },
    whiteBackground: {
      backgroundColor: COLORS.white,
    },
    conversionButton: {
      fontWeight: FONT_WEIGHT.bold,
      borderRadius: '20px',
      fontSize: `${FONT_SIZE.body1}px`,
    },
    conversionWrapper: {
      margin: '0 auto',
      width: '300px',
      paddingTop: '8px',
    },
    loadingCardOnModal: {
      position: 'absolute',
      bottom: '50%',
      right: '40%',
    },
    disableFocus: {
      '&:focus': {
        outline: 0,
      },
    },
    defaultTextField: {
      padding: '10px',
    },
    postExampleTitle: {
      fontWeight: FONT_WEIGHT.bold,
      lineHeight: '46px',
    },
    scrollableWrapper: {
      height: '65vh',
      overflow: 'scroll',
    }
  })
);
