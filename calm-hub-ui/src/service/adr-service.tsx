import {
    Data,
    Revision,
    AdrID,
} from '../model/calm.js';
import { getToken } from '../authService.js';


/**
 * Fetch adr IDs for a given namespace and set them using the provided setter function.
 */
export async function fetchAdrIDs(namespace: string, setAdrIDs: (adrIDs: AdrID[]) => void) {
    try {
        const accessToken = await getToken();
        const res = await fetch(`/calm/namespaces/${namespace}/adrs`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setAdrIDs(data.values);
    } catch (error) {
        console.error(`Error fetching adr IDs for namespace ${namespace}:`, error);
    }
}

/**
 * Fetch revisions for a given namespace and adr ID and set them using the provided setter function.
 */
export async function fetchAdrRevisions(
    namespace: string,
    adrID: string,
    setAdrRevisions: (adrRevisions: Revision[]) => void
) {
    try {
        const accessToken = await getToken();
        const res = await fetch(`/calm/namespaces/${namespace}/adrs/${adrID}/revisions`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setAdrRevisions(data.values);
    } catch (error) {
        console.error(`Error fetching revisions for ADR ID ${adrID}:`, error);
    }
}

/**
 * Fetch a specific adr by namespace, adr ID, and revision, and set it using the provided setter function.
 */
export async function fetchAdr(
    namespace: string,
    adrID: string,
    revision: string,
    setAdr: (adr: Data) => void
) {
    try {
        const accessToken = await getToken();
        const res = await fetch(
            `/calm/namespaces/${namespace}/adrs/${adrID}/revisions/${revision}`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        const response = await res.json();

        setAdr(response);
    } catch (error) {
        console.error(
            `Error fetching adr for namespace ${namespace}, adr ID ${adrID}, revision ${revision}:`,
            error
        );
    }
}
