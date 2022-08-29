import axios, { type AxiosResponse } from "axios";
import { shortUrlToken } from "@/config";
import type { MaybeRef } from "@vueuse/core";
export function useServerApi<T>(
  long_url: MaybeRef<string>,
  options?: ServerApiOptions
) {
  const response = ref<T>();
  const loading = ref(false);
  const execute = async () => {
    loading.value = true;
    let result = null;
    try {
      result = await axios.post<T>(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          domain: "bit.ly",
          long_url: unref(long_url),
        },
        {
          headers: {
            Authorization: `Bearer ${shortUrlToken}`,
          },
        }
      );
      response.value = result.data;
      options?.onSuccess(result);
      return result;
    } catch (error) {
      options?.onError(error);
      throw error;
    } finally {
      loading.value = false;
    }
  };
  return {
    execute,
    loading,
    response,
  };
}
