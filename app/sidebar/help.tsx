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

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I accept a ride request?",
      answer:
        "When a ride request comes in, you'll see a notification. Tap 'Accept' to confirm the ride. The passenger's location and pickup details will appear on your map.",
    },
    {
      id: 2,
      question: "How is my earnings calculated?",
      answer:
        "Your earnings are calculated based on distance traveled, time spent, and any surge pricing during high-demand periods. You can view detailed breakdowns in the Earnings tab.",
    },
    {
      id: 3,
      question: "What if I need to cancel a ride?",
      answer:
        "You can cancel a ride before picking up the passenger. However, frequent cancellations may affect your rating. Cancellation fees may apply.",
    },
    {
      id: 4,
      question: "How do I update my vehicle information?",
      answer:
        "Go to 'Magari Yangu' (My Vehicles) section in the sidebar and tap the vehicle you want to update. You can modify registration details, insurance, and vehicle photos.",
    },
    {
      id: 5,
      question: "What is the minimum rating required to drive?",
      answer:
        "You need to maintain a minimum rating of 4.0 to continue driving. If your rating drops below this, you'll receive a warning and may be suspended.",
    },
  ];

  const contactChannels = [
    {
      id: 1,
      icon: "💬",
      title: "Live Chat",
      subtitle: "Chat with support agent",
      action: () => Alert.alert("Live Chat", "Live chat feature coming soon"),
    },
    {
      id: 2,
      icon: "📧",
      title: "Email Support",
      subtitle: "support@simbadrive.com",
      action: () => Alert.alert("Email", "Opening email client..."),
    },
    {
      id: 3,
      icon: "📞",
      title: "Call Us",
      subtitle: "+255 712 345 678",
      action: () => Alert.alert("Call", "Opening phone dialer..."),
    },
    {
      id: 4,
      icon: "🌐",
      title: "Visit Website",
      subtitle: "www.simbadrive.com",
      action: () => Alert.alert("Website", "Opening web browser..."),
    },
  ];

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
          Msaada
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Contact Us Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Wasiliana Nasi
          </ThemedText>

          {contactChannels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={[
                styles.contactCard,
                {
                  backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
                },
              ]}
              onPress={channel.action}
            >
              <ThemedText style={styles.contactIcon}>{channel.icon}</ThemedText>
              <View style={styles.contactInfo}>
                <ThemedText style={styles.contactTitle}>
                  {channel.title}
                </ThemedText>
                <ThemedText style={styles.contactSubtitle}>
                  {channel.subtitle}
                </ThemedText>
              </View>
              <ThemedText style={styles.arrow}>→</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Frequently Asked Questions
          </ThemedText>

          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={[
                styles.faqItem,
                {
                  backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
                },
              ]}
              onPress={() =>
                setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
              }
            >
              <View style={styles.faqHeader}>
                <ThemedText style={styles.faqQuestion}>
                  {faq.question}
                </ThemedText>
                <ThemedText style={styles.expandIcon}>
                  {expandedFaq === faq.id ? "▲" : "▼"}
                </ThemedText>
              </View>

              {expandedFaq === faq.id && (
                <View style={styles.faqAnswer}>
                  <ThemedText style={styles.answerText}>
                    {faq.answer}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            💡 Tips for Success
          </ThemedText>

          <View
            style={[
              styles.tipCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <ThemedText style={styles.tipTitle}>
              Maintain High Rating
            </ThemedText>
            <ThemedText style={styles.tipText}>
              Be professional, arrive on time, and keep your vehicle clean to
              maintain high ratings.
            </ThemedText>
          </View>

          <View
            style={[
              styles.tipCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <ThemedText style={styles.tipTitle}>Accept More Rides</ThemedText>
            <ThemedText style={styles.tipText}>
              The more rides you accept, the higher your acceptance rate and
              chances of getting more ride requests.
            </ThemedText>
          </View>

          <View
            style={[
              styles.tipCard,
              {
                backgroundColor: isDark ? "#1a1a2e" : "#f8f8f8",
              },
            ]}
          >
            <ThemedText style={styles.tipTitle}>Know Peak Hours</ThemedText>
            <ThemedText style={styles.tipText}>
              Earn more during peak hours. Check the Earnings tab to see when
              demand is highest in your area.
            </ThemedText>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  arrow: {
    fontSize: 18,
    opacity: 0.6,
    marginLeft: 12,
  },
  faqItem: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontWeight: "600",
    fontSize: 14,
    marginRight: 12,
  },
  expandIcon: {
    fontSize: 12,
    opacity: 0.6,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  answerText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 20,
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  tipTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
    color: "#4CAF50",
  },
  tipText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 20,
  },
});
