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
        <TouchableOpacity
          onPress={() => {
            handleCorrectPageNav();
          }}
        >
          <View style={styles.communityCard}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Org Page", {});
              }}
            ></TouchableOpacity>
            <Text style={styles.cardText}>Hispanic Heritage Foundation</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleCorrectPageNav();
          }}
        >
          <View style={styles.communityCard}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Org Page", {});
              }}
            ></TouchableOpacity>
            <Text style={styles.cardText}>ColorStack</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleCorrectPageNav();
          }}
        >
          <View style={styles.communityCard}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Org Page", {});
              }}
            ></TouchableOpacity>
            <Text style={styles.cardText}>America Needs You </Text>
          </View>
        </TouchableOpacity>
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
    paddingBottom: 30,
  },
  communityCard: {
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
