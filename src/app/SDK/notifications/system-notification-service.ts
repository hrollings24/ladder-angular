import { Injectable } from "@angular/core";
import { QuerySnapshot } from "@angular/fire/compat/firestore";
import { SystemNotification, SystemNotificationType } from "./system-notification.model";

@Injectable()
export class SystemNotificationService{

    public ConvertQuerySnapshotToModel(snapshot: QuerySnapshot<any>)
    {
        var notifications: Array<SystemNotification> = []

        snapshot.forEach(element => {
            console.log(element)
            var notification = new SystemNotification(
                element.data()["fromUser"], 
                element.data()["message"], 
                <SystemNotificationType> element.data()["type"],
                element.data()["title"], 
                element.data()["ladder"], 
                element.id, 
                element.data()["toUser"],
                element.data()["challengeRef"]
            )

            notifications.push(notification)
        });

        return notifications
    }

}