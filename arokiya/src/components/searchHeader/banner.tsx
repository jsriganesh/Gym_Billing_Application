import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { colors } from "../../utils/colors";

export const Banner = () => {
  return (
    <View style={styles.bannerBody}>
      <View style={styles.bannerContainer}></View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerBody: {
    width: "100%",
    alignItems: "center",
    top: -60,
  },
  bannerContainer: {
    width: "80%",
    height: 120,
    backgroundColor: colors.lightBlack,
    borderRadius: 8,
  },
});
