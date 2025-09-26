import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { useRouter } from "expo-router";

export default function LogoutButton() {
  const { logout }: any = useAuthStore();
  const router = useRouter();

  const handelSumit = () => {
    router.push({
      pathname: "/modal",
      params: {
        product: "",
        onclick: logout(),
        type: "logout",
        title:"Đăng Xuất",
        content: "Bạn muốn đăng xuất không?"
      },
    });
  };
  const confirmLogout = () => {

    logout();
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Đăng Xuất</Text>
    </TouchableOpacity>
  );
}
