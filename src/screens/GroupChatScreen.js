import { React, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { useRealtimeChat } from "../utils/hooks/use-realtime-chat.js";
import { useChatScroll } from "../utils/hooks/use-chat-scroll.js";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function GroupChatScreen({ route, navigation }) {
  const { user } = useAuthentication();
  const username = user?.email || "Guest";
  //const isSender = item.user_email === username;

  const { chatId, communityId, chatName } = route.params || {};

  const roomName = chatId ? `chat_${chatId}` : "global_room";

  const { messages, sendMessage, isConnected } = useRealtimeChat({
    roomName: roomName,
    username,
  });

  const [input, setInput] = useState("");
  const { containerRef, scrollToBottom } = useChatScroll();

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {chatName || "Growth Circle Chat"}</Text>
      <FlatList
        ref={containerRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const messageUser =
            item.user?.name.split("@")[0] ||
            item.user_email.split("@")[0] ||
            "Unknown";
          const isSender = messageUser === username.split("@")[0];
          // Assign a color based on username (simple hash for demo)
          const colors = [
            "#3B82F6",
            "#F59E42",
            "#F472B6",
            "#10B981",
            "#FBBF24",
          ];
          const colorIdx =
            Math.abs(
              messageUser.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
            ) % colors.length;
          const userColor = colors[colorIdx];

          return (
            <View style={styles.messageContainer}>
              <Text style={[styles.username, { color: userColor }]}>
                {messageUser}
              </Text>
              <View style={styles.bubbleRow}>
                <View style={[styles.stripe, { backgroundColor: userColor }]} />
                <View style={styles.bubble}>
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              </View>
            </View>
          );
        }}
        onContentSizeChange={scrollToBottom}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputBar}>
          <Ionicons
            name="camera-outline"
            size={26}
            color="#222"
            style={styles.inputIcon}
          />
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Send a chat"
            placeholderTextColor="#b0b0b0"
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Feather name="send" size={22} color="#222" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
    marginVertical: 63,
  },

  messageContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
    width: "100%",
    maxWidth: "100%",
  },
  username: {
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "sans-serif-medium",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 0,
    marginLeft: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    lineHeight: 18,
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    alignSelf: "flex-start",
  },
  stripe: {
    width: 3,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    marginRight: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 18,
    minHeight: 40,
    justifyContent: "center",
    marginLeft: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Avenir Next" : "sans-serif-medium",
    lineHeight: 22,
    letterSpacing: 0.1,
    fontSize: 18,
  },
  inputContainer: {
    padding: 12,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 44,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderRadius: 20,
    color: "#222",
  },
  sendButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
});
