import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView} from "react-native";

export default function CommunitiesScreen() {
return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search communities..."
        style={styles.searchBar}
      />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Look Up</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Search Result Name 1</Text>
        </View>

        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Search Result Name 2</Text>
        </View>

        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Search Result Name 3</Text>
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
}
});
