import { store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

export default function notif(ititle,imessage,itype){
    store.addNotification({
        title: ititle,
        message: imessage,
        type: itype,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__zoomInDown"],
        animationOut: ["animate__animated", "animate__zoomOutUp"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
    });
}