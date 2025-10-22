import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import Loader from "@/components/Loader";
import styles from "@/assets/styles/cart.styles";
import COLORS from "@/constants/colors";
import { Image } from "expo-image";
import { formatPublishDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const { data, isPending } = useFetchQuery("cart", "cart");
  const [loading, setLoading] = useState(false);
  const [deleteCartId, setDeleteCartId] = useState(null);
  const { token }: any = useAuthStore();

  const handleSubmit = () => {};

  const handleDeleteCart = async (cartId: any) => {
    try {
      setDeleteCartId(cartId);

      const response = await fetch(`${API_URL}/cart/delete/${cartId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete product");
      Alert.alert("Success", "Recommendation deleted successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to delete recommendation");
    } finally {
      setDeleteCartId(null);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.productCard}>
      
      <Image
        source={item.item.product.image}
        style={styles.productImage}
        contentFit="cover"
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.item.product.title}</Text>
        <Text style={styles.date}>Số Lượng: {item.quantity}</Text>
        <Text style={styles.date}>
          Giá: {item.quantity * item.item.product.price}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCart(item._id)}
      >
        {deleteCartId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );

  if (isPending) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Giỏ hàng</Text>
            <Text style={styles.headerSubtitle}>
              Đặt hàng ngay để nhận ưu đãi
            </Text>
          </View>
        }
        ListFooterComponent={
          data.length ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.textSumbit}>Thanh Toán</Text>
                </>
              )}
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cart-outline"
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Không có sản phẩm</Text>
            <Text style={styles.emptySubtext}>
              Hiện tại chưa có sản phẩm nào, vui lòng quay lại sau!
            </Text>
          </View>
        }
      />
    </View>
  );
}
