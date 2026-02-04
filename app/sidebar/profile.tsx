import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const driverInfo = {
    name: "France Masama",
    email: "france.masama@example.com",
    phone: "+255 712 345 678",
    rating: 4.8,
    completedRides: 245,
    joinedDate: "Jan 15, 2023",
    accountStatus: "Active",
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
          Profili Yangu
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              borderColor: isDark ? "#333" : "#e0e0e0",
            },
          ]}
        >
          <ThemedText style={styles.avatar}>👤</ThemedText>
          <ThemedText type="subtitle" style={styles.nameText}>
            {driverInfo.name}
          </ThemedText>
          <View style={styles.ratingContainer}>
            <ThemedText style={styles.ratingText}>
              ⭐ {driverInfo.rating}
            </ThemedText>
            <ThemedText style={styles.statusBadge}>
              {driverInfo.accountStatus}
            </ThemedText>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <ThemedText style={styles.statNumber}>
              {driverInfo.completedRides}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Trips Completed</ThemedText>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <ThemedText style={styles.statNumber}>
              {driverInfo.rating}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Rating</ThemedText>
          </View>
        </View>

        {/* Info Section */}
        <View
          style={[
            styles.infoSection,
            {
              backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              borderColor: isDark ? "#333" : "#e0e0e0",
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Account Details
          </ThemedText>

          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Email</ThemedText>
            <ThemedText style={styles.infoValue}>{driverInfo.email}</ThemedText>
          </View>

          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Phone</ThemedText>
            <ThemedText style={styles.infoValue}>{driverInfo.phone}</ThemedText>
          </View>

          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Joined</ThemedText>
            <ThemedText style={styles.infoValue}>
              {driverInfo.joinedDate}
            </ThemedText>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => {
            Alert.alert("Edit Profile", "Feature coming soon!");
          }}
        >
          <ThemedText style={styles.actionButtonText}>Edit Profile</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#2196F3" }]}
          onPress={() => {
            Alert.alert("Change Password", "Feature coming soon!");
          }}
        >
          <ThemedText style={styles.actionButtonText}>
            Change Password
          </ThemedText>
        </TouchableOpacity>
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
  profileCard: {
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
  },
  avatar: {
    fontSize: 60,
    marginBottom: 12,
  },
  nameText: {
    marginBottom: 8,
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ratingText: {
    fontSize: 16,
  },
  statusBadge: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#4CAF50",
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  infoSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  infoLabel: {
    opacity: 0.6,
    fontSize: 14,
  },
  infoValue: {
    fontWeight: "600",
    fontSize: 14,
  },
  actionButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
