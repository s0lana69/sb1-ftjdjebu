"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function YoutubeSettings() {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/callback/youtube`;
    const scope = "https://www.googleapis.com/auth/youtube.readonly";
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
    // For demo purposes, we'll simulate a successful connection
    setIsConnected(true);
    toast({
      title: "YouTube Account Connected",
      description: "Your YouTube account has been successfully connected.",
    });
  };

  const handleDisconnect = async () => {
    setIsConnected(false);
    toast({
      title: "YouTube Account Disconnected",
      description: "Your YouTube account has been disconnected.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube Integration</CardTitle>
        <CardDescription>
          Connect your YouTube account to display analytics and manage your content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">YouTube Account</p>
            <p className="text-sm text-muted-foreground">
              {isConnected 
                ? "Your YouTube account is connected" 
                : "Connect your YouTube account to get started"}
            </p>
          </div>
          <Button
            variant={isConnected ? "destructive" : "default"}
            onClick={isConnected ? handleDisconnect : handleConnect}
            className="transition-colors hover:bg-violet-500 hover:text-white"
          >
            {isConnected ? "Disconnect" : "Connect YouTube"}
          </Button>
        </div>
        {isConnected && (
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm font-medium">Connected Account</p>
            <p className="text-xs text-muted-foreground">TrueViral YouTube Channel</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}