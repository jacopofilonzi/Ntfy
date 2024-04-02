import { ePriority } from "../enumerators/ePriority";
import { NtfyOptions } from "../types/NtfyOptions";
import { NtfySendOptions } from "../types/NtfySendOptions";

export class Ntfy {
    istanceUrl: string = "";
    token: string | undefined = undefined;
    topic: string | undefined = undefined;
    iconUrl: string | undefined = undefined;

    constructor({
        istanceUrl = "https://ntfy.sh",
        token = undefined,
        topic = undefined,
        iconUrl = undefined,
    }: NtfyOptions) {
        if (!/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}$/i.test(istanceUrl))
            throw new Error("Invalid URL format");
        else this.istanceUrl = istanceUrl;

        this.token = token;
        this.topic = topic;
    }

    public async send(
        content: string,
        {
            istanceUrl = undefined,
            token = undefined,
            topic = undefined,
            attachment = undefined,
            iconUrl = undefined,
            markdown = false,
            priority = ePriority.Default,
            tags = [],
            title = undefined,
        }: NtfySendOptions = {}
    ) {
        //The istanceUrl is not defined
        if (this.istanceUrl === undefined && istanceUrl == undefined)
            throw new Error("The istanceUrl is not defined");

        //Check the provided istanceUrl with a regex
        if (
            istanceUrl != undefined &&
            !/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}$/i.test(istanceUrl!)
        )
            throw new Error(
                "Invalid istanceUrl format, use 'https://ntfy.sh' or 'http[s]://your-ntfy-instance.com'"
            );

        //The topic is not defined
        if (
            (this.topic === undefined || this.topic.trim() === "") &&
            (topic === undefined || topic.trim() === "")
        )
            throw new Error("The topic is not defined");

        //Prepare the header list
        const headerList: { [key: string]: string } = {};

        //Priority
        headerList["Priority"] = priority;

        //Use the token
        if (token != undefined) {
            headerList["Authorization"] = `Bearer ${token}`;
        } else if (this.token != undefined) {
            headerList["Authorization"] = `Bearer ${this.token}`;
        }

        //File attachments
        if (attachment != undefined) {
            headerList["Attachment"] = attachment;
        }

        //Notification title
        if (title != undefined) {
            headerList["Title"] = title;
        }

        //Icon URL
        if (iconUrl != undefined) {
            headerList["Icon"] = iconUrl;
        } else if (this.iconUrl != undefined) {
            headerList["Icon"] = this.iconUrl;
        }

        //Emoji tags
        if (tags.length > 0) {
            headerList["Tags"] = tags.join(",");
        }

        //Markdown
        if (markdown) {
            headerList["Markdown"] = "yes";
        }

        //Send the request
        var url: string = istanceUrl ? istanceUrl : this.istanceUrl;
        url += "/";
        url += topic ? topic : this.topic;

        const response = await fetch(url, {
            method: "POST",
            headers: headerList,
            body: content,
        });

        
        if (response.status === 403)
            throw new Error("This topic is protected by a token")

        
        if (response.status === 401)
            throw new Error("Invalid token provided for this topic")


        if (response.status !== 200)
            throw new Error(`An error occurred while sending the notification: ${response}`)

        return response;
    }
}
