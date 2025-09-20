import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiUrl, axiosCall } from '../utils/axios'
import { cache } from 'react'

export function useGetProfiles() {
  const { isLoading, data } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => axiosCall('get', apiUrl('profiles')),
  })

  return {
    isLoading,
    profiles: data,
  }
}

export function getProfileQuery(id) {
  return {
    queryKey: ['profile', id],
    queryFn: () => axiosCall('get', apiUrl(`profiles/${id}`)),
    enabled: !!id,
    staleTime: 3000,
  }
}

export function useGetProfile(id) {
  const { isLoading, data } = useQuery(getProfileQuery(id))

  return {
    isLoading: isLoading,
    profile: data,
  }
}

export function usePrefetchProfile(id) {
  const queryClient = useQueryClient()

  return async () => {
    await queryClient.prefetchQuery(getProfileQuery(id))
  }
}

export function useSaveProfile() {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (profile) => {
      if (profile.id) {
        // Actualizar
        return axiosCall('put', apiUrl(`profiles/${profile.id}`), { data: profile })
      } else {
        // Crear
        return axiosCall('post', apiUrl('profiles'), { data: profile })
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profiles'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return { isPending, save: mutateAsync }
}

export function useDeleteProfile() {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (id) => axiosCall('delete', apiUrl(`profiles/${id}`)),
    onSuccess: async (result, id) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] })
      queryClient.setQueryData(['profiles'], (old) =>
        old.map((profile) => {
          if (profile.id === id) {
            return { ...profile, deleting: true }
          }
          return profile
        })
      )
    },
  })

  return { isPending, remove: mutateAsync }
}
