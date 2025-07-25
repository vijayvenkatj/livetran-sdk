export interface SDKConfig {
    sharedSecret: string;
    baseURL:   string;
}


export interface StartArgs {
    stream_id:    string;
    webhook_urls: string[];
}

export interface StopArgs {
    stream_id:    string
}


export interface ServerResponse {
    success: boolean;
    data?: string
    error?: {
        message: string;
        // TODO: Make better Error handlers
    }
}