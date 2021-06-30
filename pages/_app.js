// importing... 

import "../styles/globals.css";
import "izitoast/dist/css/iziToast.min.css";
import { Functioning } from "../components/AppContext";




// declaration and defining of the function MyApp along with it's export 
export default function MyApp({ Component, pageProps }) {
    return (
        <Functioning>
            <Component {...pageProps} />
        </Functioning>
    );
}


