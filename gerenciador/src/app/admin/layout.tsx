import { Metadata } from "next";
import React from "react";
import { AdminGuard, AppMenu } from "@/themes/components";

// ===============================================
export const metadata: Metadata = {
  title: 'Gerenciador Web',
};
// ===============================================

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-transparent">
        <AppMenu />
        <div className="flex flex-1">
            {children}
        </div>
      </div>
    </AdminGuard>
  );
}
