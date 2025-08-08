import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CommunitiesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search communities..." style={styles.searchBar} />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Look Up</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Color in Code</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Org Page", {});
          }}
        >
          <View style={styles.communityCard}>
            <Text style={styles.cardText}>INROADS</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.communityCard}>
          <Text style={styles.cardText}>The Posse Foundation</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Code2040</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>
            National Society of Black Engineers
          </Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Latinas in Tech</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>
            Management Leadership for Tomorrow
          </Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>ColorStack</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Black Girls CODE</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Hispanic Heritage Foundation</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>National Urban League</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>America Needs You</Text>
        </View>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>The Brotherhood Sister Sol</Text>
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
  searchBar: {
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
