import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-01-27.acacia',
        typescript: true
    });

    const sig = req.headers.get('stripe-signature')!;
    const rawBody = await req.text();

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            if (session.metadata?.userId) {
                const userId = Number(session.metadata.userId);
                const subscriptionType = session.metadata.subscriptionType;

                // Calculate expiry date
                const expiryDate = new Date();
                if (subscriptionType === "Monthly") {
                    expiryDate.setMonth(expiryDate.getMonth() + 1);
                } else if (subscriptionType === "Annual") {
                    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                }

                await db.user.update({
                    where: { id: userId },
                    data: {
                        isPro: true,
                        updatedAt: new Date(),
                    }
                });

                console.log(`User ${userId} is now Pro until ${expiryDate}`);
            }
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object as Stripe.Invoice;
            const customerId = invoice.customer as string;

            // Get the customer email from Stripe
            const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;

            if (customer.email) {
                const user = await db.user.findFirst({
                    where: { email: customer.email }
                });

                if (user) {
                    await db.user.update({
                        where: { id: user.id },
                        data: { isPro: false }
                    });

                    console.log(`Subscription failed for user ${user.id}, setting isPro to false.`);
                }
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            // Get the customer email from Stripe
            const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;

            if (customer.email) {
                const user = await db.user.findFirst({
                    where: { email: customer.email }
                });

                if (user) {
                    await db.user.update({
                        where: { id: user.id },
                        data: { isPro: false }
                    });

                    console.log(`Subscription canceled for user ${user.id}, setting isPro to false.`);
                }
            }
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
