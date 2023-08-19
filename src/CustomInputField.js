import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const CustomInputField = ({
  onPress,
  value,
  icon,
  type,
  placeholder,
  bgColor,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,

        width: "85%",
        height: 50,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 30,
        flexDirection: "row",
        flexItem: "center",
        paddindLeft: 20,
        paddingRight: 20,
      }}
      onPress={onPress}
    >
      <Image source={icon} style={{ width: 30, height: 30 }} />
      <Text style={{ color: textColor }}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default CustomInputField;
