import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function EarningsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];
  const [timePeriod, setTimePeriod] = useState<"Today" | "Week" | "Month">(
    "Week",
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const earningsData = {
    totalEarnings: "TSh 175,372.76",
    weeklyEarnings: "TSh 45,000",
    todayEarnings: "TSh 0.00",
    completedRides: 24,
    cancelledRides: 2,
    ridesSoFar: "20/30",
    rideDetails: [
      {
        id: 1,
        date: "31 Jan, 17:55",
        from: "Karibu na Wilaya ya Temeke",
        to: "Wilaya ya Temeke, Tanzania",
        amount: "TSh 3,000.00",
        category: "Imekamilika",
        time: "18 min",
        distance: "12 km",
      },
      {
        id: 2,
        date: "31 Jan, 17:53",
        from: "Karibu na Mbaruku Street",
        to: "Dar es Salaam, Tanzania",
        amount: "TSh 4,500.00",
        category: "Ulikataa",
        time: "12 min",
        distance: "8 km",
      },
      {
        id: 3,
        date: "31 Jan, 15:26",
        from: "Karibu na Ilala",
        to: "Ilala, Tanzania",
        amount: "TSh 4,500.00",
        category: "Imekamilika",
        time: "8 min",
        distance: "5 km",
      },
      {
        id: 4,
        date: "30 Jan, 21:08",
        from: "Karibu na Nakawale",
        to: "Dar es Salaam, Tanzania",
        amount: "TSh 13,000.00",
        category: "Imekamilika",
        time: "22 min",
        distance: "15 km",
      },
    ],
  };

  const getPeriodEarnings = () => {
    switch (timePeriod) {
      case "Today":
        return earningsData.todayEarnings;
      case "Week":
        return earningsData.weeklyEarnings;
      case "Month":
        return earningsData.totalEarnings;
    }
  };

  const sortedRides = [...earningsData.rideDetails].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Pata Kipato zaidi
          </ThemedText>
        </View>

        {/* Time Period Selector */}
        <View style={styles.periodSelector}>
          {(["Today", "Week", "Month"] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                {
                  backgroundColor:
                    timePeriod === period
                      ? colors.primary
                      : colors.cardBackground,
                },
              ]}
              onPress={() => setTimePeriod(period)}
            >
              <ThemedText
                style={[
                  styles.periodText,
                  {
                    color:
                      timePeriod === period ? "#fff" : isDark ? "#fff" : "#333",
                  },
                ]}
              >
                {period}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Earnings Card */}
        <View
          style={[
            styles.earningsCard,
            { backgroundColor: isDark ? "#1a472a" : colors.primaryLight },
          ]}
        >
          <ThemedText style={styles.totalLabel}>
            Kipato cha {timePeriod}
          </ThemedText>
          <ThemedText type="title" style={styles.totalAmount}>
            {getPeriodEarnings()}
          </ThemedText>
          <ThemedText style={styles.subText}>Kupokea sasa</ThemedText>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View
            style={[styles.statBox, { backgroundColor: colors.cardBackground }]}
          >
            <ThemedText style={styles.statValue}>
              {earningsData.completedRides}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Completed</ThemedText>
          </View>
          <View
            style={[styles.statBox, { backgroundColor: colors.cardBackground }]}
          >
            <ThemedText style={styles.statValue}>
              {earningsData.cancelledRides}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Cancelled</ThemedText>
          </View>
          <View
            style={[styles.statBox, { backgroundColor: colors.cardBackground }]}
          >
            <ThemedText style={styles.statValue}>
              {earningsData.ridesSoFar}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Progress</ThemedText>
          </View>
        </View>

        {/* Sort Option */}
        <View style={styles.sortContainer}>
          <ThemedText type="subtitle" style={styles.sortLabel}>
            Historia ya safari
          </ThemedText>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() =>
              setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
            }
          >
            <ThemedText style={styles.sortButtonText}>
              {sortOrder === "newest" ? "↓ Newest" : "↑ Oldest"}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Ride History */}
        <View style={styles.historySection}>
          {sortedRides.map((ride) => (
            <TouchableOpacity
              key={ride.id}
              style={[styles.rideItem, { borderBottomColor: colors.divider }]}
              onPress={() =>
                setExpandedId(expandedId === ride.id ? null : ride.id)
              }
            >
              <View style={styles.rideInfo}>
                <ThemedText style={styles.rideDate}>{ride.date}</ThemedText>
                <ThemedText style={styles.rideRoute}>{ride.from}</ThemedText>
                <ThemedText style={styles.rideRoute}>{ride.to}</ThemedText>
                <ThemedText
                  style={[
                    styles.rideCategory,
                    {
                      color:
                        ride.category === "Imekamilika" ? "#4CAF50" : "#FF6B6B",
                    },
                  ]}
                >
                  {ride.category}
                </ThemedText>
              </View>
              <View style={styles.rightSection}>
                <ThemedText type="subtitle" style={styles.rideAmount}>
                  {ride.amount}
                </ThemedText>
                <ThemedText style={styles.expandIcon}>
                  {expandedId === ride.id ? "▲" : "▼"}
                </ThemedText>
              </View>

              {/* Expanded Details */}
              {expandedId === ride.id && (
                <View style={styles.expandedDetails}>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Umbali:</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {ride.distance}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Muda:</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {ride.time}
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
  headerTitle: {
    marginBottom: 8,
  },
  periodSelector: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  periodButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  periodText: {
    fontSize: 12,
    fontWeight: "600",
  },
  earningsCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    opacity: 0.6,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  sortButtonText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  historySection: {
    marginBottom: 30,
  },
  rideItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rideInfo: {
    flex: 1,
    marginRight: 12,
    marginBottom: 8,
  },
  rightSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rideDate: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  rideRoute: {
    fontSize: 13,
    marginBottom: 2,
  },
  rideCategory: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  rideAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  expandIcon: {
    fontSize: 10,
    marginLeft: 8,
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
