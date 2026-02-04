import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("@/assets/images/Simba Favicon 2.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Simba Driver</Text>
        <Text style={styles.subtitle}>Connect. Drive. Earn.</Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGetStarted}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E53935",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    width: "100%",
    paddingVertical: 18,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E53935",
    letterSpacing: 0.5,
  },
});
