import {
  Image,
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Icon from "react-native-vector-icons/Ionicons";

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const [profilePicUrl, setProfilePicUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShLAGSlShdMBNrS74GAYZwCxd9J7STjxNEHQ&s"
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchProfilePic() {
        if (user === null) {
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.log("Profile pic fetch failure");
        } else if (data.avatar_url) {
          setProfilePicUrl(data.avatar_url);
        }
      }

      fetchProfilePic();
      setAstrology(userSign.sign);
    }, [user])
  );

  const userName =
    user?.user_metadata?.email?.slice(
      0,
      user.user_metadata.email.indexOf("@")
    ) || "User";

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ImageBackground
        source={require("../../assets/SnapBannerBackground.jpg")}
        style={styles.headerBackground}
      />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.scrollContent}>
          <Image source={{ uri: profilePicUrl }} style={styles.image} />
          <View style={{ marginTop: 20, marginLeft: 5 }}>
            <Text style={styles.groupName}>{userName}</Text>
            <Text style={styles.growthCircle}>Profile · {astrology}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={{ flexDirection: "row", paddingBottom: 20 }}>
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => navigation.navigate("Settings")}
            >
              <Icon
                name="settings-outline"
                size={20}
                color="#ffff"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.textButton}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.notificationButton}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="log-out-outline" size={20} color="#000" />
                <Text style={styles.inviteText}>Log Out</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Badges")}
              style={styles.inviteButton}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="trophy-outline" size={17} color="#000" />
                <Text style={styles.inviteText}>Badges</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.storiesView}>
          <Text style={styles.sectionHeader}>Profile Story</Text>
          <View style={styles.storyRow}>
            <View style={styles.storyBubble}>
              <Image
                source={{ uri: profilePicUrl }}
                style={styles.storyAvatar}
              />
            </View>
            <Text style={styles.storyName}>{userName}</Text>
          </View>
        </View>

        <View style={styles.sectionsContainer}>
          <TouchableOpacity
            style={styles.sectionCard}
            onPress={() => navigation.navigate("Communities")}
          >
            <View style={styles.cardContent}>
              <Icon name="people-outline" size={24} color="#0FADFF" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Growth Circles</Text>
                <Text style={styles.cardSubtitle}>251 Members</Text>
              </View>
              <Text style={styles.cardArrow}>›</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionCard}
            onPress={() => navigation.navigate("Astrology")}
          >
            <View style={styles.cardContent}>
              <Icon name="star-outline" size={24} color="#841584" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>Astrology</Text>
                <Text style={styles.cardSubtitle}>{astrology}</Text>
              </View>
              <Text style={styles.cardArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  image: {
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 45,
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
  readMoreButton: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    backgroundColor: "#0FADFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  textButton: {
    color: "#fbfbfbff",
    fontWeight: "bold",
  },
  notificationButton: {
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
  inviteText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  storiesView: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#000",
  },
  storyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  storyBubble: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: "#0FADFF",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  storyAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  storyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  sectionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 200,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  cardText: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 24,
    color: "#888",
  },
  badgesButton: {
    backgroundColor: "#FFFC00",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
