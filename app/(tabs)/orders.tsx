import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useOrders } from "@/context/orders";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function OrderTrackingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];
  const { activeOrders, markDelivered } = useOrders();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Pending" | "In Transit" | "Delivered"
  >("All");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#FF9800";
      case "In Transit":
        return "#2196F3";
      case "Delivered":
        return "#4CAF50";
      default:
        return "#999";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return "hourglass-start";
      case "In Transit":
        return "truck";
      case "Delivered":
        return "check-circle";
      default:
        return "circle";
    }
  };

  const filteredOrders = activeOrders.filter(
    (order) => filterStatus === "All" || order.status === filterStatus,
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome name="shopping-bag" size={32} color={colors.primary} />
          <ThemedText type="title" style={styles.headerTitle}>
            Orders
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Track deliveries in real-time
          </ThemedText>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {(["All", "Pending", "In Transit", "Delivered"] as const).map(
            (status) => (
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
                      : status === "Pending"
                        ? "hourglass-start"
                        : status === "In Transit"
                          ? "truck"
                          : "check-circle"
                  }
                  size={11}
                  color={filterStatus === status ? "#fff" : colors.primary}
                  style={{ marginRight: 5 }}
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
            ),
          )}
        </View>

        {/* Active Orders Summary */}
        {filteredOrders.filter((o) => o.status !== "Delivered").length > 0 && (
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: "rgba(33, 150, 243, 0.1)" },
            ]}
          >
            <FontAwesome name="info-circle" size={18} color={colors.primary} />
            <View style={styles.summaryContent}>
              <ThemedText style={styles.summaryText}>
                {filteredOrders.filter((o) => o.status !== "Delivered").length}{" "}
                active order
                {filteredOrders.filter((o) => o.status !== "Delivered").length >
                1
                  ? "s"
                  : ""}
              </ThemedText>
            </View>
          </View>
        )}

        {/* Orders List */}
        <View style={styles.ordersList}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={[
                  styles.orderCard,
                  { backgroundColor: colors.cardBackground },
                ]}
                onPress={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
              >
                {/* Order Header */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: `${getStatusColor(order.status)}20`,
                        },
                      ]}
                    >
                      <FontAwesome
                        name={getStatusIcon(order.status)}
                        size={14}
                        color={getStatusColor(order.status)}
                      />
                    </View>
                    <View style={styles.orderInfo}>
                      <ThemedText style={styles.orderNumber}>
                        {order.orderNumber}
                      </ThemedText>
                      <ThemedText style={styles.merchant}>
                        {order.merchant}
                      </ThemedText>
                      <ThemedText
                        style={[
                          styles.orderStatus,
                          { color: getStatusColor(order.status) },
                        ]}
                      >
                        {order.status}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.headerRight}>
                    <ThemedText style={styles.orderAmount}>
                      {order.totalAmount}
                    </ThemedText>
                    <FontAwesome
                      name={
                        expandedId === order.id ? "chevron-up" : "chevron-down"
                      }
                      size={14}
                      color={colors.primary}
                    />
                  </View>
                </View>

                {/* Progress Bar */}
                {order.status !== "Delivered" && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressInfo}>
                      <ThemedText style={styles.progressLabel}>
                        Delivery Progress
                      </ThemedText>
                      <ThemedText style={styles.timeEstimate}>
                        ETA: {order.estimatedDelivery}
                      </ThemedText>
                    </View>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${order.progress ?? 0}%`,
                            backgroundColor: getStatusColor(order.status),
                          },
                        ]}
                      />
                    </View>
                    <ThemedText style={styles.progressPercent}>
                      {order.progress ?? 0}%
                    </ThemedText>
                  </View>
                )}

                {/* Customer Info - Quick Preview */}
                <View style={styles.quickInfo}>
                  <View style={styles.quickInfoItem}>
                    <FontAwesome name="user" size={12} color={colors.primary} />
                    <ThemedText style={styles.quickInfoText}>
                      {order.customer}
                    </ThemedText>
                  </View>
                  <View style={styles.quickInfoItem}>
                    <FontAwesome
                      name="phone"
                      size={12}
                      color={colors.primary}
                    />
                    <ThemedText style={styles.quickInfoText}>
                      {order.customerPhone}
                    </ThemedText>
                  </View>
                </View>

                {/* Expanded Details */}
                {expandedId === order.id && (
                  <View style={styles.expandedDetails}>
                    {/* Route Information */}
                    <View style={styles.routeSection}>
                      <ThemedText style={styles.sectionTitle}>Route</ThemedText>
                      <View style={styles.routeItem}>
                        <FontAwesome
                          name="location-arrow"
                          size={14}
                          color="#4CAF50"
                        />
                        <View style={styles.routeText}>
                          <ThemedText style={styles.routeLabel}>
                            Pickup
                          </ThemedText>
                          <ThemedText style={styles.routeValue}>
                            {order.pickupLocation}
                          </ThemedText>
                        </View>
                      </View>
                      <View style={styles.routeSeparator}>
                        <FontAwesome name="arrow-down" size={12} color="#ddd" />
                      </View>
                      <View style={styles.routeItem}>
                        <FontAwesome
                          name="map-marker"
                          size={14}
                          color="#FF9800"
                        />
                        <View style={styles.routeText}>
                          <ThemedText style={styles.routeLabel}>
                            Delivery
                          </ThemedText>
                          <ThemedText style={styles.routeValue}>
                            {order.deliveryLocation}
                          </ThemedText>
                        </View>
                      </View>
                    </View>

                    {/* Items */}
                    <View style={styles.itemsSection}>
                      <ThemedText style={styles.sectionTitle}>Items</ThemedText>
                      {order.items &&
                        order.items.map((item, idx) => (
                          <View key={idx} style={styles.itemRow}>
                            <FontAwesome
                              name="shopping-bag"
                              size={12}
                              color={colors.primary}
                            />
                            <ThemedText style={styles.itemText}>
                              {item}
                            </ThemedText>
                          </View>
                        ))}
                    </View>

                    {/* Special Notes */}
                    {order.notes && (
                      <View style={styles.notesSection}>
                        <View style={styles.notesHeader}>
                          <FontAwesome
                            name="sticky-note"
                            size={14}
                            color="#FFB800"
                          />
                          <ThemedText style={styles.sectionTitle}>
                            Notes
                          </ThemedText>
                        </View>
                        <ThemedText style={styles.notesText}>
                          {order.notes}
                        </ThemedText>
                      </View>
                    )}

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                      {order.status === "Pending" && (
                        <TouchableOpacity
                          style={[
                            styles.actionButton,
                            { backgroundColor: colors.primary },
                          ]}
                        >
                          <FontAwesome name="check" size={14} color="#fff" />
                          <ThemedText style={styles.actionButtonText}>
                            Accept Order
                          </ThemedText>
                        </TouchableOpacity>
                      )}
                      {order.status === "In Transit" && (
                        <TouchableOpacity
                          style={[
                            styles.actionButton,
                            { backgroundColor: "#4CAF50" },
                          ]}
                          onPress={() => markDelivered(order.id)}
                        >
                          <FontAwesome
                            name="check-circle"
                            size={14}
                            color="#fff"
                          />
                          <ThemedText style={styles.actionButtonText}>
                            Mark Delivered
                          </ThemedText>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={[
                          styles.actionButton,
                          { backgroundColor: "rgba(33, 150, 243, 0.1)" },
                        ]}
                      >
                        <FontAwesome
                          name="phone"
                          size={14}
                          color={colors.primary}
                        />
                        <ThemedText
                          style={[
                            styles.actionButtonText,
                            { color: colors.primary },
                          ]}
                        >
                          Call Customer
                        </ThemedText>
                      </TouchableOpacity>
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
                No {filterStatus.toLowerCase()} orders
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
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  summaryCard: {
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    alignItems: "center",
    gap: 10,
  },
  summaryContent: {
    flex: 1,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: "700",
  },
  ordersList: {
    marginBottom: 24,
    gap: 12,
  },
  orderCard: {
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderHeaderLeft: {
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
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
  },
  merchant: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  orderAmount: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
    color: "#4CAF50",
  },
  progressSection: {
    marginBottom: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  progressInfo: {
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 2,
  },
  timeEstimate: {
    fontSize: 10,
    opacity: 0.6,
    fontWeight: "500",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressPercent: {
    fontSize: 10,
    fontWeight: "700",
    alignSelf: "flex-end",
    opacity: 0.7,
  },
  quickInfo: {
    gap: 6,
  },
  quickInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quickInfoText: {
    fontSize: 11,
    opacity: 0.7,
    flex: 1,
  },
  expandedDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    gap: 12,
  },
  routeSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  routeItem: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 8,
  },
  routeText: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 10,
    opacity: 0.6,
    marginBottom: 2,
  },
  routeValue: {
    fontSize: 11,
    fontWeight: "600",
  },
  routeSeparator: {
    alignItems: "center",
    paddingVertical: 4,
  },
  itemsSection: {
    gap: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 11,
    fontWeight: "500",
  },
  notesSection: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 184, 0, 0.08)",
    borderRadius: 8,
    gap: 6,
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  notesText: {
    fontSize: 11,
    fontWeight: "500",
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: "column",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.2,
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
