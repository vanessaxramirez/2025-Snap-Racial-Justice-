import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TextInput, Image } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CommunitiesScreen() {
  const navigation = useNavigation();
return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Communities</Text>
      <TouchableOpacity style={styles.searchButton} onPress={() => {
            navigation.navigate("GC Search", {});
          }}>
        <Text style={styles.searchButtonText}>Search for Growth Circle</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Community Name 1</Text>
        </View>

        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Community Name 2</Text>
        </View>

        <View style={styles.communityCard}>
          <Text style={styles.cardText}>Community Name 3</Text>
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
