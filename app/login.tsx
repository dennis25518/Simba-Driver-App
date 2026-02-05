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

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
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
            <ThemedText style={styles.subtitle}>
              Sign In to Your Account
            </ThemedText>
          </View>

          <View style={styles.formContainer}>
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
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
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

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: "#616161" }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <ThemedText style={styles.loginButtonText}>
                {loading ? "Signing in..." : "Sign In"}
              </ThemedText>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View
                style={[styles.dividerLine, { backgroundColor: "#e8e8e8" }]}
              />
              <ThemedText style={styles.dividerText}>
                Or continue with
              </ThemedText>
              <View
                style={[styles.dividerLine, { backgroundColor: "#e8e8e8" }]}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.registerButton,
                { borderColor: "#e8e8e8", backgroundColor: "#ffffff" },
              ]}
              onPress={() => router.push("/register")}
            >
              <ThemedText
                style={[styles.registerButtonText, { color: "#616161" }]}
              >
                Create New Account
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
  loginButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#616161",
  },
  loginButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e8e8e8",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#999999",
    opacity: 1,
    fontSize: 14,
  },
  registerButton: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    alignItems: "center",
    borderColor: "#e8e8e8",
    backgroundColor: "#ffffff",
  },
  registerButtonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#616161",
    letterSpacing: 0.5,
  },
});
