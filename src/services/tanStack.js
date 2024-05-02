import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  addContact,
  deleteContact,
  getContact,
  getContactDetails,
} from "./api";

export function useContacts() {
  return useQuery({
    queryKey: ["Contacts", "List"],
    queryFn: getContact,
  });
}

export function useContactDetails(id) {
  return useQuery({
    queryKey: ["Contacts", "List", id],
    queryFn: () => getContactDetails(id),
  });
}

export function useDeleteContact() {
  const querClient = QueryClient();
  return useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: async (data, veriables) => {
      await querClient.invalidateQueries({
        queryKey: ["Contacts", "Detail", veriables.id],
      });
      await querClient.invalidateQueries({
        queryKey: ["Contacts", "List"],
      });
    },
  });
}

export function useAddContact() {
  const querClient = QueryClient();
  return useMutation({
    mutationFn: (data) => addContact(data),
    onSuccess: async () => {
      await querClient.invalidateQueries({
        queryKey: ["Contacts", "List"],
      });
    },
  });
}
