"use client";

import { useEffect, useState, useCallback } from "react";

interface PusherEvent {
  ticketId?: string;
  conversationId?: string;
  [key: string]: unknown;
}

interface PusherChannel {
  bind: (event: string, callback: (data: PusherEvent) => void) => void;
  unbind: () => void;
}

interface PusherClient {
  subscribe: (channel: string) => PusherChannel;
  disconnect: () => void;
}

export function usePusher(channel: string, event: string, callback: (data: PusherEvent) => void) {
  useEffect(() => {
    let client: PusherClient | null = null;
    let sub: PusherChannel | null = null;

    const loadPusher = async () => {
      const { default: PusherJS } = await import("pusher-js");
      const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
      const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2";

      if (!key) return;

      client = new PusherJS(key, {
        cluster,
        forceTLS: true,
      }) as unknown as PusherClient;

      sub = client.subscribe(channel);
      sub.bind(event, callback);
    };

    loadPusher();

    return () => {
      if (sub) sub.unbind();
      if (client) client.disconnect();
    };
  }, [channel, event, callback]);
}

export function useRealtimeTickets() {
  const [updates, setUpdates] = useState<PusherEvent[]>([]);

  const handler = useCallback((data: PusherEvent) => {
    setUpdates((prev) => [data, ...prev].slice(0, 50));
  }, []);

  usePusher("tickets", "ticket-updated", handler);

  return updates;
}

export function useRealtimeInbox() {
  const [updates, setUpdates] = useState<PusherEvent[]>([]);

  const handler = useCallback((data: PusherEvent) => {
    setUpdates((prev) => [data, ...prev].slice(0, 50));
  }, []);

  usePusher("inbox", "inbox-updated", handler);

  return updates;
}
