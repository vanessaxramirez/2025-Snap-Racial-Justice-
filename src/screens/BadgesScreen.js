import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native";

export default function Badges() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <View style={styles.container}>
      <View style={styles.tabsRow}>
        {["All", "Locked", "Unlocked"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentBox}>
        {activeTab == "All" && (
          <Text style={styles.contentText}> Show Badges Here</Text>
        )}
        {activeTab == "Locked" && (
          <Text style={styles.contentText}> Show Badges Here</Text>
        )}
        {activeTab == "Unlocked" && (
          <Text style={styles.contentText}> Show Badges Here</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 60,
    alignItems: "center",
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FFFC00",
  },
  tabText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#565656",
  },
  activeTabText: {
    color: "#000",
  },
  contentBox: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentText: {
    fontSize: 18,
    color: "#333",
  },
});
