export const GA_TRACKING_ID = 'G-RR5FV6XJLS';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
	action: string,
	category: string,
	label: string,
	value: string
) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value,
	});
};
