import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import styles from "@/assets/styles/productDetail.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { formatPublishDate } from "@/lib/utils";
import { useState } from "react";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";

export default function ProductDetail() {
  const { item }: any = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const router = useRouter();
  const { token }: any = useAuthStore();
  const product = item ? JSON.parse(item as string) : null;
  const handelSumit = () => {
    router.push({
      pathname: "/modal",
      params: {
        product: product,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: {
            product,
          },
          quantity: 12,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      console.error("Error creating post:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // Nếu truyền item là object, cần parse lại

  if (!product) return <Text>Không tìm thấy sản phẩm</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.headerImage} />
          </View>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
            style={styles.gradientOverlay}
          />

          <View style={styles.floatingButtons}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.floatingButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleSection}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.title}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={["#FF6B6B", "#FF8E53"]}
                style={styles.statIconContainer}
              >
                <Ionicons name="time" size={20} color={COLORS.white} />
              </LinearGradient>
              <Text style={styles.statValue}>Ngày Tạo</Text>
              <Text style={styles.statLabel}>
                {formatPublishDate(product.createdAt)}
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.statCard}>
              <LinearGradient
                colors={["#4ECDC4", "#44A08D"]}
                style={styles.statIconContainer}
              >
                <Ionicons name="people" size={20} color={COLORS.white} />
              </LinearGradient>
              <Text style={styles.statValue}>Người Tạo</Text>
              <Text style={styles.statLabel}>{product.user.username}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.recipeTitle}>{product.caption}</Text>
          {/* <TouchableOpacity onPress={handelSumit}>
            <Text>ok</Text>
          </TouchableOpacity> */}

          <View style={styles.section}>
            <Text style={styles.statLabel}>Số Lượng: </Text>
            <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
            <TouchableOpacity><Text>-</Text></TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity><Text>+</Text></TouchableOpacity></View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.addButtonText}>Thêm Giỏ Hàng</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
