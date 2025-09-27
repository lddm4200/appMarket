import { useEffect, useState } from "react";
import {
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { Image } from "expo-image";
import styles from "@/assets/styles/profile.styles";
import Loader from "@/components/Loader";
import { sleep } from ".";

export default function Profile() {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteproductId, setDeleteproductId] = useState(null);
  

  const { token }: any = useAuthStore();

  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/product/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch user ");
      console.log(data);
      
      setproducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Error",
        "Failed to load profile data. Pull down to refresh."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (productId: any) => {
    try {
      setDeleteproductId(productId);

      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete product");

      setproducts(products.filter((product: any) => product._id !== productId));
      Alert.alert("Success", "Recommendation deleted successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to delete recommendation");
    } finally {
      setDeleteproductId(null);
    }
  };

  const confirmDelete = (productId: any) => {
    Alert.alert(
      "Delete Recommendation",
      "Are you sure you want to delete this recommendation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteProduct(productId),
        },
      ]
    );
  };

  const renderProductItem = ({ item }: any) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productCaption} numberOfLines={2}>
          {item.caption}
        </Text>
        <Text style={styles.productDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item._id)}
      >
        {deleteproductId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) return <Loader />;

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>Your Recommendations </Text>
        <Text style={styles.productsCount}>{products.length} product</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cube-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Không có sản phẩm nào</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Thêm sản phẩm đầu tiên của bạn</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
