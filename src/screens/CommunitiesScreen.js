import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CommunitiesScreen() {
  const navigation = useNavigation();
  const [userVerfication, setUserVerification] = useState("");
  const { user } = useAuthentication();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const communitiesCall = async () => {
      try {
        const { data, error } = await supabase
          .from("growthCircles")
          .select("id, orgName, orgPhoto, orgBlurb");
        // console.log("grabbing circles: ", data);
        if (error) {
          console.error("Error fetching group chats:", error);
        } else {
          setCommunities(data);
          // console.log("i just sent these", communities);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    communitiesCall();
  }, []);

  async function fetchVerificationStatus() {
    if (user === null) {
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("verificationStatus")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log("Verification Fetch Failure");
    } else if (data.verificationStatus) {
      setUserVerification(data.verificationStatus);
    }
  }
  fetchVerificationStatus();

  function handleCorrectPageNav(growthCircleID) {
    fetchVerificationStatus();
    if (userVerfication === true) {
      console.log("the ID:", growthCircleID);
      navigation.navigate("Org Page", { id: growthCircleID });
    } else {
      navigation.navigate("Verification Page", {});
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your Growth Circle</Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          navigation.navigate("GC Search", {});
        }}
      >
        <Text style={styles.searchButtonText}>Search for Growth Circle</Text>
      </TouchableOpacity>

      {/* After Search bar */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.groupCardContainer}>
          {communities.map((community) => (
            <TouchableOpacity
              key={community.id || community.orgName}
              style={styles.groupRow}
              onPress={() => {
                handleCorrectPageNav(community.id);
              }}
            >
              <View style={styles.chatLeft}>
                <Image
                  source={{
                    uri: community.orgPhoto,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                  onError={(e) => {
                    console.log(
                      "Image load error:",
                      community.orgPhoto,
                      e?.nativeEvent?.error
                    );
                  }}
                  onLoad={() =>
                    console.log("Loaded image:", community.orgPhoto)
                  }
                />
              </View>
              <View style={styles.chatMiddle}>
                <Text style={styles.chatTitle}>{community.orgName}</Text>
                <Text style={styles.chatDescription}>{community.orgBlurb}</Text>
              </View>
              <View style={styles.chatRight}>
                <Text style={styles.chatArrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: "#363b44ff",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    justifyContent: "space-between",
  },
  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  groupCardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    // paddingVertical: 8,
    marginHorizontal: 5,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  communityCard: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    backgroundColor: "#ddd",
  },
  chatLeft: {
    marginRight: 12,
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
});
