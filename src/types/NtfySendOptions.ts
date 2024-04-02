import { ePriority } from "../enumerators/ePriority";
import { NtfyOptions } from "./NtfyOptions";



export type NtfySendOptions = NtfyOptions & {
    title?: string;
    priority?: ePriority;
    markdown?: boolean;
    tags?: string[];
    attachment?: string;
}