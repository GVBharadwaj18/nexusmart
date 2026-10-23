import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { 
  deleteCouponOnExpiry, 
  syncUserCreation, 
  syncUserDeletion, 
  syncUserUpdation,
  releaseInventoryReservationOnExpiry 
} from "@/inngest/functions";

// Create an API that serves functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    deleteCouponOnExpiry,
    releaseInventoryReservationOnExpiry
  ],
});

