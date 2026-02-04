import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  insurance: string;
  registrationDate: string;
  icon: string;
  status: "Active" | "Inactive";
}

export default function VehiclesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      make: "Toyota",
      model: "Axio",
      year: 2022,
      licensePlate: "DA 456 BCD",
      color: "Silver",
      insurance: "Active",
      registrationDate: "Jan 15, 2023",
      icon: "🚗",
      status: "Active",
    },
    {
      id: 2,
      make: "Hyundai",
      model: "i10",
      year: 2021,
      licensePlate: "DA 789 EFG",
      color: "White",
      insurance: "Active",
      registrationDate: "Mar 20, 2023",
      icon: "🚙",
      status: "Inactive",
    },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const toggleVehicleStatus = (id: number) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === id
          ? { ...v, status: v.status === "Active" ? "Inactive" : "Active" }
          : v,
      ),
    );
    Alert.alert(
      "Vehicle Status Updated",
      `Vehicle status has been updated successfully`,
    );
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
          Magari Yangu
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Vehicles List */}
        {vehicles.map((vehicle) => (
          <View key={vehicle.id}>
            <TouchableOpacity
              style={[
                styles.vehicleCard,
                {
                  backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
                },
              ]}
              onPress={() =>
                setSelectedVehicle(
                  selectedVehicle === vehicle.id ? null : vehicle.id,
                )
              }
            >
              <View style={styles.vehicleHeader}>
                <ThemedText style={styles.vehicleIcon}>
                  {vehicle.icon}
                </ThemedText>
                <View style={styles.vehicleBasicInfo}>
                  <ThemedText style={styles.vehicleName}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </ThemedText>
                  <ThemedText style={styles.licensePlate}>
                    {vehicle.licensePlate}
                  </ThemedText>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        vehicle.status === "Active" ? "#4CAF50" : "#999",
                    },
                  ]}
                >
                  <ThemedText style={styles.statusText}>
                    {vehicle.status}
                  </ThemedText>
                </View>
              </View>

              {selectedVehicle === vehicle.id && (
                <View style={styles.vehicleDetails}>
                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>Color:</ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {vehicle.color}
                    </ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>
                      Insurance:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {vehicle.insurance}
                    </ThemedText>
                  </View>

                  <View style={styles.detailRow}>
                    <ThemedText style={styles.detailLabel}>
                      Registration:
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {vehicle.registrationDate}
                    </ThemedText>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        { backgroundColor: "#2196F3" },
                      ]}
                      onPress={() => {
                        Alert.alert(
                          "Edit Vehicle",
                          "Edit vehicle details coming soon",
                        );
                      }}
                    >
                      <ThemedText style={styles.actionButtonText}>
                        Edit
                      </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor:
                            vehicle.status === "Active" ? "#FF9800" : "#4CAF50",
                        },
                      ]}
                      onPress={() => toggleVehicleStatus(vehicle.id)}
                    >
                      <ThemedText style={styles.actionButtonText}>
                        {vehicle.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        { backgroundColor: "#FF6B6B" },
                      ]}
                      onPress={() => {
                        Alert.alert(
                          "Delete Vehicle",
                          "Are you sure you want to delete this vehicle?",
                          [
                            {
                              text: "Cancel",
                              onPress: () => {},
                              style: "cancel",
                            },
                            {
                              text: "Delete",
                              onPress: () => {
                                setVehicles(
                                  vehicles.filter((v) => v.id !== vehicle.id),
                                );
                                Alert.alert(
                                  "Deleted",
                                  "Vehicle has been deleted",
                                );
                              },
                              style: "destructive",
                            },
                          ],
                        );
                      }}
                    >
                      <ThemedText style={styles.actionButtonText}>
                        Delete
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Vehicle Section */}
        <TouchableOpacity
          style={[
            styles.addVehicleCard,
            {
              backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              borderColor: isDark ? "#333" : "#e0e0e0",
            },
          ]}
          onPress={() => {
            Alert.alert("Add Vehicle", "Add new vehicle feature coming soon");
          }}
        >
          <ThemedText style={styles.addVehicleIcon}>+</ThemedText>
          <ThemedText style={styles.addVehicleText}>Add New Vehicle</ThemedText>
        </TouchableOpacity>

        {/* Vehicle Documents Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📄 Required Documents
          </ThemedText>

          <View
            style={[
              styles.documentCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <View style={styles.documentStatus}>
              <ThemedText style={styles.docIcon}>✓</ThemedText>
              <View style={styles.docInfo}>
                <ThemedText style={styles.docName}>
                  Vehicle Registration
                </ThemedText>
                <ThemedText style={styles.docDate}>
                  Expires: 15 Jan 2025
                </ThemedText>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.documentCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <View style={styles.documentStatus}>
              <ThemedText style={styles.docIcon}>✓</ThemedText>
              <View style={styles.docInfo}>
                <ThemedText style={styles.docName}>
                  Insurance Certificate
                </ThemedText>
                <ThemedText style={styles.docDate}>
                  Expires: 20 Mar 2025
                </ThemedText>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.documentCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <View style={styles.documentStatus}>
              <ThemedText style={styles.docIcon}>⚠</ThemedText>
              <View style={styles.docInfo}>
                <ThemedText style={styles.docName}>
                  Safety Inspection
                </ThemedText>
                <ThemedText style={styles.docDate}>
                  Expires: 10 Feb 2025
                </ThemedText>
              </View>
            </View>
          </View>
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
  vehicleCard: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  vehicleHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  vehicleIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  vehicleBasicInfo: {
    flex: 1,
  },
  vehicleName: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },
  licensePlate: {
    fontSize: 12,
    opacity: 0.6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 11,
  },
  vehicleDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    opacity: 0.6,
    fontSize: 13,
  },
  detailValue: {
    fontWeight: "600",
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  addVehicleCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  addVehicleIcon: {
    fontSize: 32,
    marginBottom: 8,
    color: "#4CAF50",
  },
  addVehicleText: {
    fontWeight: "600",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  documentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  documentStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  docIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  docDate: {
    fontSize: 12,
    opacity: 0.6,
  },
});
