import Stripe from 'stripe';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
    typescript: true
});

async function getCartItems(line_items: Stripe.ApiList<Stripe.LineItem>) {
//     const cartItems = await Promise.all(line_items.data.map(async (item: any) => {
//         const product: any = await stripe.products.retrieve(item.price.product as string);
//         const productId = product.metadata.productId;

//         return {
//             id: productId,
//             name: product.name,
//             price: item.price.unit_amount / 100,
//             quantity: item.quantity,
//             image: product.images[0],
//             color: product.metadata.proSelectedColor,
//             size: product.metadata.proSelectedSize
//         };
//     }));
//     return cartItems;
// }

// export async function POST(req: NextRequest) {

//     try {
//         const signature = req.headers.get('stripe-signature');
//         const rawBody = await req.text();

//         let event;
//         try {
//             event = stripe.webhooks.constructEvent(
//                 rawBody,
//                 signature!,
//                 process.env.STRIPE_WEBHOOK_SECRET!
//             );
//         } catch (err: any) {
//             return new NextResponse('Webhook error: Invalid signature', { status: 400 });
//         }

//         if (event.type === 'checkout.session.completed') {

//             const session = event.data.object as Stripe.Checkout.Session;

//             const line_items = await stripe.checkout.sessions.listLineItems(session.id);

//             const cartItems = await getCartItems(line_items);

//             const productIds = cartItems.map(item => item.id);
//             const orderProducts = cartItems.map(item => ({
//                 id: item.id,
//                 productSelectColor: item.color,
//                 productSelectSize: item.size,
//                 ProductQuantity: item.quantity
//             }));
//             const quantities = cartItems.map(item => item.quantity);
//             const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//             const userId = session.client_reference_id!;

//             try {
//                 const newOrder = await db.order.create({
//                     data: {
//                         userId,
//                         productsIds: productIds,
//                         orderProducts: orderProducts,
//                         quantity: quantities.reduce((acc, q) => acc + q, 0),
//                         total: totalPrice,
//                         status: 'pending',
//                     },
//                 });

//                 await db.user.update({
//                     where: { id: userId },
//                     data: { Orders: { connect: { id: newOrder.id } } },
//                 });

//                 return new NextResponse('Order created successfully', { status: 200 });
//             } catch (error) {
//                 console.error('Failed to create order:', error);
//                 return new NextResponse('Failed to create order', { status: 500 });
//             }
//         }

//         return new NextResponse('Unhandled event type', { status: 400 });
//     } catch (error) {
//         console.error('Webhook error:', error);
//         return new NextResponse('Webhook error', { status: 400 });
//     }
}