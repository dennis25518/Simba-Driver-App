import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
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
      status: "Imekamilika",
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
      status: "Ulikataa",
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
      status: "Imekamilika",
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
      status: "Imekamilika",
      rating: 5,
      passenger: "Ahmed Hassan",
      distance: "15 km",
      duration: "22 min",
    },
  ];

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating) + (rating < 5 ? "☆".repeat(5 - rating) : "");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Historia ya Safari</ThemedText>
          <ThemedText style={styles.subHeader}>
            Orodha ya safari zako
          </ThemedText>
        </View>

        {/* Filter Buttons */}
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
              <ThemedText
                style={[
                  styles.filterText,
                  {
                    color:
                      filterStatus === status
                        ? "#fff"
                        : isDark
                          ? "#fff"
                          : "#333",
                  },
                ]}
              >
                {status}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ride History List */}
        <View style={styles.historyList}>
          {rideHistory
            .filter(
              (ride) =>
                filterStatus === "All" ||
                (filterStatus === "Completed" &&
                  ride.status === "Imekamilika") ||
                (filterStatus === "Cancelled" && ride.status === "Ulikataa"),
            )
            .map((ride) => (
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
                    <ThemedText style={styles.rideDate}>{ride.date}</ThemedText>
                    <ThemedText
                      style={[
                        styles.rideStatus,
                        {
                          color:
                            ride.status === "Imekamilika"
                              ? "#4CAF50"
                              : "#FF6B6B",
                        },
                      ]}
                    >
                      {ride.status}
                    </ThemedText>
                  </View>
                  <View style={styles.headerRight}>
                    <ThemedText type="subtitle" style={styles.rideAmount}>
                      {ride.amount}
                    </ThemedText>
                    <ThemedText style={styles.expandIcon}>
                      {expandedId === ride.id ? "▲" : "▼"}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.routeContainer}>
                  <View style={styles.routeDot} />
                  <View style={styles.routeLine} />
                  <View style={[styles.routeDot, styles.endDot]} />
                </View>

                <View style={styles.locationContainer}>
                  <ThemedText style={styles.location} numberOfLines={1}>
                    {ride.from}
                  </ThemedText>
                  <ThemedText
                    style={[styles.location, styles.endLocation]}
                    numberOfLines={1}
                  >
                    {ride.to}
                  </ThemedText>
                </View>

                <View style={styles.divider} />

                <View style={styles.rideFooter}>
                  <View style={styles.passengerInfo}>
                    <ThemedText style={styles.passengerLabel}>
                      👤 {ride.passenger}
                    </ThemedText>
                    <ThemedText style={styles.rating}>
                      {renderStars(ride.rating)}
                    </ThemedText>
                  </View>
                </View>

                {/* Expanded Details */}
                {expandedId === ride.id && (
                  <View style={styles.expandedDetails}>
                    <View style={styles.detailRow}>
                      <ThemedText style={styles.detailLabel}>
                        Umbali:
                      </ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {ride.distance}
                      </ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                      <ThemedText style={styles.detailLabel}>Muda:</ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {ride.duration}
                      </ThemedText>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
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
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
  },
  historyList: {
    marginBottom: 24,
    gap: 12,
  },
  rideCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rideHeaderLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  rideDate: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  rideStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  rideAmount: {
    fontSize: 14,
    fontWeight: "700",
  },
  expandIcon: {
    fontSize: 10,
    marginTop: 4,
  },
  routeContainer: {
    alignItems: "center",
    height: 60,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    position: "absolute",
    top: 0,
  },
  endDot: {
    backgroundColor: "#FF9800",
    top: "auto",
    bottom: 0,
  },
  routeLine: {
    position: "absolute",
    width: 2,
    height: 44,
    backgroundColor: "#ddd",
    top: 8,
  },
  locationContainer: {
    paddingLeft: 20,
  },
  location: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },
  endLocation: {
    marginBottom: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
    opacity: 0.3,
  },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passengerInfo: {
    flex: 1,
  },
  passengerLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
  },
  supportButton: {
    padding: 8,
  },
  supportButtonText: {
    fontSize: 16,
  },
  expandedDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    opacity: 0.7,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "600",
  },
});
