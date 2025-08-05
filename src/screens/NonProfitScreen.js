import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { ScrollView } from "react-native";

export default function NonProfitScreen() {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View>
        <ImageBackground
          source={require("../../assets/BGC.png")} // Replace with your image
          style={styles.headerBackground}
        ></ImageBackground>
      </View>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.groupContainer}>
          <Image
            source={{
              uri: "https://drive.google.com/uc?export=download&id=1rYLophrBUzc_tNqJjUZmHrIME66FNhXE",
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.groupName}>Non-Profit name</Text>
            <Text style={styles.growthCircle}>Growth Circle · 237 Members</Text>
          </View>
        </View>
        <View style={{ marginTop: -350 }}>
          <TouchableOpacity
            style={styles.readMoreButton}
            // onPress={() => {
            //   navigation.navigate("Settings", {});
            // }}
          >
            <Text style={styles.textButton}>Read More</Text>
          </TouchableOpacity>
          <Text style={styles.caption}>
            This Growth Circle and Growth Circle Group Chats are affiliated and
            managed by Black Girls who Code (BGC). Violation of Snapchat’s
            Community Guidelines could lead to blocking from Communities or an
            account lock.
          </Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.tabs}>
            <Text style={styles.tabText}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabs}>
            <Text style={styles.tabText}>Members</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: 170,
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 170,
    // marginBottom: 12,
  },
  image: {
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 150 / 2,
  },
  groupName: {
    fontWeight: "bold",
    fontSize: "23",
  },
  growthCircle: {
    color: "#565656ff",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "5",
  },
  caption: {
    color: "#565656ff",
    fontSize: 14,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
    borderColor: "#ccc",
    fontSize: "20",
    fontWeight: "bold",
    // position: "absolute",
    bottom: 300,
    // left: 0,
    // right: 0,
    borderColor: "#ddd",
    paddingVertical: 12,
  },
  readMoreButton: {
    width: 300,
    height: 40,
    backgroundColor: "#4c9aedff",
    paddingVertical: 12,
    // paddingHorizontal: 25,
    borderRadius: 30,
    alignContent: "center",
    // marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    
  },
  textButton: {
    alignSelf: "center",
    color: "#fbfbfbff",
    fontWeight: "bold",
  },
  tabs: {
    alignItems: "center",
  },
  tabText: {
    fontWeight: "bold",
    fontSize: "20",
  },
});
