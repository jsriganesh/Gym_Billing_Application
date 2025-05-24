import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../../utils/colors";
import { ScreenName } from "../../utils/screenNames";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateActiveFooter } from "../../redux/slices/footerSlice";

const footerOptions = [
  {
    label: "Members",
    icon: require("../../assets/images/footerImage/home.png"),
    key: "Members",
    navigateTo: ScreenName.membersListPage,
  },
  {
    label: "Trainers",
    icon: require("../../assets/images/footerImage/booking.png"),
    key: "Trainers",
    navigateTo: ScreenName.membersListPage,
  },
  {
    label: "Reports",
    icon: require("../../assets/images/footerImage/booking.png"),
    navigateTo: ScreenName.membersListPage,
    key: "Reports",
  },
  {
    label: "Payments",
    icon: require("../../assets/images/footerImage/profile.png"),
    key: "Payments",
  },
  {
    label: "Profile",
    icon: require("../../assets/images/footerImage/profile.png"),
    key: "Profile",
  },
];

const Footer = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { selectedFooterOption } = useAppSelector((state) => state.footer);

  return (
    <View style={styles.container}>
      {footerOptions.map((opt, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              dispatch(updateActiveFooter(opt.key));
              if (opt.navigateTo) {
                navigation.navigate(opt.navigateTo as never);
              }
            }}
            key={index}
            style={
              selectedFooterOption === opt.key
                ? styles.activeSyle
                : styles.inActiveSyle
            }
          >
            <Image
              tintColor={
                selectedFooterOption === opt.key
                  ? colors.themeColor
                  : colors.white
              }
              source={opt.icon}
              style={{ height: 20, width: 20 }}
            />
            {selectedFooterOption === opt.key && (
              <Text style={{ color: colors.themeColor, marginLeft: 5 }}>
                {opt.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 50,
    backgroundColor: colors.themeColor,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeSyle: {
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 25,
    height: 30,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  inActiveSyle: {
    flexDirection: "row",
    borderRadius: 50,
    textAlignVertical: "center",
    textAlign: "center",
    verticalAlign: "middle",
    height: 35,
    width: 45,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
});
