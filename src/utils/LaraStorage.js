
/**
 * Returns url to storage item, but if it is already a url, 
 * just return the url
 * 
 * @param {string} storage_url 
 * @param {string} base URL 
 */
import { base } from "@/config"

function storageUrl(storage_url) {
  if (storage_url.startsWith("http") || storage_url.startsWith("https")) {
    return storage_url
  } else {
    return base + "/storage/" + storage_url
  }
}

export default storageUrl
