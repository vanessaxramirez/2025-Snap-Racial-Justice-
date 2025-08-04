import { Image, Text, View, Button, StyleSheet, Pressable } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { TouchableOpacity } from "react-native";

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();

  useEffect(() => {
    setAstrology(userSign.sign);
  }),
    [];

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://cdn.myportfolio.com/a9356a26-3fa6-43b8-897a-91afdb90810f/f35e1e48-7e11-4b37-a5f4-7541e1c22392_rw_1200.png?h=3675b103bfa4c735433266229aae1e3d" }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2, margin:50 }}
      />
      <Text
        style={{
          justifyContents: "center",
          textAlign: "center",
          fontSize: 25,
          fontFamily: "Helvetica",
          fontWeight: "bold",
          color:"#000",
          marginTop: 15,
        }}
      >
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@"), // gets part before @ of email address, should use profile username instead
          )}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("Astrology");
        }}
        title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Communities", {});
          }}>
          <Text style={styles.buttonText}>communities</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate("Settings", {});
          }}>
          <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignItems: "center",
  },
    button: {
    width: 200,
    height: 50,
    backgroundColor: "#FFFC00", 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
