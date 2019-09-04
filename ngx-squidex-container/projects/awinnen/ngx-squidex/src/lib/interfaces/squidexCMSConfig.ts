import { SquidexRequestContext } from '../interfaces/squidexRequestContext';

export class SquidexCMSConfig {
    /** Name of the Squidex App */
    app: string;
    /** The clientId of the Client to use */
    clientId: string;
    /** 
     * CLientSecret of the client
     * Make sure the client has only the permission is needs. Since Squidex does not allow anonymous Requests, the secret must be exposed to the frontend. Usually you want this client to be in the read role. 
     * */
    clientSecret: string;
    /** Url to Squidex Instance. E.g. https://cloud.squidex.io */
    url: string = 'https://cloud.squidex.io';
    storageGetterFn: () => Storage;
    storageKey: string = 'sqAccessToken';
    defaultRequestContext?: SquidexRequestContext;
}