import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { badges } from "../../assets/badgesArray";

export default function NonProfitScreen() {
  const route = useRoute();
  const { id: growthCircleID } = route.params;
  const [organization, setOrganization] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Groups");
  const navigation = useNavigation();
  const [pinnedStories, setPinnedStories] = useState([]);
  const roleOrder = ["Admins", "Mentors", "Sprouts"];

  useEffect(() => {
    const orgDataCall = async () => {
      try {
        const { data, error } = await supabase
          .from("growthCircles")
          .select("*")
          .eq("id", growthCircleID);
        // console.log("grabbing specific group data: ", data);
        if (error) {
          console.error("Error fetching group:", error);
        } else {
          setOrganization(data);
          console.log("i just sent these", organization);
          const orgRow = data[0];
          const ids = orgRow.orgChats;
          // console.log("orgChats ids from growthCircles:", ids);
          if (!ids.length) {
            setGroupChats([]);
            return;
          }

          const { data: chats, error: chatsError } = await supabase
            .from("group_chats")
            .select("*")
            .in("id", ids);

          if (chatsError) {
            console.error("Error fetching group chats:", chatsError);
          } else {
            setGroupChats(chats);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (growthCircleID) {
      orgDataCall();
    }

    // const groupChatCall = async () => {
    //   try {
    //     const { data, error } = await supabase.from("group_chats").select("*");
    //     if (error) {
    //       console.error("Error fetching group chats:", error);
    //     } else {
    //       setGroupChats(data);
    //     }
    //   } catch (error) {
    //     console.error("Unexpected error:", error);
    //   }
    // };

    // groupChatCall();

    const fetchPinnedStories = async () => {
      try {
        const { data, error } = await supabase
          .from("pinned_stories")
          .select("*");
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
        if (error) {
          console.error("Error fetching members list:", error);
        } else {
          setMembers(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    membersCall();
  }, [growthCircleID]);

  const membersByRole = members.reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = [];
    acc[member.role].push(member);
    return acc;
  }, {});

  const roleLabels = {
    super_star_admin: "SUPER STAR ADMINS",
    flower_mentor: "FLOWER MENTORS",
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      {/* Organization Header */}
      {organization.map((org) => (
        <Image
          source={{ uri: org.headerImage }}
          style={styles.headerBackground}
          transition={150}
          cachePolicy="memory-disk"
          placeholder={null}
        />
      ))}

      {/* Profile Photo and Org's Name / number of members */}
      <ScrollView contentContainerStyle={styles.mainContainer}>
        {organization.map((org) => (
          <View key={org.id} style={styles.scrollContent}>
            <Image
              source={{
                uri: org.orgPhoto,
              }}
              style={styles.image}
              transition={150}
              cachePolicy="memory-disk"
              placeholder={null}
            />
            <View style={{ marginTop: 20, marginLeft: 5 }}>
              <Text style={styles.groupName}>{org.orgName}</Text>
              <Text style={styles.growthCircle}>
                Growth Circle · 237 Members
              </Text>
            </View>
          </View>
        ))}

        {/* Notification Bell/ Invite buttons */}
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
                <Text style={styles.inviteText}>Invite</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* OrgCaption */}
          {organization.map((org) => (
            <Text key={org.id} style={styles.caption}>
              {org.orgCaption}
            </Text>
          ))}
        </View>

        {/* Pinned Stories */}
        <View style={styles.storiesView}>
          <Text style={styles.sectionHeader}>Pinned Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...pinnedStories]
              .sort((a, b) => (a.is_featured ? -1 : b.is_featured ? 1 : 0))
              .map((story) => (
                <TouchableOpacity key={story.id} style={styles.storyCard}>
                  <View style={styles.storyImageWrapper}>
                    <Image
                      source={{
                        uri: story.imageURL,
                      }}
                      style={styles.storyImage}
                      transition={150}
                      cachePolicy="memory-disk"
                      placeholder={null}
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

        {/* Community Badges */}
        <View style={{ backgroundColor: "white", height: 180 }}>
          <View style={styles.badgesHeaderRow}>
            <Text style={styles.sectionHeader}>Community Badges</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Badges")}>
              <Text style={styles.badgesViewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgesCard}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgesRow}
            >
              {badges
                .filter((b) =>
                  [
                    "Apprentice_LvlSix",
                    "Apprentice_LvlEight_Grey",
                    "Apprentice_LvlNine_Grey",
                    "Apprentice_LvlThree_Grey",
                    "Apprentice_LvlSeven_Grey",
                  ].includes(b.name)
                )
                .map((badge, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.badgeWrap}
                    activeOpacity={0.85}
                    onPress={() => console.log("Pressed badge:", badge.name)}
                  >
                    <Image
                      source={badge.image}
                      style={styles.badgeIcon}
                      transition={150}
                      cachePolicy="memory-disk"
                      placeholder={null}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>

        {/* Group/Members Slider */}
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

        {/* Displaying Chats or Members */}
        {selectedTab === "Groups" ? (
          <View style={styles.groupCardContainer}>
            {groupChats
              // .slice() /
              .sort((a, b) => {
                if (a.isPrivate === b.isPrivate) return 0;
                return a.isPrivate ? -1 : 1;
              })
              .map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  style={styles.groupChatItem}
                  onPress={() => {
                    navigation.navigate("General Chat");
                  }}
                >
                  <View style={styles.chatLeft}>
                    <Text style={styles.hashIcon}>
                      {chat.isPrivate ? (
                        <Icon
                          name="lock-closed"
                          color="#000"
                          style={styles.lockIcon}
                        />
                      ) : (
                        "#"
                      )}
                    </Text>
                  </View>
                  <View style={styles.chatMiddle}>
                    <Text style={styles.chatTitle}>{chat.name}</Text>
                    <Text style={styles.chatDescription}>
                      {chat.description}
                    </Text>
                  </View>
                  <View style={styles.chatRight}>
                    <Text style={styles.chatArrow}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        ) : (
          <View>
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
                          <View style={styles.memberInfo}>
                            <Image
                              source={{ uri: member.profilePhoto }}
                              style={styles.memberAvatar}
                              transition={150}
                              cachePolicy="memory-disk"
                              placeholder={null}
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
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
  },
  scrollContent: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 225,
    padding: 5,
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  readMoreButton: {
    width: 240,
    height: 40,
    marginLeft: 10,
    backgroundColor: "#0FADFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  badgesHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 15,
    marginTop: 10,
  },
  badgesViewAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7a7a7a",
  },
  badgesCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  badgesRow: {
    alignItems: "center",
  },
  badgeWrap: {
    marginRight: 12,
  },
  badgeIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
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
    justifyContent: "center",
    alignItems: "center",
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
    marginLeft: 10,
    // marginRight: 16,
    width: 90,
  },
  storyImageWrapper: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00BFFF",
    padding: 3,
    position: "relative",
    backgroundColor: "#fff",
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
    backgroundColor: "#FFD700",
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
    borderRadius: 12,
    paddingVertical: 8,
    marginHorizontal: 7,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
