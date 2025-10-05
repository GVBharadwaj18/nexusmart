import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "NexusMart. - Admin",
    description: "NexusMart. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
