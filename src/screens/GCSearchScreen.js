import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CommunitiesScreen() {
  const navigation = useNavigation();

  const communities = [
    { name: "Color in Code" },
    { name: "INROADS" },
    { name: "The Posse Foundation" },
    { name: "Code2040" },
    { name: "National Society of Black Engineers" },
    { name: "Latinas in Tech" },
    { name: "Management Leadership for Tomorrow" },
    { name: "ColorStack" },
    { name: "Black Girls CODE" },
    { name: "Hispanic Heritage Foundation" },
    { name: "National Urban League" },
    { name: "America Needs You" },
    { name: "The Brotherhood Sister Sol" },
  ];

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search communities..." style={styles.searchBar} />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Look Up</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {communities.map((community, index) => (
          <TouchableOpacity
            key={community.name}
            style={styles.communityCard}
            onPress={() => navigation.navigate("Org Page", {})}
            activeOpacity={0.85}
          >
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{community.name}</Text>
            </View>
            <Icon
              name="chevron-forward"
              size={24}
              color="#bbbb"
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
  searchBar: {
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    marginTop: 25,
    borderColor: "#ccc",
    borderWidth: 1,
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
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
