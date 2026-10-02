import type { AnimeSite } from "../../shared/types";
import { getStandardVideoStats } from "../parser";

export const aniwaveStrategy: AnimeSite = {
	domains: ["aniwaves.ru"],
	iframe_src: ["play.echovideo.ru", "gn1r5n.org", "myvidplay.com"],

	getAnimeMetadata: () => {
		const titleElement = document.querySelector("h1.title.d-title");
		const episodeElement = document.querySelector(".tip b");
		const episodeNameElement = document.querySelector(
			".episodes.name ul.ep-range a.active .d-title",
		);
		const imageElement = document.querySelector(
			"#w-info .binfo .poster img",
		) as HTMLImageElement;

		const title = titleElement?.textContent?.trim().split("Episode")[0];
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
