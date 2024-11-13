import { supabase } from "@/lib/supabase";
import { queryOptions } from "@tanstack/react-query";

export const sacramentmeetingsQueryOptions = () =>
  queryOptions({
    queryKey: ["sacrament-meetings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sacramentmeetings").select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
