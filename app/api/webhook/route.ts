'use server'

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-01-27.acacia',
        typescript: true
    });

    const sig = req.headers.get('stripe-signature');
    if (!sig) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    const rawBody = await req.text();
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error("Webhook Error:", err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const response = NextResponse.json({ received: true }, { status: 200 });

    (async () => {
        try {
            switch (event.type) {
                case 'checkout.session.completed': {
                    const session = event.data.object as Stripe.Checkout.Session;

                    if (!session.metadata?.userId || !session.metadata?.subscriptionType) {
                        console.error("Missing metadata (userId or subscriptionType) in session");
                        return;
                    }

                    const userId = parseInt(session.metadata.userId, 10);
                    if (isNaN(userId)) {
                        console.error("Invalid userId:", session.metadata.userId);
                        return;
                    }

                    const user = await db.user.findUnique({ where: { id: userId } });

                    if (user) {
                        const expiryDate = new Date();
                        if (session.metadata.subscriptionType === "Monthly") {
                            expiryDate.setMonth(expiryDate.getMonth() + 1);
                        } else if (session.metadata.subscriptionType === "Annual") {
                            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                        }

                        await db.user.update({
                            where: { id: userId },
                            data: { isPro: true, updatedAt: new Date() }
                        });
                        console.log(`User ${userId} is now Pro.`);
                    } else {
                        console.error(`User with ID ${userId} not found`);
                    }
                    break;
                }

                case 'invoice.payment_failed': {
                    const invoice = event.data.object as Stripe.Invoice;
                    const customerId = invoice.customer as string;

                    try {
                        const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;

                        if (customer.email) {
                            const user = await db.user.findUnique({ where: { email: customer.email } });

                            if (user) {
                                await db.user.update({
                                    where: { id: user.id },
                                    data: { isPro: false, updatedAt: new Date() }
                                });

                                console.log(`Subscription failed for user ${user.id}, setting isPro to false.`);
                            } else {
                                console.error(`User with email ${customer.email} not found.`);
                            }
                        }
                    } catch (err) {
                        console.error("Error handling invoice.payment_failed:", err);
                    }
                    break;
                }

                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }
        } catch (error) {
            console.error("Error processing webhook event:", error);
        }
    })();

    return response;
}
