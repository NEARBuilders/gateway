const data = fetch(`https://httpbin.org/headers`);
const gatewayOrigin = data?.body?.headers?.Origin ?? "";

const isNearSocial = gatewayOrigin.includes("near.social");

return { isNearSocial, gatewayOrigin };
