/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  const { requests } = data;

  try {
    const results = await Promise.all(
      requests.map((request: { key: string; url: string }) =>
        fetch(request.url)
          .then((response) => response.json())
          .then((data) => ({ key: request.key, data }))
          .catch((error) => ({ key: request.key, error: error.message }))
      )
    );

    const responseMap: Record<string, any> = results.reduce((acc, result) => {
      acc[result.key] = result.error || result.data;
      return acc;
    }, {});

    postMessage({ success: true, data: responseMap });
  } catch (error: any) {
    postMessage({ success: false, error: error.message });
  }
});
