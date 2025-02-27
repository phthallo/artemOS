interface nError extends Error {
    info: string,
    status: number
  }
  
export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.') as nError
        error.info = await res.json()
        error.status = res.status
        throw error
      }
    return res.json()
  }