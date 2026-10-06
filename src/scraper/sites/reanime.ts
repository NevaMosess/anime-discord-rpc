import type { AnimeSite } from "../../shared/types";
import { getStandardVideoStats } from "../parser";

// Watch pages look like: https://reanime.to/watch/overgeared-vc4j78?ep=2
// and have a <title> like:  "Overgeared - Episode 2 | Re:ANIME"
const TITLE_REGEX = /^(.+?)\s+-\s+Episode\s+(\S+)\s+\|\s+Re:ANIME$/i;

export const reanimeStrategy: AnimeSite = {
	domains: ["reanime.to"],
	// TODO: add the video player domain(s) here (see PR notes)
	iframe_src: [],

	getAnimeMetadata: () => {
		// Only report activity on actual watch pages (not /home, /search, ...)
		if (!/\/watch\//.test(window.location.pathname)) {
			return { title: null, episode: null, coverUrl: null };
		}

		const match = document.title.trim().match(TITLE_REGEX);

		// Fallback: the ?ep= query param holds the episode number
		const epParam = new URLSearchParams(window.location.search).get("ep");
		const epFromUrl = epParam && /^\d+(\.\d+)?$/.test(epParam) ? epParam : null;

		const title = match?.[1]?.trim();
		const episode = match?.[2] ?? epFromUrl;

		// og:image already points to the public AniList CDN (not protected),
		// so no background FETCH_ANILIST call is needed here.
		const coverUrl = document
			.querySelector<HTMLMetaElement>('meta[property="og:image"]')
			?.content?.trim();

		return {
			title: title || null,
			episode: episode || null,
			coverUrl: coverUrl || null,
		};
	},

	getProgressStats: () => getStandardVideoStats(),
};
