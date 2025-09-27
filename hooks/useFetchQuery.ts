import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useFetchQuery = (querykey?: string, path?: string) => {
  const { token }: any = useAuthStore();
  const { isPending, error, data } = useQuery({
    queryKey: [querykey],
    queryFn: () =>
      fetch(`${API_URL}/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
  });
  return { isPending, error, data };
};
