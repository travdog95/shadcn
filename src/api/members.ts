import { supabase } from "@/lib/supabase";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const membersQueryOptions = () =>
  queryOptions({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("members").select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

export const mdGetMembers = () =>
  queryOptions({
    queryKey: ["md-members"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/members`);
      return response.data.data;
    },
  });
