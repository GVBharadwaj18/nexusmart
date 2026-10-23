import { inngest } from "./client";
import prisma  from "@/lib/prisma";
//inngest function to save user data to a database 
export const syncUserCreation=inngest.createFunction(
    {id:'sync-user-create'},
    {event:'clerk/user.created'},
    async({event})=>{
        const {data}=event
        await prisma.user.create({
            data:{
                id:data.id,
                email:data.email_addresses[0].email_address,
                name:`${data.first_name} ${data.last_name}`,
                image:data.image_url,
            }
        })
    }
)

export const syncUserUpdation=inngest.createFunction(
    {id:'sync-user-update'},
    {event:'clerk/user.updated'},
    async({event})=>{
        const {data}=event
        await prisma.user.update({
            where:{id:data.id},
            data:{
                email:data.email_addresses[0].email_address,
                name:`${data.first_name} ${data.last_name}`,
                image:data.image_url,
            }
        })
    }
)

export const syncUserDeletion=inngest.createFunction(
    {id:'sync-user-delete'},
    {event:'clerk/user.deleted'},
    async({event})=>{
        const {data}=event
        await prisma.user.delete({
            where:{id:data.id}
        })
    }  
)

// inngest function to delete coupon on expiry
export const deleteCouponOnExpiry=inngest.createFunction(
    {id:'delete-coupon-on-expiry'},
    {event:'app/coupon.expired'},
    async ({event,step})=>{
        const {data}=event
        const expiryDate=new Date(data.expires_at)
        await step.sleepUntil('wait-for-expiryDate',expiryDate)
        await step.run('delete-coupon-from-database',async ()=>{
            await prisma.coupon.delete({
                where:{code:data.code}
            })
        })
    }
) 

// inngest function to release reserved inventory if payment expires or is abandoned
export const releaseInventoryReservationOnExpiry = inngest.createFunction(
    { id: 'release-inventory-reservation-on-expiry' },
    { event: 'app/order.reservation.created' },
    async ({ event, step }) => {
        const { data } = event;
        const expiryDate = new Date(data.expiresAt);

        // Step 1: Wait until the reservation expires
        await step.sleepUntil('wait-for-reservation-expiry', expiryDate);

        // Step 2: Check orders status and restore inventory if still unpaid
        await step.run('restore-inventory-if-unpaid', async () => {
            const orders = await prisma.order.findMany({
                where: {
                    id: { in: data.orderIds },
                    isPaid: false
                },
                include: {
                    orderItems: true
                }
            });

            // If there are unpaid orders that expired
            if (orders.length > 0) {
                // Restore stock for all reserved items in these orders
                for (const order of orders) {
                    for (const item of order.orderItems) {
                        await prisma.product.update({
                            where: { id: item.productId },
                            data: {
                                stock: { increment: item.quantity },
                                inStock: true
                            }
                        });
                    }
                }

                // Delete unpaid expired draft orders
                await prisma.order.deleteMany({
                    where: {
                        id: { in: orders.map(o => o.id) }
                    }
                });
            }
        });
    }
);