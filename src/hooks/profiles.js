import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl, axiosCall } from "../utils/axios";

export function useGetProfiles() {
  const { isLoading, data } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => axiosCall("get", apiUrl("profiles")),
  })

  return {
    isLoading,
    profiles: data,
  };
}

export function useGetProfile(id) {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => axiosCall("get", apiUrl(`profiles/${id}`)),
    enabled: !!id,
  });

  return {
    isLoading: isLoading || isFetching,
    profile: data,
  };
}

export function useSaveProfile() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (profile) => {
      if (profile.id) {
        // Actualizar
        return axiosCall("put", apiUrl(`profiles/${profile.id}`), { data: profile });
      } else {
        // Crear
        return axiosCall("post", apiUrl("profiles"), { data: profile });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });

  return { isPending, save: mutateAsync };
}