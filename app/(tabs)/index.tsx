import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [acceptedGigs, setAcceptedGigs] = useState<number[]>([]);
  const sidebarAnim = useRef(new Animated.Value(-280)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const mapHeightAnim = useRef(new Animated.Value(0)).current;

  const handleToggleOnline = async () => {
    const newOnlineStatus = !isOnline;
    setIsOnline(newOnlineStatus);

    if (user) {
      try {
        await supabase
          .from("drivers")
          .update({ is_online: newOnlineStatus })
          .eq("id", user.id);

        Alert.alert(
          "Success",
          newOnlineStatus
            ? "You're now online - receiving gigs"
            : "You're now offline - no gigs",
        );
      } catch (error) {
        console.error("Error updating status:", error);
        setIsOnline(!newOnlineStatus);
      }
    }
  };

  const handleAcceptGig = async (gigId: number, gigData: any) => {
    if (!isOnline) {
      Alert.alert("Error", "Please go online to accept gigs");
      return;
    }

    if (!user) return;

    try {
      await supabase.from("gigs").insert([
        {
          driver_id: user.id,
          from_location: gigData.from,
          to_location: gigData.to,
          distance: gigData.distance,
          eta: gigData.eta,
          amount: gigData.amount,
          passenger_name: gigData.passenger,
          status: "accepted",
          created_at: new Date().toISOString(),
        },
      ]);

      setAcceptedGigs([...acceptedGigs, gigId]);
      Alert.alert("Gig Accepted", "You accepted a gig successfully!");
    } catch (error: any) {
      Alert.alert("Error", "Failed to accept gig: " + error.message);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          mapHeightAnim.setValue(Math.min(gestureState.dy * -1, height * 0.5));
        } else if (mapExpanded) {
          mapHeightAnim.setValue(
            Math.max(height * 0.5 - gestureState.dy, height * 0.32),
          );
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const newExpanded =
          gestureState.dy < -50 || (mapExpanded && gestureState.dy > 50);
        setMapExpanded(newExpanded);
        Animated.timing(mapHeightAnim, {
          toValue: newExpanded ? height * 0.5 : 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    Animated.parallel([
      Animated.timing(sidebarAnim, {
        toValue: sidebarOpen ? -280 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: sidebarOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const gigs = [
    {
      id: 1,
      from: "Ardhi University",
      to: "Moroco Square",
      distance: "12 km",
      eta: "18 min",
      amount: "TSh 15,000",
      passenger: "John Doe",
    },
    {
      id: 2,
      from: "Chuo Cha Maji",
      to: "Tabata Segerea",
      distance: "8 km",
      eta: "12 min",
      amount: "TSh 10,000",
      passenger: "Jane Smith",
    },
    {
      id: 3,
      from: "Posta Station",
      to: "Mbagala",
      distance: "5 km",
      eta: "8 min",
      amount: "TSh 7,500",
      passenger: "Ahmed Hassan",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayAnim,
            pointerEvents: sidebarOpen ? "auto" : "none",
          },
        ]}
        onTouchEnd={toggleSidebar}
      />

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: sidebarAnim }],
            backgroundColor: isDark ? "#1a1a1a" : "#fff",
          },
        ]}
      >
        <View style={styles.sidebarContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
            <ThemedText style={styles.closeIcon}>✕</ThemedText>
          </TouchableOpacity>

          <View style={styles.sidebarHeader}>
            <ThemedText style={styles.sidebarAvatar}>👤</ThemedText>
            <View style={styles.sidebarUserInfo}>
              <ThemedText type="subtitle">France Masama</ThemedText>
              <ThemedText style={styles.userStatus}>⭐ 4.8</ThemedText>
            </View>
          </View>

          <View style={styles.sidebarDivider} />

          <Link href="/sidebar/profile" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <ThemedText style={styles.sidebarIcon}>👤</ThemedText>
              <ThemedText style={styles.sidebarLabel}>Profili yangu</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/sidebar/settings" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <ThemedText style={styles.sidebarIcon}>⚙️</ThemedText>
              <ThemedText style={styles.sidebarLabel}>Mipangilio</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/sidebar/help" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <ThemedText style={styles.sidebarIcon}>❓</ThemedText>
              <ThemedText style={styles.sidebarLabel}>Msaada</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/sidebar/vehicles" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <ThemedText style={styles.sidebarIcon}>🚗</ThemedText>
              <ThemedText style={styles.sidebarLabel}>Magari yangu</ThemedText>
            </TouchableOpacity>
          </Link>

          <View style={[styles.sidebarDivider, { marginTop: "auto" }]} />

          <TouchableOpacity
            style={[styles.sidebarItem, styles.logoutItem]}
            onPress={async () => {
              try {
                await signOut();
                toggleSidebar();
              } catch {
                Alert.alert("Error", "Failed to sign out");
              }
            }}
          >
            <ThemedText style={styles.sidebarIcon}>🚪</ThemedText>
            <ThemedText style={[styles.sidebarLabel, { color: colors.danger }]}>
              Toka nje
            </ThemedText>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Map Header with Controls */}
        <View style={[styles.mapHeader, { paddingTop: insets.top + 12 }]}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={toggleSidebar}
          >
            <ThemedText style={styles.profileIcon}>👤</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.onlineButton,
              { backgroundColor: isOnline ? colors.primary : colors.danger },
            ]}
            onPress={handleToggleOnline}
          >
            <ThemedText style={styles.onlineButtonText}>
              {isOnline ? "🟢" : "🔴"}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Draggable Map Container */}
        <Animated.View
          style={[
            styles.mapContainer,
            {
              backgroundColor: isDark ? colors.cardBackground : "#E0E0E0",
              height: mapHeightAnim.interpolate({
                inputRange: [0, height * 0.18],
                outputRange: [height * 0.32, height * 0.5],
                extrapolate: "clamp",
              }),
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle}>
            <View style={styles.dragIndicator} />
          </View>
          <ThemedText style={styles.mapText}>🗺️ Ramani</ThemedText>
          <View style={styles.mapPins}>
            <View style={[styles.pin, { top: "20%", right: "15%" }]}>
              <ThemedText>📍</ThemedText>
            </View>
            <View style={[styles.pin, { top: "45%", left: "20%" }]}>
              <ThemedText>📍</ThemedText>
            </View>
            <View style={[styles.pin, { bottom: "15%", right: "25%" }]}>
              <ThemedText>📍</ThemedText>
            </View>
          </View>
          <View style={styles.driverLocation}>
            <ThemedText style={styles.driverIcon}>🚗</ThemedText>
          </View>
        </Animated.View>

        {/* Gigs List */}
        <ScrollView
          style={styles.gigsList}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="subtitle" style={styles.gigsTitle}>
            Gigs Available ({gigs.length})
          </ThemedText>

          {!isOnline ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <ThemedText style={{ fontSize: 16, color: colors.danger }}>
                🔴 Go online to receive gigs
              </ThemedText>
            </View>
          ) : (
            gigs.slice(0, 3).map((gig) => (
              <TouchableOpacity
                key={gig.id}
                style={[
                  styles.gigCard,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <View style={styles.gigHeader}>
                  <View style={styles.gigLocation}>
                    <View style={styles.dotStart} />
                    <ThemedText style={styles.locationText} numberOfLines={1}>
                      {gig.from}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.gigAmount}>{gig.amount}</ThemedText>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.gigFooter}>
                  <View style={styles.gigLocation}>
                    <View style={styles.dotEnd} />
                    <ThemedText style={styles.locationText} numberOfLines={1}>
                      {gig.to}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.gigDetails}>
                  <ThemedText style={styles.detailText}>
                    📏 {gig.distance}
                  </ThemedText>
                  <ThemedText style={styles.detailText}>
                    ⏱️ {gig.eta}
                  </ThemedText>
                  <ThemedText style={styles.detailText}>
                    👤 {gig.passenger}
                  </ThemedText>
                </View>

                <TouchableOpacity
                  style={[
                    styles.acceptButton,
                    {
                      backgroundColor: acceptedGigs.includes(gig.id)
                        ? colors.secondary
                        : colors.primary,
                    },
                  ]}
                  onPress={() =>
                    !acceptedGigs.includes(gig.id) &&
                    handleAcceptGig(gig.id, gig)
                  }
                  disabled={acceptedGigs.includes(gig.id)}
                >
                  <ThemedText style={styles.acceptText}>
                    {acceptedGigs.includes(gig.id) ? "✓ Imekubali" : "Kubali"}
                  </ThemedText>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    zIndex: 20,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "700",
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sidebarAvatar: {
    fontSize: 48,
    marginRight: 12,
  },
  sidebarUserInfo: {
    flex: 1,
  },
  userStatus: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  sidebarIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  sidebarLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  logoutItem: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    zIndex: 5,
  },
  dragHandle: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    fontSize: 24,
  },
  onlineButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  onlineButtonText: {
    fontSize: 24,
  },
  mapContainer: {
    height: height * 0.32,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapText: {
    fontSize: 16,
    fontWeight: "600",
    zIndex: 1,
  },
  mapPins: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    position: "absolute",
    fontSize: 24,
  },
  driverLocation: {
    position: "absolute",
    zIndex: 10,
  },
  driverIcon: {
    fontSize: 32,
  },
  gigsList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  gigsTitle: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    opacity: 0.7,
  },
  gigCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  gigHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  gigLocation: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  dotStart: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 8,
    marginTop: 4,
  },
  dotEnd: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF9800",
    marginRight: 8,
    marginTop: 4,
  },
  locationText: {
    fontSize: 11,
    flex: 1,
  },
  gigAmount: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 12,
  },
  verticalLine: {
    width: 2,
    height: 16,
    backgroundColor: "#ddd",
    marginLeft: 3,
    marginVertical: 4,
  },
  gigFooter: {
    flexDirection: "row",
    marginBottom: 8,
  },
  gigDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginVertical: 8,
  },
  detailText: {
    fontSize: 10,
    opacity: 0.6,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  acceptText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});
