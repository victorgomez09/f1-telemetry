import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ws from 'ws';
import zlib from 'zlib';
import { F1State } from './models/f1.model';

@Injectable()
export class WebSocketService {
    private logger = new Logger(WebSocketService.name);

    private signalrUrl = 'livetiming.formula1.com/signalr';
    private signalrHub = 'Streaming';
    private messageCount = 0;
    private emptyMessageCount = 0;
    private retryFreq = 10000;

    public state: F1State = {};
    public socketFreq = 1000;

    constructor(private configService: ConfigService) {}

    async setupStream() {
        const hub = encodeURIComponent(
            JSON.stringify([{ name: this.signalrHub }]),
        );
        const negotiation = await fetch(
            `https://${this.signalrUrl}/negotiate?connectionData=${hub}&clientProtocol=1.5`,
        );
        const cookie =
            negotiation.headers.get('Set-Cookie') ??
            negotiation.headers.get('set-cookie');
        const { ConnectionToken } = await negotiation.json();

        if (cookie && ConnectionToken) {
            this.logger.log(`[${this.signalrUrl}] HTTP negotiation complete`);

            const socket = new ws(
                `wss://${this.signalrUrl}/connect?clientProtocol=1.5&transport=webSockets&connectionToken=${encodeURIComponent(
                    ConnectionToken,
                )}&connectionData=${hub}`,
                [],
                {
                    headers: {
                        'User-Agent': 'BestHTTP',
                        'Accept-Encoding': 'gzip,identity',
                        Cookie: cookie,
                    },
                },
            );

            socket.on('open', () => {
                this.logger.log(`[${this.signalrUrl}] WebSocket open`);

                this.state = {};
                this.messageCount = 0;
                this.emptyMessageCount = 0;

                socket.send(
                    JSON.stringify({
                        H: this.signalrHub,
                        M: 'Subscribe',
                        A: [
                            [
                                'Heartbeat',
                                'CarData.z',
                                'Position.z',
                                'ExtrapolatedClock',
                                'TimingStats',
                                'TimingAppData',
                                'WeatherData',
                                'TrackStatus',
                                'DriverList',
                                'RaceControlMessages',
                                'SessionInfo',
                                'SessionData',
                                'LapCount',
                                'TimingData',
                                'TeamRadio',
                            ],
                        ],
                        I: 1,
                    }),
                );
            });

            socket.on('message', (data) => {
                this.updateState(data);
            });

            socket.on('error', () => {
                this.logger.log('socket error');
                socket.close();
            });

            socket.on('close', () => {
                this.logger.log('socket close');
                this.state = {};
                this.messageCount = 0;
                this.emptyMessageCount = 0;

                setTimeout(() => {
                    this.setupStream();
                }, this.retryFreq);
            });
        } else {
            this.logger.log(
                `[${this.signalrUrl}] HTTP negotiation failed. Is there a live session?`,
            );
            this.state = {};
            this.messageCount = 0;

            setTimeout(() => {
                this.setupStream();
            }, this.retryFreq);
        }
    }

    private updateState(data: any) {
        try {
            const parsed = JSON.parse(data.toString());

            if (!Object.keys(parsed).length) this.emptyMessageCount++;
            else this.emptyMessageCount = 0;

            if (
                this.emptyMessageCount > 5 &&
                this.configService.get<string>('NODE_ENV') !== 'production'
            ) {
                this.state = {};
                this.messageCount = 0;
            }

            if (Array.isArray(parsed.M)) {
                for (const message of parsed.M) {
                    if (message.M === 'feed') {
                        this.messageCount++;

                        let [field, value] = message.A;

                        if (field === 'CarData.z' || field === 'Position.z') {
                            const [parsedField] = field.split('.');
                            field = parsedField;
                            value = this.parseCompressed(value);
                        }

                        this.state = this.deepObjectMerge(this.state, {
                            [field]: value,
                        });
                    }
                }
            } else if (Object.keys(parsed.R ?? {}).length && parsed.I === '1') {
                this.messageCount++;

                if (parsed.R['CarData.z'])
                    parsed.R['CarData'] = this.parseCompressed(
                        parsed.R['CarData.z'],
                    );

                if (parsed.R['Position.z'])
                    parsed.R['Position'] = this.parseCompressed(
                        parsed.R['Position.z'],
                    );

                this.state = this.deepObjectMerge(this.state, parsed.R);
            }
        } catch (e) {
            this.logger.error(`could not update data: ${e}`);
        }
    }

    private deepObjectMerge(original = {}, modifier: any) {
        if (!modifier) return original;

        const copy = { ...original };
        for (const [key, value] of Object.entries(modifier)) {
            const valueIsObject =
                typeof value === 'object' &&
                !Array.isArray(value) &&
                value !== null;
            if (valueIsObject && !!Object.keys(value).length) {
                copy[key] = this.deepObjectMerge(copy[key], value);
            } else {
                copy[key] = value;
            }
        }

        return copy;
    }

    private parseCompressed(data) {
        return JSON.parse(
            zlib.inflateRawSync(Buffer.from(data, 'base64')).toString(),
        );
    }
}
