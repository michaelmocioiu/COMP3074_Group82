import React from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../data/logo/logo.webp")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
export default SplashScreen;
