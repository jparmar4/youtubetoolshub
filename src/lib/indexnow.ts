import { siteConfig } from "@/config/site";

interface IndexNowParams {
    urls: string[];
}

/**
 * Submit URLs to IndexNow (Bing, Yandex, etc.)
 * @see https://www.indexnow.org/documentation
 */
export async function submitToIndexNow({ urls }: IndexNowParams): Promise<{ success: boolean; message: string }> {
    const { key, url: host } = siteConfig.seo.indexNow;

    if (!key) {
        console.warn("IndexNow key not configured");
        return { success: false, message: "IndexNow key not configured" };
    }

    try {
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                host: host.replace(/^https?:\/\//, ""), // Host should not include protocol
                key,
                keyLocation: `${host}/${key}.txt`,
                urlList: urls,
            }),
        });

        if (response.status === 200 || response.status === 202) {
            return { success: true, message: "Successfully submitted to IndexNow" };
        } else {
            const errorText = await response.text();
            return { success: false, message: `Failed to submit: ${response.status} ${errorText}` };
        }
    } catch (error) {
        console.error("IndexNow submission error:", error);
        return { success: false, message: "Internal error during IndexNow submission" };
    }
}
