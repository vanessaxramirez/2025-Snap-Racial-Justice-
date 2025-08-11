import React, { useState, useEffect, useMemo } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

export default function CommunitiesScreen() {
  const navigation = useNavigation();
  const [userVerfication, setUserVerification] = useState("");
  const { user } = useAuthentication();
  const [communities, setCommunities] = useState([]);
  const [searchText, setSearchText] = useState("");

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

  const filteredCommunities = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return communities;
    return communities.filter((c) =>
      (c.orgName || "").toLowerCase().includes(q)
    );
  }, [communities, searchText]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find your Growth Circle</Text>
      <TextInput
        placeholder="Search communities..."
        style={styles.searchBar}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* After Search bar */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.groupCardContainer}>
          {filteredCommunities.map((community) => (
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
                  transition={150}
                  cachePolicy="memory-disk"
                  placeholder={null}
                  // resizeMode="cover"
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
  searchBar: {
    height: 40,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
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
    marginHorizontal: 1,
    marginTop: 16,
    shadowColor: "#111",
    shadowOpacity: 0.2,
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
