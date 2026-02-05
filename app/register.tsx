import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/auth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      Alert.alert("Success", "Account created! Please sign in", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/Simba Favicon 2.jpeg")}
              style={styles.logo}
            />
            <ThemedText type="title" style={styles.title}>
              Simba Driver
            </ThemedText>
            <ThemedText style={styles.subtitle}>Create Your Account</ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#e8e8e8",
                  },
                ]}
              >
                <FontAwesome
                  name="user"
                  size={18}
                  color="#999999"
                  style={{ marginRight: 12, opacity: 0.6 }}
                />
                <TextInput
                  style={[styles.inputText, { color: "#1a1a1a" }]}
                  placeholder="Simba Express"
                  placeholderTextColor="#999999"
                  onChangeText={setName}
                  value={name}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#e8e8e8",
                  },
                ]}
              >
                <FontAwesome
                  name="envelope"
                  size={18}
                  color="#999999"
                  style={{ marginRight: 12, opacity: 0.6 }}
                />
                <TextInput
                  style={[styles.inputText, { color: "#1a1a1a" }]}
                  placeholder="driver@simbaexpress.com"
                  placeholderTextColor="#999999"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#e8e8e8",
                  },
                ]}
              >
                <FontAwesome
                  name="lock"
                  size={18}
                  color="#999999"
                  style={{ marginRight: 12, opacity: 0.6 }}
                />
                <TextInput
                  style={[styles.inputText, { color: "#1a1a1a" }]}
                  placeholder="••••••••"
                  placeholderTextColor="#999999"
                  secureTextEntry
                  onChangeText={setPassword}
                  value={password}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <View
                style={[
                  styles.input,
                  {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#e8e8e8",
                  },
                ]}
              >
                <FontAwesome
                  name="lock"
                  size={18}
                  color="#999999"
                  style={{ marginRight: 12, opacity: 0.6 }}
                />
                <TextInput
                  style={[styles.inputText, { color: "#1a1a1a" }]}
                  placeholder="••••••••"
                  placeholderTextColor="#999999"
                  secureTextEntry
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.registerButton, { backgroundColor: "#616161" }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <ThemedText style={styles.registerButtonText}>
                {loading ? "Creating Account..." : "Create Account"}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={[styles.backText, { color: "#616161" }]}>
                Already have an account? Sign In
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 15,
    color: "#666666",
    opacity: 1,
  },
  formContainer: {
    gap: 18,
  },
  inputGroup: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginLeft: 2,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#f5f5f5",
    borderColor: "#e8e8e8",
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.6,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  registerButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#616161",
  },
  registerButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  backText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
    color: "#616161",
  },
});
