import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "NexusMart. - Store Dashboard",
    description: "NexusMart. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
