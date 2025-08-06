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
  const [groupChats, setGroupChats] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Groups");

  useEffect(() => {
    const groupChatCall = async () => {
      try {
        const { data, error } = await supabase.from("group_chats").select("*");
        console.log("inside call", data);
        if (error) {
          console.error("Error fetching group chats:", error);
        } else {
          console.log("fetch from supabase", data);
          setGroupChats(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    groupChatCall();
  }, []);
  //   console.log(groupChats)

  const membersCall = async () => {
    try {
      const { data, error } = await supabase.from("members").select("*");
      console.log("inside call to members", data);
      if (error) {
        console.error("Error fetching members list:", error);
      } else {
        console.log("fetch from supabase - members", data);
        setMembers(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ImageBackground
        source={require("../../assets/BGC.png")} // Replace with your image
        style={styles.headerBackground}
      />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.scrollContent}>
          <Image
            source={{
              uri: "https://drive.google.com/uc?export=download&id=1rYLophrBUzc_tNqJjUZmHrIME66FNhXE",
            }}
            style={styles.image}
          />
          <View style={{ marginTop: 20, marginLeft: 5 }}>
            <Text style={styles.groupName}>Non-Profit name</Text>
            <Text style={styles.growthCircle}>Growth Circle · 237 Members</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <TouchableOpacity style={styles.readMoreButton}>
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
          <View>
            <TouchableOpacity
              style={[
                styles.tabs,
                selectedTab === "Groups" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("Groups")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "Groups" && styles.activeTabText,
                ]}
              >
                Groups
              </Text>
            </TouchableOpacity>
            <View style={{ width: "100%", padding: 10 }}>
              {groupChats.map((chat) => (
                <TouchableOpacity key={chat.id}>
                  <Text style={styles.infoText}>{chat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "Members" && styles.activeTab]}
            onPress={() => setSelectedTab("Members")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Members" && styles.activeTabText,
              ]}
            >
              Members
            </Text>
          </TouchableOpacity>
          <View style={{ width: "100%", padding: 10 }}>
            {members.map((member) => (
              <TouchableOpacity key={member.id}>
                <Text style={styles.infoText}>{member.user}</Text>
                <Text style={styles.infoText}>{member.role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    // backgroundColor: "white",
  },
  scrollContent: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 225, // adjust this to the height of your header
    padding: 5,
    // paddingBottom: 60,
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: 250,
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  groupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 170,
    // marginBottom: 12,
    // backgroundColor: "white"
  },
  image: {
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 150 / 2,
  },
  groupName: {
    fontWeight: "bold",
    fontSize: 23,
  },
  growthCircle: {
    color: "#565656ff",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
  caption: {
    color: "#565656ff",
    fontSize: 14,
    textAlign: "center",
    marginTop: "5%",
    // backgroundColor: "white"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingBottom: 10,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  readMoreButton: {
    width: 240,
    height: 40,
    marginTop: "2%",
    marginLeft: 20,
    backgroundColor: "#0FADFF",
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 20,
    color: "black",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: "#000", // black underline
  },
  activeTabText: {
    color: "#000",
  },
});
