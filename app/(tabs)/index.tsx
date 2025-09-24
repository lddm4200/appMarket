import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuthStore } from "../../store/authStore";

import { Image } from "expo-image";
import { useEffect, useState } from "react";

import styles from "../../assets/styles/home.styles";
import { API_URL } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { formatPublishDate } from "../../lib/utils";
import COLORS from "../../constants/colors";
import Loader from "@/components/Loader";
import { router } from "expo-router";

export const sleep = (ms: any) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const { token }: any = useAuthStore();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProduct = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(
        `${API_URL}/product?page=${pageNum}&limit=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch product");

      // todo fix it later
      // setProduct((prevproduct) => [...prevproduct, ...data.product]);

      // const uniqueproduct = refresh || pageNum === 1? data.product: Array.from(new Set([...product, ...data.product].map((book) => book._id))).map((id) =>
      //         [...product, ...data.product].find((book) => book._id === id)
      //       );

      const uniqueproduct =
        refresh || pageNum === 1
          ? data.product
          : Array.from(
              new Set([...product, ...data.product].map((book) => book._id))
            ).map((id) =>
              [...product, ...data.product].find((book) => book._id === id)
            );

      console.log(uniqueproduct);

      // setProduct(uniqueproduct);
      setProduct(data.products);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching product", error);
    } finally {
      if (refresh) {
        await sleep(800);
        setRefreshing(false);
      } else setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchProduct(page + 1);
    }
  };

  const handleDetai = (item: any) => {
    router.push({
      pathname: "/ProductDatail",
      params: { item: JSON.stringify(item) },
    });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={()=>handleDetai(item)} style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>

        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>
          Ngày Đăng {formatPublishDate(item.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderRatingStars = (rating: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchProduct(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sản Phẩm</Text>
            <Text style={styles.headerSubtitle}>Chúc bạn ngày mới vui vẻ</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && product.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color={COLORS.primary}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="arrow-up-left-box-outline"
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
