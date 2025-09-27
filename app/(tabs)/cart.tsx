import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
  console.log(data);
  console.log(isPending);

  const handleSubmit = () => {};

  const renderItem = ({ item }: any) => (
    <View style={styles.bookCard}>

        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />

      <View style={styles.bookDetails}>
        <Text style={styles.date}>
          Ngày Đăng {formatPublishDate(item.createdAt)}
        </Text>
      </View>
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
            <Text style={styles.headerSubtitle}>Đặt hàng ngay để nhận ưu đãi</Text>
          </View>
        }
        ListFooterComponent={
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
