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
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NonProfitScreen() {
  const [groupChats, setGroupChats] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Groups");
  const navigation = useNavigation();

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
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.textButton}>Read More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Notification pressed")}
              style={styles.notificationButton}
            >
              <Icon name="notifications-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Invite pressed")}
              style={styles.inviteButton}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="person-add-outline" size={17} color="#000" />
                <Text style={styles.inviteText}> Invite</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.caption}>
            This Growth Circle and Growth Circle Group Chats are affiliated and
            managed by Black Girls who Code (BGC). Violation of Snapchat’s
            Community Guidelines could lead to blocking from Communities or an
            account lock.
          </Text>
        </View>

        {/* {Group/Member tabs} */}
        <View style={styles.tabContainer}>
          <View style={styles.tabRow}>
            {["Groups", "Members"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={styles.tabButton}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
                {selectedTab === tab && <View style={styles.activeTabLine} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Conditional Rendering for tabs */}
        {selectedTab === "Groups" ? (
          <View style={styles.groupCardContainer}>
            {groupChats.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={styles.groupChatItem}
                onPress={() => {
                  navigation.navigate("General Chat");
                }}
              >
                <View style={styles.chatLeft}>
                  <Text style={styles.chatIcon}>
                    {chat.isPrivate ? "🔒" : "#"}
                  </Text>
                </View>

                <View style={styles.chatMiddle}>
                  <Text style={styles.chatTitle}>{chat.name}</Text>
                  <Text style={styles.chatDescription}>{chat.description}</Text>
                </View>

                <View style={styles.chatRight}>
                  <Text style={styles.chatArrow}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{ width: "100%", padding: 10 }}>
            {members.map((member) => (
              <TouchableOpacity key={member.id}>
                <Text style={styles.infoText}>{member.user}</Text>
                <Text style={styles.infoText}>{member.role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    marginLeft: 10,
    backgroundColor: "#0FADFF",
    borderRadius: 30,
    justifyContent: "center", // ✅ center vertically
    alignItems: "center", // ✅ center horizontally
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
  tabContainer: {
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 12,
  },
  tabText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  activeTabLine: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: 40,
    backgroundColor: "#000",
    borderRadius: 1,
  },
  groupCardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  groupChatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  chatLeft: {
    marginRight: 12,
  },

  chatIcon: {
    fontSize: 30,
  },

  chatMiddle: {
    flex: 1,
  },

  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  chatDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  chatRight: {
    marginLeft: 12,
  },

  chatArrow: {
    fontSize: 30,
    color: "#888",
  },
  notificationButton: {
    width: 60,
    height: 40,
    marginLeft: 10,
    backgroundColor: "#e2e5e7ff",
    borderRadius: 30,
    justifyContent: "center", // ✅ center vertically
    alignItems: "center", // ✅ center horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inviteButton: {
    width: 80,
    height: 40,
    marginLeft: 10,
    backgroundColor: "#e2e5e7ff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
