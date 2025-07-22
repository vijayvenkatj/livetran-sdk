import { SDKConfig, ServerResponse, StartArgs, StopArgs } from '../types/config'
import crypto from 'crypto';
import fetch from "node-fetch";
import { SDKError } from './error';

export class LiveTranSDK {

    private secretKey: string;
    private baseUrl: string;

    constructor (config: SDKConfig) {
        this.baseUrl = config.baseURL
        this.secretKey = config.secretKey
    }

    private generateHMAC(requestBody: string) {
        const sig = crypto
            .createHmac('sha256', this.secretKey)
            .update(requestBody)
            .digest('hex');
        return sig;
    }


    async startStream(streamBody: StartArgs): Promise<ServerResponse> {

        const requestBody = JSON.stringify(streamBody)

        const signature = this.generateHMAC(requestBody)

        const response = await fetch(`${this.baseUrl}/api/start-stream`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "LT-SIGNATURE": signature
            },
            body: requestBody
        })

        let responseJson: any;
        try {
            responseJson = await response.json();
        } 
        catch (err) {
            throw new SDKError("Invalid JSON response", response.status);
        }

        if (!response.ok || responseJson.success !== true) {
            throw new SDKError(
                responseJson?.error || "Unknown error",
                response.status
            );
        }

        return {
            success: true,
            data: responseJson.data,
        };

    }

    async stopStream(streamBody: StopArgs): Promise<ServerResponse> {

        const requestBody = JSON.stringify(streamBody)

        const signature = this.generateHMAC(requestBody)

        const response = await fetch(`${this.baseUrl}/api/stop-stream`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "LT-SIGNATURE": signature
            },
            body: requestBody
        })

        let responseJson: any;
        try {
            responseJson = await response.json();
        } 
        catch (err) {
            throw new SDKError("Invalid JSON response", response.status);
        }

        if (!response.ok || responseJson.success !== true) {
            throw new SDKError(
                responseJson?.error || "Unknown error",
                response.status
            );
        }

        return {
            success: true,
            data: responseJson.data,
        };

    }


}