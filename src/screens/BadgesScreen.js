import React, { useState, useEffect } from "react";
import { Text, View, Modal, StyleSheet, Image } from "react-native";
import { TouchableOpacity, ScrollView, FlatList } from "react-native";
import { badges } from "../../assets/badgesArray";

export default function BadgesScreen() {
  const [activeTab, setActiveTab] = useState("All");

  let filteredBadges = badges;
  if (activeTab === "Locked") {
    filteredBadges = badges.filter((badge) => badge.name.endsWith("Grey"));
  } else if (activeTab === "Unlocked") {
    filteredBadges = badges.filter((badge) => !badge.name.endsWith("Grey"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabsRow}>
        {["All", "Unlocked", "Locked"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <View style={styles.tabInner}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab
                    ? styles.activeTabText
                    : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.underline} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredBadges}
        keyExtractor={(badge) => badge.name}
        numColumns={3}
        contentContainerStyle={styles.badgeGrid}
        renderItem={({ item }) => (
          <View style={styles.badgeCard}>
            <Image source={item.image} style={styles.badgeImage} />
          </View>
        )}
      />
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
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 0,
  },
  tabInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 18,
    marginBottom: 2,
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#000",
  },
  inactiveTabText: {
    fontWeight: "normal",
    color: "#b0b0b0",
  },
  underline: {
    height: 3,
    width: 28,
    backgroundColor: "#000",
    borderRadius: 2,
    marginTop: 2,
  },
  badgeCard: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  badgeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});
