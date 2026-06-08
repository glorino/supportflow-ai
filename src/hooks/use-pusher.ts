"use client";

import { useEffect, useState, useCallback } from "react";

interface PusherEvent {
  ticketId?: string;
  conversationId?: string;
  [key: string]: unknown;
}

export function usePusher(channel: string, event: string, callback: (data: PusherEvent) => void) {
  useEffect(() => {
    let pusherClient: unknown = null;
    let subscription: unknown = null;

    const loadPusher = async () => {
      const { default: PusherJS } = await import("pusher-js");
      const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
      const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2";

      if (!key) return;

      pusherClient = new PusherJS(key, {
        cluster,
        forceTLS: true,
      });

      subscription = (pusherClient as { subscribe: (ch: string) => { bind: (evt: string, cb: (d: PusherEvent) => void) => void } }).subscribe(channel);
      subscription.bind(event, callback);
    };

    loadPusher();

    return () => {
      if (subscription && pusherClient) {
        (subscription as { unsubscribe: () => void }).unsubscribe();
      }
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
