import { useEffect, useRef, useState } from "react";
import { fetchChannelVideosPage, type YoutubeVideo } from "./youtube";

interface State {
  videos: YoutubeVideo[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
}

/** Loads a channel's uploaded videos one page at a time via the YouTube Data API,
 * newest first. Call `loadMore` to fetch the next page until `hasMore` is false. */
export function useYoutubeChannelVideos(channelId: string) {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
  const [state, setState] = useState<State>({
    videos: [],
    loading: true,
    loadingMore: false,
    error: apiKey ? null : "Video library isn't configured yet.",
    hasMore: false,
  });
  const nextPageToken = useRef<string | null>(null);

  useEffect(() => {
    if (!apiKey) return;
    let cancelled = false;

    fetchChannelVideosPage(channelId, apiKey)
      .then((page) => {
        if (cancelled) return;
        nextPageToken.current = page.nextPageToken;
        setState({ videos: page.videos, loading: false, loadingMore: false, error: null, hasMore: Boolean(page.nextPageToken) });
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error: err.message }));
      });

    return () => {
      cancelled = true;
    };
  }, [channelId, apiKey]);

  function loadMore() {
    if (!apiKey || !nextPageToken.current) return;
    setState((s) => ({ ...s, loadingMore: true }));
    fetchChannelVideosPage(channelId, apiKey, nextPageToken.current)
      .then((page) => {
        nextPageToken.current = page.nextPageToken;
        setState((s) => ({
          videos: [...s.videos, ...page.videos],
          loading: false,
          loadingMore: false,
          error: null,
          hasMore: Boolean(page.nextPageToken),
        }));
      })
      .catch((err: Error) => {
        setState((s) => ({ ...s, loadingMore: false, error: err.message }));
      });
  }

  return { ...state, loadMore };
}
