"use client";

import React from "react";
import Navbar from "../components/Navbar";
import {
  User,
  Shield,
  Palette,
  Bell,
  Plug,
  ChevronRight,
} from "lucide-react";

const Section = ({ title, icon: Icon, children }) => (
  <div className="group bg-white/80 backdrop-blur rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-50 transition">
          <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition" />
    </div>
    <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
  </div>
);

export default function SettingsPage() {
  return (
    <section className="sm:flex sm:h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Settings
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage your store preferences and account settings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Section title="Profile" icon={User}>
                Update your display name, email, and profile image for your admin account.
              </Section>

              <Section title="Account" icon={Shield}>
                Manage password, security settings, and enable two-factor authentication.
              </Section>

              <Section title="Appearance" icon={Palette}>
                Customize dashboard theme, layout density, and visual preferences.
              </Section>

              <div className="md:col-span-2">
                <Section title="Notifications" icon={Bell}>
                  Control email alerts, push notifications, and order updates in real-time.
                </Section>
              </div>

              <Section title="Integrations" icon={Plug}>
                Connect payment methods, shipping services, and analytics tools.
              </Section>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}