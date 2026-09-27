const API_BASE = "https://www.googleapis.com/youtube/v3";

export interface YoutubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface PlaylistItemsPage {
  videos: YoutubeVideo[];
  nextPageToken: string | null;
}

let uploadsPlaylistId: string | null = null;

async function getJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `YouTube API request failed (${res.status})`);
  }
  return res.json();
}

async function fetchUploadsPlaylistId(channelId: string, apiKey: string): Promise<string> {
  if (uploadsPlaylistId) return uploadsPlaylistId;
  const url = `${API_BASE}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
  const data = await getJson(url);
  const playlistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) throw new Error("Couldn't find this channel's uploads.");
  uploadsPlaylistId = playlistId;
  return playlistId;
}

/** One page (up to 50) of a channel's uploaded videos, newest first. */
export async function fetchChannelVideosPage(
  channelId: string,
  apiKey: string,
  pageToken?: string,
): Promise<PlaylistItemsPage> {
  const playlistId = await fetchUploadsPlaylistId(channelId, apiKey);
  const params = new URLSearchParams({
    part: "snippet",
    playlistId,
    maxResults: "12",
    key: apiKey,
  });
  if (pageToken) params.set("pageToken", pageToken);

  const data = await getJson(`${API_BASE}/playlistItems?${params.toString()}`);
  const videos: YoutubeVideo[] = (data.items ?? [])
    .filter((item: { snippet?: { title?: string } }) => item.snippet?.title !== "Private video" && item.snippet?.title !== "Deleted video")
    .map((item: { snippet: { resourceId?: { videoId?: string }; title: string; publishedAt: string; thumbnails: Record<string, { url: string }> } }) => ({
      id: item.snippet.resourceId?.videoId ?? "",
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnail:
        item.snippet.thumbnails.medium?.url ?? item.snippet.thumbnails.default?.url ?? "",
    }))
    .filter((v: YoutubeVideo) => v.id);

  return { videos, nextPageToken: data.nextPageToken ?? null };
}
