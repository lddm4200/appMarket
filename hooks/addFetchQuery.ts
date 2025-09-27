import { API_URL } from "@/constants/api";
import { useAuthStore } from "@/store/authStore";
import { QueryClient, useMutation } from "@tanstack/react-query";

type MutationInput = {
  newData?: any;
  path?: string;
  token?: string;
};
export const mutation = useMutation({
  mutationFn: async ({ newData, path, token }: MutationInput) => {
    await fetch(`${API_URL}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newData }),
    });
  },
  onSuccess: () => {
    console.log("Success", "Product added!");
    // Optional: invalidate or refetch product list
    //   QueryClient.invalidateQueries({ queryKey: ['products'] });
  },
  onError: (error: any) => {
    console.log("Error", error.message || "Something went wrong");
  },
});

export const addFetchQuery = async (newData?: any, path?: "cart") => {
  const { token }: any = useAuthStore();
  const response = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newData }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");

  return data;
};
