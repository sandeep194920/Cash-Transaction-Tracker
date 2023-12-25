import { StyleSheet } from 'react-native'

export const colors = {
  white: '#fff',
  darkGray1: '#666567',
  lightGray1: '#dddddd',
  lightGreen1: '#8aaf05',
  lightGreen2: '#1caa5c',
  lightBlue1: '#1caaaa',
  red: '#bc412b',
  black: '#121111',
}

export const dimensions = {
  paddingSmall1: 2,
  paddingSmall2: 6,
  paddingMedium: 18,
  paddingExtraLarge: 50,
  noMargin: 0,
  marginMedium: 10,
  marginLarge: 16,
  smallFont1: 13,
  smallFont2: 13,
  mediumFont: 14.5,
  largeFont: 17.2,
  extraLargeFont: 20,
  extraLargeFont2: 24,
  tagFont: 11,
  borderRadiusRound: 30,
  smallGap: 4,
}

export const styleUtils = StyleSheet.create({
  /* EACH ITEM STYLES ---> */
  // Each item in the list
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: dimensions.paddingMedium,
    backgroundColor: colors.lightGray1,
    marginBottom: dimensions.marginMedium,
  },

  // Each item in the list
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: dimensions.marginLarge,
  },

  /* <--- EACH ITEM STYLES */

  /* TEXT RELATED STYLES ---> */
  // tags like overpayment, outstanding, given and so on
  tag: {
    borderRadius: dimensions.borderRadiusRound,
    paddingHorizontal: dimensions.paddingSmall2,
    paddingVertical: dimensions.paddingSmall1,
    marginRight: dimensions.marginLarge,
  },
  tagText: {
    color: 'white',
    fontSize: dimensions.tagFont,
  },

  // Used for names and other important info
  largeText: {
    color: colors.black,
    fontSize: dimensions.largeFont,
    fontWeight: '500',
  },

  // for something like Price
  mediumText: {
    fontWeight: '500',
  },

  // used for displaying customer id and such sub texts
  subText: {
    color: colors.darkGray1,
    fontSize: dimensions.smallFont1,
    marginTop: dimensions.marginMedium,
  },

  /* <--- TEXT RELATED STYLES */
  // Header text related
  headerTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: dimensions.smallGap,
    marginVertical: dimensions.marginLarge,
  },

  headerText: {
    color: '#171414',
    fontSize: dimensions.extraLargeFont,
    fontWeight: 'bold',
  },

  smallText: {
    fontSize: dimensions.smallFont1,
  },

  /* ORIENTATION RELATED STYLES ---> */
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /* <---ORIENTATION RELATED STYLES */

  /* ADD BUTTON RELATED STYLES */
  // wrap any view that has add-button inside this addBtnCotainer
  addBtnContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: dimensions.paddingExtraLarge,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.lightGreen2,
    borderRadius: dimensions.borderRadiusRound,
    width: dimensions.paddingExtraLarge,
    height: dimensions.paddingExtraLarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: dimensions.extraLargeFont2,
  },
})
