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

export default function NonProfitScreen() {
  const [groupChats, setGroupChats] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Groups");
  const [pinnedStories, setPinnedStories] = useState([]);
  const roleOrder = ["Admins", "Mentors", "Sprouts"];

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

    const fetchPinnedStories = async () => {
      console.log("inside fetch for stories");
      try {
        const { data, error } = await supabase
          .from("pinned_stories")
          .select("*");
        console.log("→ Supabase returned:", { data, error });
        if (error) {
          console.error("Error fetching pinned stories:", error);
        } else {
          setPinnedStories(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching stories:", error);
      }
    };

    fetchPinnedStories();

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
    membersCall();
  }, []);

  const membersByRole = members.reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = [];
    acc[member.role].push(member);
    return acc;
  }, {});

  const roleLabels = {
    super_star_admin: "SUPER STAR ADMINS",
    flower_mentor: "FLOWER MENTORS",
    // add more as needed...
  };

  //   console.log(groupChats)

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

          {/* Name and Growth Circle */}
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


            {/* Notification Bell */}
            <TouchableOpacity
              onPress={() => console.log("Notification pressed")}
              style={styles.notificationButton}
            >

              {/* Invite Button */}
              <Icon name="notifications-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Invite pressed")}
              style={styles.inviteButton}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="person-add-outline" size={17} color="#000" />
                <Text style={styles.inviteText}>  Invite</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Circle Description */}
          <Text style={styles.caption}>
            This Growth Circle and Growth Circle Group Chats are affiliated and
            managed by Black Girls who Code (BGC). Violation of Snapchat’s
            Community Guidelines could lead to blocking from Communities or an
            account lock.
          </Text>
        </View>

        {/* Stories  */}
        <View style={styles.storiesView}>
          <Text style={styles.sectionHeader}>Pinned Stories</Text>
          <ScrollView horizontal showsHorirzontalScrollIndicator={false}>
            {pinnedStories.map((story) => (
              <TouchableOpacity key={story.id} style={styles.storyCard}>
                <View style={styles.storyImageWrapper}>
                  <Image
                    source={{
                      uri: "https://drive.google.com/uc?export=download&id=1rYLophrBUzc_tNqJjUZmHrIME66FNhXE",
                    }}
                    style={styles.storyImage}
                  />
                  {story.is_featured && (
                    <View style={styles.starBadge}>
                      <Icon name="star" size={14} color="black" />
                    </View>
                  )}
                </View>
                <Text style={styles.storyTitle}>{story.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
              <TouchableOpacity key={chat.id} style={styles.groupChatItem}>
                <View style={styles.chatLeft}>
                  <Text style={styles.hashIcon}>
                    {chat.isPrivate ? (
                      <Icon
                        name="lock-closed"
                        // size={24}
                        color="#000"
                        style={styles.lockIcon}
                      />
                    ) : (
                      <Text style={styles.hashIcon}>#</Text>
                    )}
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
          <View>
            {/* ========== MEMBERS GROUPED BY ROLE ============= */}

            {Object.entries(membersByRole)
              .sort(
                ([roleA], [roleB]) =>
                  roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB)
              )
              .map(([roleKey, list]) => (
                <View key={roleKey} style={{ width: "100%", padding: 10 }}>
                  <Text style={styles.userRole}>
                    {roleLabels[roleKey] || roleKey.toUpperCase()}
                  </Text>

                  <View style={styles.membersCardContainer}>
                    <View style={styles.membersContainer}>
                      {list.map((member, idx) => (
                        <View
                          key={member.id}
                          style={[
                            styles.memberRow,
                            idx === list.length - 1 && { borderBottomWidth: 0 },
                          ]}
                        >
                          {/* LEFT: Avatar + Name/Username */}
                          <View style={styles.memberInfo}>
                            <Image
                              source={{ uri: member.profilePhoto }}
                              style={styles.memberAvatar}
                            />
                            <View style={styles.memberText}>
                              <Text style={styles.memberName}>
                                {member.name}
                              </Text>
                              <Text style={styles.memberUsername}>
                                {member.username}
                              </Text>
                            </View>
                          </View>

                          {/* RIGHT: Add + Remove */}
                          <View style={styles.memberActions}>
                            <TouchableOpacity
                              style={styles.addButton}
                              onPress={() => console.log("Add", member.id)}
                            >
                              <Icon
                                name="person-add-outline"
                                size={16}
                                color="#000"
                              />
                              <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.removeButton}
                              onPress={() => console.log("Remove", member.id)}
                            >
                              <Icon name="close" size={20} color="#888" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
          </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Conditional Rendering for tabs */}
        {selectedTab === "Groups" ? (
          <View style={styles.groupCardContainer}>
            {groupChats.map((chat) => (
              <TouchableOpacity key={chat.id} style={styles.groupChatItem}>
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
    fontSize: 18,
    color: "#999",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "700",
  },
  activeTabLine: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: 200,
    backgroundColor: "#000",
    borderRadius: 3,
  },
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

  // Chat Icons
  hashIcon: {
    fontSize: 30,
  },
  lockIcon: {
    fontSize: 25,
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
  // === Pinned Stories Section ===
  storiesView: {
    backgroundColor: "white",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#000",
  },

  storyCard: {
    alignItems: "center",
    marginRight: 16,
    width: 90,
  },

  storyImageWrapper: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00BFFF", // sky blue ring
    padding: 3,
    position: "relative",
    backgroundColor: "#fff", // inner background for contrast
  },

  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "cover",
  },

  storyTitle: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    maxWidth: 80,
  },

  starBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFD700", // gold
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },

  // ====== Members Tab ======
  userRole: {
    fontSize: 15,
    fontWeight: "600",
    color: "#999",
    marginTop: 13,
    marginLeft: 17,
  },
  membersContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // elevation for Android
    elevation: 2,
  },

  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  memberText: {
    flexShrink: 1,
  },

  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  memberUsername: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  memberActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFC00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },

  addButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
  },

  removeButton: {
    padding: 8,
  },
  membersCardContainer: {
    // backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
    marginHorizontal: 7,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
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