const data = fetch(`https://httpbin.org/headers`);
const gatewayOrigin = data?.body?.headers?.Origin ?? "";

const isNearSocial = gatewayOrigin.includes("near.social");
const isBuildDAO =
  gatewayOrigin.includes("localhost") ||
  gatewayOrigin.includes("127.0.0.1") ||
  gatewayOrigin.includes("builddao.testnet.page") ||
  gatewayOrigin.includes("builddao.near.page") ||
  gatewayOrigin.includes("nearbuilders.org");

return { isNearSocial, isBuildDAO, gatewayOrigin };
