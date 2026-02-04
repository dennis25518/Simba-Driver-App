import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Completed" | "Cancelled"
  >("All");

  const rideHistory = [
    {
      id: 1,
      date: "31 Jan, 17:55",
      from: "Karibu na Wilaya ya Temeke",
      to: "Wilaya ya Temeke, Tanzania",
      amount: "TSh 3,000.00",
      status: "Completed",
      rating: 5,
      passenger: "John Doe",
      distance: "12 km",
      duration: "18 min",
    },
    {
      id: 2,
      date: "31 Jan, 17:53",
      from: "Karibu na Mbaruku Street",
      to: "Dar es Salaam, Tanzania",
      amount: "TSh 4,500.00",
      status: "Cancelled",
      rating: 0,
      passenger: "Cancelled",
      distance: "8 km",
      duration: "12 min",
    },
    {
      id: 3,
      date: "31 Jan, 15:26",
      from: "Karibu na Ilala",
      to: "Ilala, Tanzania",
      amount: "TSh 4,500.00",
      status: "Completed",
      rating: 4,
      passenger: "Jane Smith",
      distance: "5 km",
      duration: "8 min",
    },
    {
      id: 4,
      date: "30 Jan, 21:08",
      from: "Karibu na Nakawale",
      to: "Dar es Salaam, Tanzania",
      amount: "TSh 13,000.00",
      status: "Completed",
      rating: 5,
      passenger: "Ahmed Hassan",
      distance: "15 km",
      duration: "22 min",
    },
  ];

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <FontAwesome key={i} name="star" size={12} color="#FFB800" />
      ));
  };

  const filteredRides = rideHistory.filter(
    (ride) =>
      filterStatus === "All" ||
      (filterStatus === "Completed" && ride.status === "Completed") ||
      (filterStatus === "Cancelled" && ride.status === "Cancelled"),
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome name="history" size={32} color={colors.primary} />
          <ThemedText type="title" style={styles.headerTitle}>
            Trip History
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Your complete ride records
          </ThemedText>
        </View>

        {/* Filter Buttons - Premium Design */}
        <View style={styles.filterContainer}>
          {(["All", "Completed", "Cancelled"] as const).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    filterStatus === status
                      ? colors.primary
                      : colors.cardBackground,
                },
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <FontAwesome
                name={
                  status === "All"
                    ? "list"
                    : status === "Completed"
                      ? "check-circle"
                      : "times-circle"
                }
                size={12}
                color={filterStatus === status ? "#fff" : colors.primary}
                style={{ marginRight: 6 }}
              />
              <ThemedText
                style={[
                  styles.filterText,
                  {
                    color:
                      filterStatus === status
                        ? "#fff"
                        : isDark
                          ? "#fff"
                          : "#666",
                  },
                ]}
              >
                {status}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <FontAwesome name="check-circle" size={16} color="#4CAF50" />
            <ThemedText style={styles.statText}>
              {rideHistory.filter((r) => r.status === "Completed").length} rides
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <FontAwesome name="star" size={16} color="#FFB800" />
            <ThemedText style={styles.statText}>
              {(
                rideHistory.reduce((a, b) => a + b.rating, 0) /
                rideHistory.filter((r) => r.status === "Completed").length
              ).toFixed(1)}{" "}
              avg
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <FontAwesome name="info-circle" size={16} color={colors.primary} />
            <ThemedText style={styles.statText}>
              {filteredRides.length}
            </ThemedText>
          </View>
        </View>

        {/* Ride History List - Premium Cards */}
        <View style={styles.historyList}>
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <TouchableOpacity
                key={ride.id}
                style={[
                  styles.rideCard,
                  { backgroundColor: colors.cardBackground },
                ]}
                onPress={() =>
                  setExpandedId(expandedId === ride.id ? null : ride.id)
                }
              >
                <View style={styles.rideHeader}>
                  <View style={styles.rideHeaderLeft}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            ride.status === "Completed"
                              ? "rgba(76, 175, 80, 0.2)"
                              : "rgba(255, 107, 107, 0.2)",
                        },
                      ]}
                    >
                      <FontAwesome
                        name={ride.status === "Completed" ? "check" : "times"}
                        size={12}
                        color={
                          ride.status === "Completed" ? "#4CAF50" : "#FF6B6B"
                        }
                      />
                    </View>
                    <View style={styles.headerInfo}>
                      <ThemedText style={styles.rideDate}>
                        {ride.date}
                      </ThemedText>
                      <ThemedText
                        style={[
                          styles.rideStatus,
                          {
                            color:
                              ride.status === "Completed"
                                ? "#4CAF50"
                                : "#FF6B6B",
                          },
                        ]}
                      >
                        {ride.status}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.headerRight}>
                    <ThemedText type="subtitle" style={styles.rideAmount}>
                      {ride.amount}
                    </ThemedText>
                    <FontAwesome
                      name={
                        expandedId === ride.id ? "chevron-up" : "chevron-down"
                      }
                      size={14}
                      color={colors.primary}
                    />
                  </View>
                </View>

                {/* Route Visualization */}
                <View style={styles.routeContainer}>
                  <View style={styles.routeVisual}>
                    <View style={styles.routeDotStart} />
                    <View style={styles.routeLine} />
                    <View style={styles.routeDotEnd} />
                  </View>
                  <View style={styles.locationInfo}>
                    <View style={styles.locationRow}>
                      <FontAwesome
                        name="map-marker"
                        size={14}
                        color="#4CAF50"
                      />
                      <ThemedText style={styles.location} numberOfLines={1}>
                        {ride.from}
                      </ThemedText>
                    </View>
                    <View style={styles.locationRow}>
                      <FontAwesome
                        name="map-marker"
                        size={14}
                        color="#FF9800"
                      />
                      <ThemedText style={styles.location} numberOfLines={1}>
                        {ride.to}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Passenger Info */}
                <View style={styles.passengerSection}>
                  <View style={styles.passengerInfo}>
                    <FontAwesome
                      name="user-circle"
                      size={16}
                      color={colors.primary}
                    />
                    <View style={styles.passengerDetails}>
                      <ThemedText style={styles.passengerName}>
                        {ride.passenger}
                      </ThemedText>
                      <View style={styles.ratingContainer}>
                        {renderStars(ride.rating)}
                        {ride.rating > 0 && (
                          <ThemedText style={styles.ratingValue}>
                            {ride.rating}.0
                          </ThemedText>
                        )}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Expanded Details */}
                {expandedId === ride.id && (
                  <View style={styles.expandedDetails}>
                    <View style={styles.detailRow}>
                      <View style={styles.detailIcon}>
                        <FontAwesome
                          name="road"
                          size={14}
                          color={colors.primary}
                        />
                      </View>
                      <View style={styles.detailContent}>
                        <ThemedText style={styles.detailLabel}>
                          Distance
                        </ThemedText>
                        <ThemedText style={styles.detailValue}>
                          {ride.distance}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={styles.detailRow}>
                      <View style={styles.detailIcon}>
                        <FontAwesome
                          name="clock-o"
                          size={14}
                          color={colors.primary}
                        />
                      </View>
                      <View style={styles.detailContent}>
                        <ThemedText style={styles.detailLabel}>
                          Duration
                        </ThemedText>
                        <ThemedText style={styles.detailValue}>
                          {ride.duration}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome
                name="inbox"
                size={48}
                color={colors.primary}
                style={{ opacity: 0.3 }}
              />
              <ThemedText style={styles.emptyText}>
                No {filterStatus.toLowerCase()} rides yet
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
    paddingVertical: 12,
  },
  headerTitle: {
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  statsBar: {
    flexDirection: "row",
    backgroundColor: "rgba(33, 150, 243, 0.08)",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  historyList: {
    marginBottom: 24,
    gap: 12,
  },
  rideCard: {
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  rideHeaderLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 10,
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  rideDate: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 4,
    fontWeight: "500",
  },
  rideStatus: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  rideAmount: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
  },
  routeContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  routeVisual: {
    alignItems: "center",
    marginRight: 12,
    width: 30,
  },
  routeDotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    marginBottom: 4,
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: "#ddd",
    marginVertical: 2,
  },
  routeDotEnd: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF9800",
    marginTop: 4,
  },
  locationInfo: {
    flex: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  location: {
    fontSize: 11,
    opacity: 0.7,
    flex: 1,
    fontWeight: "500",
  },
  passengerSection: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    marginBottom: 0,
  },
  passengerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingValue: {
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 2,
    color: "#FFB800",
  },
  expandedDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailIcon: {
    width: 30,
    alignItems: "center",
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    opacity: 0.6,
    fontWeight: "600",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    marginTop: 16,
    opacity: 0.5,
    fontWeight: "500",
  },
});
