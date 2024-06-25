import { StyleSheet } from "react-native";

export const colors = {
  white: "#fff",
  darkGray1: "#666567",
  lightGray0: "#ededed",
  lightGray1: "#dddddd",
  lightGreen1: "#8aaf05",
  lightGreen2: "#1caa5c",
  lightBlue1: "#1caaaa",
  red: "#bc412b",
  black: "#121111",
} as const;

export const dimensions = {
  paddingSmall1: 2,
  paddingSmall2: 6,
  paddingSmall3: 10,
  paddingMedium: 18,
  paddingExtraLarge: 50,
  smallWidth1: 0.4,
  largeWidth1: 200,
  noMargin: 0,
  smallMargin: 6,
  marginMedium: 10,
  marginLarge1: 16,
  marginLarge2: 20,
  marginExtraLarge1: 45,
  smallFont1: 13,
  smallFont2: 14,
  mediumFont: 15,
  largeFont: 17.2,
  extraLargeFont: 20,
  extraLargeFont2: 24,
  tagFont: 11,
  borderRadiusRound: 30,
  smallGap: 4,
  largeGap: 20,
  borderRadius: 100,
};

const reusableStyles = StyleSheet.create({
  smallShadow: {
    shadowColor: colors.darkGray1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Android shadow property
    elevation: 5,
  },
});

export const styleUtils = StyleSheet.create({
  smallShadow: {
    ...reusableStyles.smallShadow,
  },

  cardContainer: {
    width: "auto",
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: colors.lightGray0,
    padding: 20,
    ...reusableStyles.smallShadow,
  },

  /* EACH ITEM STYLES ---> */
  // Each item in the list
  itemRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemColumnContainer: {
    justifyContent: "space-between",
    padding: dimensions.paddingMedium,
    backgroundColor: colors.lightGray1,
    marginBottom: dimensions.marginMedium,
  },

  // Each item in the list
  columnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: dimensions.marginLarge1,
  },

  /* <--- EACH ITEM STYLES */

  /* TEXT RELATED STYLES ---> */
  // tags like overpayment, outstanding, given and so on
  tag: {
    borderRadius: dimensions.borderRadiusRound,
    paddingHorizontal: dimensions.paddingSmall2,
    paddingVertical: dimensions.paddingSmall1,
    // marginRight: dimensions.marginLarge1,
  },
  tagText: {
    color: "white",
    fontSize: dimensions.tagFont,
    fontWeight: "500",
  },

  // Used for names and other important info
  largeText: {
    color: colors.black,
    fontSize: dimensions.largeFont,
    fontWeight: "500",
  },

  // for something like Price
  mediumText: {
    fontWeight: "500",
    fontSize: dimensions.mediumFont,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: dimensions.smallGap,
  },

  headerText: {
    color: "#171414",
    fontSize: dimensions.extraLargeFont,
    fontWeight: "bold",
    marginRight: 5,
  },

  smallText: {
    fontSize: dimensions.smallFont1,
  },

  /* ORIENTATION RELATED STYLES ---> */
  // for all containers that have button in the bottom
  flexContainer: {
    flex: 1,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  /* <---ORIENTATION RELATED STYLES */

  /* ADD BUTTON RELATED STYLES */
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "auto",
    alignItems: "center",
    gap: 100,
  },
  addButton: {
    backgroundColor: colors.lightGreen2,
    borderRadius: dimensions.borderRadiusRound,
    width: dimensions.paddingExtraLarge,
    height: dimensions.paddingExtraLarge,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: dimensions.extraLargeFont2,
  },
});

export const userFormStyles = StyleSheet.create({
  flexContainer: {
    padding: dimensions.paddingExtraLarge,
    alignItems: "center",
  },
  flexItem: {
    display: "flex",
    flexDirection: "row",
    gap: dimensions.largeGap,
    marginVertical: dimensions.marginLarge1,
  },
  textInput: {
    paddingBottom: dimensions.paddingSmall3,
    borderBottomWidth: dimensions.smallWidth1,
    borderBottomColor: colors.darkGray1,
    minWidth: dimensions.largeWidth1,
  },
  error: {
    color: colors.red,
    marginLeft: dimensions.marginExtraLarge1,
  },
});
