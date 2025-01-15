# Warning

**This repository is discontinued, see the new implementation at [github@jacopofilonzi/ntfy.js](https://github.com/jacopofilonzi/Ntfy.JS)**

# Ntfy interface
>Author: [Filonzi Jacopo](https://www.filonzi.it)

This library will help you to interface with the [ntfy.sh](https://ntfy.sh/) application


## How to use

You will need to use the Ntfy class to create an object

    const ntfy = new Ntfy({
        topic: "<Topic name>",
        [token:"<Authorization token>"],
        [istanceUrl: "<https://your-custom-istance.com>"]
    });

    ntfy.send("Hello from Ntfy!");

simple as that, have to mandatory pass only your topic name, your token if the topic is protected and the istanceurl if is different from the https://ntfy.sh site.



to the send method you can add also the following options, this is what is set by default:

    ntfy.send("Hello from Ntfy!", {

            //The title of the message
            title = undefined,
            
            //Custom istance url (if you wanna switch from the one you initialy set)
            istanceUrl = undefined,
        
            //The token to access the topic if it is protected
            token = undefined,             
        
            //The topic name you want to send the message to
            topic = undefined,
        
            //Attachments you wanna insert into the message (WORK IN PROGRESS)
            attachment = undefined,
        
            //Icon url you want to use for the message (WORK IN PROGRESS)
            iconUrl = undefined,
        
            //If the message should be formatted with markdown elements
            markdown = false,
        
            //The priority that the message has
            priority = ePriority.Default,

            //Emoji to add to the message (avaiable tags at https://docs.ntfy.sh/emojis/)
            tags = [],
    })


Ntfy supports tags for emoji, you will find a list [here](https://docs.ntfy.sh/emojis/) on theire website
