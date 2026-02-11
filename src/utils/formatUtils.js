/**
 * Converts plain text into formatted HTML.
 * Detects headers (ending with colon or short caps) and bullet points.
 * Wraps everything in appropriate HTML tags for high-quality rendering.
 */
export const formatHTMLContent = (text) => {
    if (!text || typeof text !== "string") return "";

    // If it already looks like HTML (contains <p> or <h3> or <li>), return as is
    if (/<(p|h[1-6]|ul|li|div|br|strong) ?\/?>/i.test(text)) {
        return text;
    }

    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    const htmlLines = lines.map(line => {
        const trimmed = line.trim();

        // Detect Bullet Points
        if (trimmed.startsWith('-') || trimmed.startsWith('•') || /^\d+\./.test(trimmed)) {
            return `<li>${trimmed.replace(/^[-•]|\d+\.\s*/, '').trim()}</li>`;
        }

        // Detect Headers (Ends with colon or short capitalized line)
        // Heuristic: Headers are usually short and distinct
        if (trimmed.endsWith(':') || (trimmed.length < 50 && trimmed === trimmed.toUpperCase())) {
            return `<h3><strong>${trimmed}</strong></h3>`;
        }

        // Default Paragraph
        return `<p>${trimmed}</p>`;
    });

    return htmlLines.join('')
        .replace(/(<li>.*?<\/li>)+/g, match => `<ul>${match}</ul>`); // Wrap consecutive <li> in <ul>
};

// Alias for backward compatibility with jobs
export const formatJobDescription = formatHTMLContent;

