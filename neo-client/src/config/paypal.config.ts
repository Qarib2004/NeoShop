export const paypalConfig = {
    baseUrl: process.env.PAYPAL_BASE_URL || 'https://api.sandbox.paypal.com',
    clientId: process.env.PAYPAL_CLIENT_ID!,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET!,
    returnUrl: `${process.env.NEXTAUTH_URL}/payment/success`,
    cancelUrl: `${process.env.NEXTAUTH_URL}/payment/cancel`,
    brandName: 'NeoShop',
  };