export const fmt = (date) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

export const assetPath = (path) => (path?.startsWith("/") ? path : `/${path}`);