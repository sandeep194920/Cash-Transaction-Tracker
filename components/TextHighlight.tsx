import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { colors, dimensions, styleUtils } from "../utils/styles";

const colorMap: Record<TextHighlightProps["type"], keyof typeof colors> = {
  info: "lightBlue1",
  success: "lightGreen1",
  warning: "red",
  highlight: "highlight",
};

interface TextHighlightProps {
  innerText: string;
  size?: "small" | "medium";
  outerText?: string;
  type: "info" | "success" | "warning" | "highlight";
  outerTextStyle?: StyleProp<TextStyle>;
}

const TextHighlight = ({
  innerText,
  outerText,
  size = "small",
  outerTextStyle,
  type,
}: TextHighlightProps) => {
  const bgColor = colors[colorMap[type]];
  return (
    <View
      style={{
        ...styleUtils.itemRowContainer,
        gap: 10,
      }}
    >
      <View style={{ ...styleUtils.tag, backgroundColor: bgColor }}>
        <Text
          style={{
            ...styleUtils.tagText,
            ...(size === "medium" && { fontSize: dimensions.mediumFont }),
          }}
        >
          {innerText}
        </Text>
      </View>
      {outerText && (
        <View>
          <Text style={[styleUtils.smallText, outerTextStyle]}>
            {outerText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TextHighlight;

const styles = StyleSheet.create({});
