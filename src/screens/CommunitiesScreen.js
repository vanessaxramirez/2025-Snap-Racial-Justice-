import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CommunitiesScreen() {
  const navigation = useNavigation();
  const [userVerfication, setUserVerification] = useState("");
  const { user } = useAuthentication();

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

  function handleCorrectPageNav() {
    fetchVerificationStatus();
    if (userVerfication === true) {
      navigation.navigate("Org Page", {});
    } else {
      navigation.navigate("Verification Page", {});
    }
  }

  const communities = [
    {
      id: 1,
      name: "Hispanic Heritage Foundation",
      members: 237,
      image:
        "https://drive.google.com/uc?export=download&id=1rYLophrBUzc_tNqJjUZmHrIME66FNhXE",
      subtitle: "Growth Circle · 237 Members",
    },
    {
      id: 2,
      name: "ColorStack",
      members: 120,
      image:
        "https://drive.google.com/uc?export=download&id=1rYLophrBUzc_tNqJjUZmHrIME66FNhXE",
      subtitle: "Growth Circle · 120 Members",
    },
    {
      id: 3,
      name: "America Needs You",
      members: 98,
      image:
        "https://drive.google.com/uc?export=download&id=1rYLophrBUzc_tNqJjUZmHrIME66FNhXE",
      subtitle: "Growth Circle · 98 Members",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Communities</Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          navigation.navigate("GC Search", {});
        }}
      >
        <Text style={styles.searchButtonText}>Search for Growth Circle</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {communities.map((community) => (
          <TouchableOpacity
            key={community.id}
            style={styles.communityCard}
            onPress={handleCorrectPageNav}
            activeOpacity={0.85}
          >
            <Image source={{ uri: community.image }} style={styles.avatar} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}> {community.name}</Text>
              <Text style={styles.cardSubtitle}> {community.subtitle}</Text>
            </View>
            <Icon
              name="chevron-forward"
              size={28}
              color="#bbb"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 12,
    textAlign: "center",
    color: "#222",
  },
  searchButton: {
    backgroundColor: "#0FADFF",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 20,
    shadowColor: "#0FADFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 30,
    paddingHorizontal: 12,
  },
  communityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    backgroundColor: "#eee",
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
