import { getCollection } from 'astro:content';
// import { isEnglishEntry, isKoreanEntry, isRecipeEntry, isTutorialEntry } from './content/config';

export const allDocs = await getCollection('docs', (entry) => {
	// if (import.meta.env.PUBLIC_TWO_LANG) {
	// 	// Build for two languages only to speed up Astro's smoke tests
	// 	return isEnglishEntry(entry) || isKoreanEntry(entry);
	// } else {
	// 	return true;
	// }
	return true;
});
// export const tutorialPages = allPages.filter(isTutorialEntry);
// export const recipePages = allPages.filter(isRecipeEntry);
// export const englishPages = allPages.filter(isEnglishEntry);

export const allPages = await getCollection('pages', (entry) => {
	return true;
});