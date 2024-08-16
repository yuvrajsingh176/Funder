import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "7ca07d0a96528e988cabe09983b3f801";

export const client = createThirdwebClient({
  clientId: clientId,
});
