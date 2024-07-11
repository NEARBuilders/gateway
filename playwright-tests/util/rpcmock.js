export const MOCK_RPC_URL = "https://rpc.mainnet.near.org/";

export async function mockRpcRequest({
  page,
  filterParams = {},
  mockedResult = {},
  modifyOriginalResultFunction = null,
}) {
  await page.route(MOCK_RPC_URL, async (route, request) => {
    const postData = request.postDataJSON();

    const filterParamsKeys = Object.keys(filterParams);
    if (
      filterParamsKeys.every(
        (param) => postData.params[param] === filterParams[param],
      )
    ) {
      const json = await route.fetch().then((r) => r.json());

      if (modifyOriginalResultFunction) {
        const originalResult = JSON.parse(
          new TextDecoder().decode(new Uint8Array(json.result.result)),
        );
        mockedResult = await modifyOriginalResultFunction(originalResult);
      }

      const mockedResponse = {
        method: "query",
        params: {
          request_type: "call_function",
          account_id: "social.near",
          method_name: "get",
          args_base64:
            "eyJrZXlzIjpbImJ1aWxkZGFvLm5lYXIvd2lkZ2V0L3BhZ2UucHJvamVjdHMuUG90bG9ja0ltcG9ydCJdfQ==",
          finality: "optimistic",
        },
        id: 189,
        jsonrpc: "2.0",
      };

      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockedResponse),
      });
    } else {
      route.fallback();
    }
  });
}
