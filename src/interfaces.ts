import { Readable } from "stream";

import { Device } from "./http/device";
import { HTTPApiPersistentData, Picture, PropertyValue, Schedule } from "./http/interfaces";
import { Station } from "./http/station";
import { DeviceSmartLockMessage } from "./mqtt/model";
import { DatabaseCountByDate, DatabaseQueryLatestInfo, DatabaseQueryLocal, StreamMetadata } from "./p2p/interfaces";
import { CommandResult } from "./p2p/models";
import { TalkbackStream } from "./p2p/talkback";
import { AlarmEvent, DatabaseReturnCode, SmartSafeAlarm911Event, SmartSafeShakeAlarmEvent } from "./p2p/types";
import { Credentials, PushMessage } from "./push/models";

export interface StationIPAddresses {
    [index: string]: string;
}

export interface EufySecurityConfig {
    username: string;
    password: string;
    country?: string;
    language?: string;
    trustedDeviceName?: string;
    persistentDir?: string;
    p2pConnectionSetup: number;
    pollingIntervalMinutes: number;
    eventDurationSeconds: number;
    acceptInvitations?: boolean;
    stationIPAddresses?: StationIPAddresses;
}

export interface EufySecurityPersistentData {
    country: string;
    login_hash: string;
    openudid: string;
    serial_number: string;
    cloud_token?: string;
    cloud_token_expiration?: number;
    push_credentials: Credentials | undefined;
    push_persistentIds: string[];
    version: string;
    httpApi?: HTTPApiPersistentData;
    fallbackTrustedDeviceName?: string;
}

export interface EufySecurityEvents {
    "device added": (device: Device) => void;
    "device removed": (device: Device) => void;
    "device property changed": (device: Device, name: string, value: PropertyValue) => void;
    "device raw property changed": (device: Device, type: number, value: string) => void;
    "device crying detected": (device: Device, state: boolean) => void;
    "device sound detected": (device: Device, state: boolean) => void;
    "device pet detected": (device: Device, state: boolean) => void;
    "device vehicle detected": (device: Device, state: boolean) => void;
    "device motion detected": (device: Device, state: boolean) => void;
    "device person detected": (device: Device, state: boolean, person: string) => void;
    "device stranger person detected": (device: Device, state: boolean) => void;
    "device dog detected": (device: Device, state: boolean) => void;
    "device dog lick detected": (device: Device, state: boolean) => void;
    "device dog poop detected": (device: Device, state: boolean) => void;
    "device rings": (device: Device, state: boolean) => void;
    "device locked": (device: Device, state: boolean) => void;
    "device open": (device: Device, state: boolean) => void;
    "device package delivered": (device: Device, state: boolean) => void;
    "device package stranded": (device: Device, state: boolean) => void;
    "device package taken": (device: Device, state: boolean) => void;
    "device someone loitering": (device: Device, state: boolean) => void;
    "device radar motion detected": (device: Device, state: boolean) => void;
    "device 911 alarm": (device: Device, state: boolean, detail: SmartSafeAlarm911Event) => void;
    "device shake alarm": (device: Device, state: boolean, detail: SmartSafeShakeAlarmEvent) => void;
    "device wrong try-protect alarm": (device: Device, state: boolean) => void;
    "device long time not close": (device: Device, state: boolean) => void;
    "device low battery": (device: Device, state: boolean) => void;
    "device jammed": (device: Device, state: boolean) => void;
    "device pin verified": (device: Device, successfull: boolean) => void;
    "station added": (station: Station) => void;
    "station removed": (station: Station) => void;
    "station livestream start": (station: Station, device: Device, metadata: StreamMetadata, videostream: Readable, audiostream: Readable) => void;
    "station livestream stop": (station: Station, device: Device) => void;
    "station download start": (station: Station, device: Device, metadata: StreamMetadata, videoStream: Readable, audioStream: Readable) => void;
    "station download finish": (station: Station, device: Device) => void;
    "station command result": (station: Station, result: CommandResult) => void;
    "station rtsp livestream start": (station: Station, device: Device) => void;
    "station rtsp livestream stop": (station: Station, device: Device) => void;
    "station rtsp url": (station: Station, device: Device, value: string) => void;
    "station guard mode": (station: Station, guardMode: number) => void;
    "station current mode": (station: Station, currentMode: number) => void;
    "station property changed": (station: Station, name: string, value: PropertyValue) => void;
    "station raw property changed": (station: Station, type: number, value: string) => void;
    "station alarm event": (station: Station, alarmEvent: AlarmEvent) => void;
    "station alarm delay event": (station: Station, alarmDelayEvent: AlarmEvent, alarmDelay: number) => void;
    "station alarm armed": (station: Station) => void;
    "station alarm arm delay event": (station: Station, armDelay: number) => void;
    "station connect": (station: Station) => void;
    "station connection error": (station: Station, error: Error) => void;
    "station close": (station: Station) => void;
    "station talkback start": (station: Station, device: Device, talkbackStream: TalkbackStream) => void;
    "station talkback stop": (station: Station, device: Device) => void;
    "station image download": (station: Station, file: string, image: Picture) => void;
    "station database query latest": (station: Station, returnCode: DatabaseReturnCode, data: Array<DatabaseQueryLatestInfo>) => void;
    "station database query local": (station: Station, returnCode: DatabaseReturnCode, data: Array<DatabaseQueryLocal>) => void;
    "station database count by date": (station: Station, returnCode: DatabaseReturnCode, data: Array<DatabaseCountByDate>) => void;
    "station database delete": (station: Station, returnCode: DatabaseReturnCode, failedIds: Array<unknown>) => void;
    "push connect": () => void;
    "push close": () => void;
    "push message": (message: PushMessage) => void;
    "connect": () => void;
    "close": () => void;
    "connection error": (error: Error) => void;
    "tfa request": () => void;
    "captcha request": (id: string, captcha: string) => void;
    "cloud livestream start": (station: Station, device: Device, url: string) => void;
    "cloud livestream stop": (station: Station, device: Device) => void;
    "mqtt connect": () => void;
    "mqtt close": () => void;
    "mqtt lock message": (message: DeviceSmartLockMessage) => void;
    "user added": (device: Device, username: string, schedule?: Schedule) => void;
    "user deleted": (device: Device, username: string) => void;
    "user error": (device: Device, username: string, error: Error) => void;
    "user username updated": (device: Device, username: string) => void;
    "user schedule updated": (device: Device, username: string, schedule: Schedule) => void;
    "user passcode updated": (device: Device, username: string) => void;
}