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
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CommunitiesScreen() {
  const { user } = useAuthentication();
  const navigation = useNavigation();
  const [modalVisibleInvalid, setInvalidModalVisible] = useState(false);
  const [modalVisibleValid, setValidModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  async function handleVerficationUpdate() {
    const { error } = await supabase
      .from("profiles")
      .update({ verificationStatus: true })
      .eq("id", user.id);
  }

  const handlePress = () => {
    if (inputValue.endsWith(".edu")) {
      setValidModalVisible(true);
      handleVerficationUpdate();
      console.log("User input:", inputValue);
    } else {
      setInvalidModalVisible(true);
      console.log("invalid email must use a student email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Student Email to verify</Text>
      <TextInput
        placeholder="Enter Student Email Here"
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.searchBar}
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          handlePress();
        }}
      >
        <Text style={styles.searchButtonText}>Verify Email</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleInvalid}
        onRequestClose={() => setInvalidModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Invalid Email Please Use a Student Email
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setInvalidModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleValid}
        onRequestClose={() => setValidModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Verification Complete</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setValidModalVisible(false);
                navigation.navigate("Communities", {});
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    paddingTop: 100,
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
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#241978ff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: { color: "#fff" },
});
