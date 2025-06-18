import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl, axiosCall } from "../utils/axios";

export function useGetProfiles() {
  const { isLoading, data } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => axiosCall("get", apiUrl("profiles")),
  })

  console.log("useGetProfiles", { isLoading, data });

  return {
    isLoading,
    profiles: data,
  };
}

export function useSaveProfile() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (profile) => axiosCall("post", apiUrl("profiles"), { data: profile }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });

  return { isPending, save: mutateAsync };
}