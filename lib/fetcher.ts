// fetcher.ts

export const fetcher = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
    const response = await fetch(...args);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorBody}`);
    }
    return response.json() as Promise<T>;
  };
  