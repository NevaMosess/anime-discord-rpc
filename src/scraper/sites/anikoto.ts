import type { AnimeSite } from "../../shared/types";
import { getStandardVideoStats } from "../parser";

export const anikotoStrategy: AnimeSite = {
	domains: ["anikototv.to", "anikoto.cz"],
	iframe_src: ["vidtube.site", "megaplay.buzz", "viswish.live"],

	getAnimeMetadata: () => {
		const titleElement = document.querySelector("h1.title");
		const episodeElement = document.querySelector(".tip b");
		const episodeNameElement = document.querySelector(
			"#w-episodes .ep-range a.active .d-title",
		);
		const imageElement = document.querySelector(
			"#w-info .binfo .poster img",
		) as HTMLImageElement;

		const title = titleElement?.textContent?.trim();
		const episode = episodeElement?.textContent?.trim();
		const episodeName = episodeNameElement?.textContent?.trim();
		const coverUrl = imageElement?.src;

		return {
			title: titleElement ? title : null,
			episode: episodeElement ? episode : null,
			episodeName:
				episodeNameElement && episode !== episodeName ? episodeName : null,
			coverUrl: coverUrl ? coverUrl : null,
		};
	},

	getProgressStats: () => getStandardVideoStats(),
};
