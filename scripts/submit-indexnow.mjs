import https from 'https';

const SITE_URL = "https://www.youtubetoolshub.com";
const API_KEY = "01d46652569c40eaa19149073834de57";
const KEY_LOCATION = `${SITE_URL}/${API_KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => reject(err));
    });
}

function submitBatch(urls) {
    const data = JSON.stringify({
        host: "www.youtubetoolshub.com",
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls
    });

    const options = {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => responseData += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: responseData }));
        });

        req.on('error', (error) => reject(error));
        req.write(data);
        req.end();
    });
}

async function main() {
    console.log(`fetching sitemap from ${SITEMAP_URL}...`);
    try {
        const sitemapXml = await fetchUrl(SITEMAP_URL);

        // Extract URLs using regex
        const urlRegex = /<loc>(.*?)<\/loc>/g;
        let match;
        const urls = [];

        while ((match = urlRegex.exec(sitemapXml)) !== null) {
            urls.push(match[1]);
        }

        console.log(`Found ${urls.length} URLs in sitemap.`);

        if (urls.length === 0) {
            console.error("No URLs found. Exiting.");
            return;
        }

        // Batch submit (IndexNow allows up to 10,000, we'll do batches of 1000 to be safe/nice)
        const batchSize = 1000;
        for (let i = 0; i < urls.length; i += batchSize) {
            const batch = urls.slice(i, i + batchSize);
            console.log(`Submitting batch ${i / batchSize + 1} (${batch.length} URLs)...`);

            try {
                const result = await submitBatch(batch);
                console.log(`Batch ${i / batchSize + 1} status: ${result.statusCode} ${result.body}`);
            } catch (err) {
                console.error(`Error submitting batch ${i / batchSize + 1}:`, err.message);
            }
        }

    } catch (err) {
        console.error("Error fetching sitemap:", err.message);
    }
}

main();
