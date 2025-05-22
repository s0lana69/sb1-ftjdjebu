import { YoutubeSettings } from "@/components/dashboard/youtube-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and connected platforms
        </p>
      </div>
      <YoutubeSettings />
    </div>
  );
}