import StoreLayout from "@/components/store/StoreLayout";
import {SignedIn,SignedOut,SignIn} from "@clerk/nextjs"

export const metadata = {
    title: "NexusMart. - Store Dashboard",
    description: "NexusMart. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
        <SignedIn>
            <StoreLayout>
                {children}
            </StoreLayout>
        </SignedIn>
        <SignedOut>
            <div className="min-h-screen flex items-center justify-center">
                <SignIn fallbackRedirectUrl="/store" routing="hash"/>
            </div>
        </SignedOut>
        </>
    );
}
