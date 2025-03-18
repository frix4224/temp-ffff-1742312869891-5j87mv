import { createMollieClient } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_EQgQB7Gf8Gdx4ceENQhV2VkTadnCc5' });

export async function createPayment(req: Request) {
  try {
    const { amount, currency, description, redirectUrl, webhookUrl } = await req.json();

    const payment = await mollieClient.payments.create({
      amount: {
        value: amount.toFixed(2),
        currency: currency
      },
      description,
      redirectUrl,
      webhookUrl,
      method: ['ideal', 'creditcard', 'bancontact'],
      locale: 'nl_NL'
    });

    return new Response(JSON.stringify({
      checkoutUrl: payment.getCheckoutUrl()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({
      error: 'Payment creation failed'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}