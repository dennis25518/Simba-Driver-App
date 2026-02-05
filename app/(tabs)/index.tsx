import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useOrders } from "@/context/orders";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { supabase } from "@/lib/supabase";
import { FontAwesome } from "@expo/vector-icons";
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
  const { pendingOrders, acceptOrder } = useOrders();
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
      // Accept order in context
      acceptOrder(gigData);

      // Save to database
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

  const gigs = pendingOrders.map((order) => ({
    id: order.id,
    from: order.from,
    to: order.to,
    distance: order.distance,
    eta: order.eta,
    amount: order.amount,
    passenger: order.customer,
  }));

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
            <FontAwesome
              name="times"
              size={24}
              color={isDark ? "#fff" : "#333"}
            />
          </TouchableOpacity>

          <View style={styles.sidebarHeader}>
            <View style={styles.avatarCircle}>
              <FontAwesome name="user" size={32} color="#fff" />
            </View>
            <View style={styles.sidebarUserInfo}>
              <ThemedText type="subtitle" style={{ fontWeight: "700" }}>
                France Masama
              </ThemedText>
              <View style={styles.ratingBadge}>
                <FontAwesome name="star" size={12} color="#FFB800" />
                <ThemedText style={styles.ratingText}> 4.8</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.sidebarDivider} />

          <Link href="/sidebar/profile" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <FontAwesome
                name="user-circle"
                size={18}
                color={colors.primary}
              />
              <ThemedText style={styles.sidebarLabel}>Profili yangu</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/sidebar/settings" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <FontAwesome name="cog" size={18} color={colors.primary} />
              <ThemedText style={styles.sidebarLabel}>Mipangilio</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/sidebar/help" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <FontAwesome
                name="question-circle"
                size={18}
                color={colors.primary}
              />
              <ThemedText style={styles.sidebarLabel}>Msaada</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/sidebar/vehicles" asChild>
            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={toggleSidebar}
            >
              <FontAwesome name="car" size={18} color={colors.primary} />
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
            <FontAwesome name="sign-out" size={18} color="#FF5252" />
            <ThemedText style={[styles.sidebarLabel, { color: "#FF5252" }]}>
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
            <FontAwesome name="bars" size={24} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.onlineButton,
              { backgroundColor: isOnline ? colors.primary : "#FF5252" },
            ]}
            onPress={handleToggleOnline}
          >
            <FontAwesome name="circle" size={20} color="#fff" />
            <ThemedText style={styles.onlineButtonText}>
              {isOnline ? "Online" : "Offline"}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Draggable Map Container */}
        <Animated.View
          style={[
            styles.mapContainer,
            {
              backgroundColor: isDark ? colors.cardBackground : "#E8EAED",
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
          <View style={styles.mapHeaderContent}>
            <FontAwesome name="map-marker" size={20} color="#2196F3" />
            <ThemedText style={styles.mapText}>Real-time Location</ThemedText>
          </View>
          <View style={styles.mapPins}>
            <View style={[styles.pin, { top: "20%", right: "15%" }]}>
              <FontAwesome name="map-marker" size={20} color="#FF5252" />
            </View>
            <View style={[styles.pin, { top: "45%", left: "20%" }]}>
              <FontAwesome name="map-marker" size={20} color="#FF5252" />
            </View>
            <View style={[styles.pin, { bottom: "15%", right: "25%" }]}>
              <FontAwesome name="map-marker" size={20} color="#FF5252" />
            </View>
          </View>
          <View style={styles.driverLocation}>
            <FontAwesome name="car" size={28} color={colors.primary} />
          </View>
        </Animated.View>

        {/* Gigs List */}
        <ScrollView
          style={styles.gigsList}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="subtitle" style={styles.gigsTitle}>
            Available Gigs ({gigs.length})
          </ThemedText>

          {!isOnline ? (
            <View style={styles.offlineContainer}>
              <FontAwesome name="circle" size={32} color="#FF5252" />
              <ThemedText style={styles.offlineText}>
                Go online to receive gigs
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
                    <FontAwesome name="map-marker" size={16} color="#4CAF50" />
                    <ThemedText style={styles.locationText} numberOfLines={1}>
                      {gig.from}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.gigAmount}>{gig.amount}</ThemedText>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.gigFooter}>
                  <View style={styles.gigLocation}>
                    <FontAwesome name="map-marker" size={16} color="#FF9800" />
                    <ThemedText style={styles.locationText} numberOfLines={1}>
                      {gig.to}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.gigDetails}>
                  <View style={styles.detailItem}>
                    <FontAwesome name="road" size={12} color={colors.primary} />
                    <ThemedText style={styles.detailText}>
                      {gig.distance}
                    </ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome
                      name="clock-o"
                      size={12}
                      color={colors.primary}
                    />
                    <ThemedText style={styles.detailText}>{gig.eta}</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome name="user" size={12} color={colors.primary} />
                    <ThemedText style={styles.detailText}>
                      {gig.passenger}
                    </ThemedText>
                  </View>
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
                  <FontAwesome
                    name={acceptedGigs.includes(gig.id) ? "check" : "check"}
                    size={14}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <ThemedText style={styles.acceptText}>
                    {acceptedGigs.includes(gig.id) ? "Accepted" : "Accept Gig"}
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
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sidebarUserInfo: {
    flex: 1,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FFF3E0",
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#F57F17",
    fontWeight: "600",
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
  sidebarLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 16,
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
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.08)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  onlineButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  onlineButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 6,
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
  mapContainer: {
    height: height * 0.32,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  mapHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "absolute",
    top: 0,
    left: 0,
  },
  mapText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
    color: "#2196F3",
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
  gigsList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  gigsTitle: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.7,
  },
  gigCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#2196F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
  locationText: {
    fontSize: 11,
    flex: 1,
    marginLeft: 8,
    fontWeight: "500",
  },
  gigAmount: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 12,
    color: "#4CAF50",
  },
  verticalLine: {
    width: 2,
    height: 16,
    backgroundColor: "#ddd",
    marginLeft: 7,
    marginVertical: 4,
  },
  gigFooter: {
    flexDirection: "row",
    marginBottom: 8,
  },
  gigDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    marginVertical: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 6,
    opacity: 0.7,
  },
  acceptButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  acceptText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  offlineContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineText: {
    fontSize: 14,
    marginTop: 12,
    opacity: 0.6,
    fontWeight: "500",
  },
});
