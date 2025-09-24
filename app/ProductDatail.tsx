import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import styles from "@/assets/styles/productDetail.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { formatPublishDate } from "@/lib/utils";

export default function ProductDetail() {
  const { item } = useLocalSearchParams();

  const router = useRouter();
  // Nếu truyền item là object, cần parse lại
  const product = item ? JSON.parse(item as string) : null;

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
        </View>
      </ScrollView>
    </View>
  );
}
