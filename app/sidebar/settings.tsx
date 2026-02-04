import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          Alert.alert("Logged out", "You have been logged out successfully");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 12,
            backgroundColor: isDark ? "#1a1a2e1a" : "#f5f5f51a",
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backIcon}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Mipangilio
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔔 Notifications
          </ThemedText>

          <View
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <View style={styles.settingLabel}>
              <ThemedText style={styles.itemLabel}>
                Ride Notifications
              </ThemedText>
              <ThemedText style={styles.itemDesc}>
                Get notified for ride requests
              </ThemedText>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#ccc", true: "#81C784" }}
              thumbColor={notifications ? "#4CAF50" : "#f4f3f4"}
            />
          </View>

          <View
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <View style={styles.settingLabel}>
              <ThemedText style={styles.itemLabel}>Sound</ThemedText>
              <ThemedText style={styles.itemDesc}>
                Enable notification sounds
              </ThemedText>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: "#ccc", true: "#81C784" }}
              thumbColor={soundEnabled ? "#4CAF50" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔒 Privacy & Security
          </ThemedText>

          <View
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <View style={styles.settingLabel}>
              <ThemedText style={styles.itemLabel}>Data Collection</ThemedText>
              <ThemedText style={styles.itemDesc}>
                Allow us to collect usage data
              </ThemedText>
            </View>
            <Switch
              value={dataCollection}
              onValueChange={setDataCollection}
              trackColor={{ false: "#ccc", true: "#81C784" }}
              thumbColor={dataCollection ? "#4CAF50" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
            onPress={() =>
              Alert.alert(
                "Privacy Policy",
                "Privacy policy content coming soon",
              )
            }
          >
            <View style={styles.settingLabel}>
              <ThemedText style={styles.itemLabel}>Privacy Policy</ThemedText>
              <ThemedText style={styles.itemDesc}>
                Read our privacy terms
              </ThemedText>
            </View>
            <ThemedText style={styles.arrowIcon}>→</ThemedText>
          </TouchableOpacity>
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📱 App Settings
          </ThemedText>

          <TouchableOpacity
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
            onPress={() => Alert.alert("About", "Simba Driver App v1.0.0")}
          >
            <View style={styles.settingLabel}>
              <ThemedText style={styles.itemLabel}>About App</ThemedText>
              <ThemedText style={styles.itemDesc}>Version 1.0.0</ThemedText>
            </View>
            <ThemedText style={styles.arrowIcon}>→</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
            onPress={() =>
              Alert.alert("Clear Cache", "Cache cleared successfully")
            }
          >
            <View style={styles.settingLabel}>
              <ThemedText style={styles.itemLabel}>Clear Cache</ThemedText>
              <ThemedText style={styles.itemDesc}>
                Free up app storage
              </ThemedText>
            </View>
            <ThemedText style={styles.arrowIcon}>→</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            👤 Account
          </ThemedText>

          <TouchableOpacity
            style={[
              styles.settingItem,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
            onPress={handleLogout}
          >
            <View style={styles.settingLabel}>
              <ThemedText style={[styles.itemLabel, { color: "#FF6B6B" }]}>
                Logout
              </ThemedText>
              <ThemedText style={styles.itemDesc}>
                Sign out of your account
              </ThemedText>
            </View>
            <ThemedText style={[styles.arrowIcon, { color: "#FF6B6B" }]}>
              →
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  settingLabel: {
    flex: 1,
  },
  itemLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 12,
    opacity: 0.6,
  },
  arrowIcon: {
    fontSize: 18,
    marginLeft: 12,
    opacity: 0.6,
  },
});
