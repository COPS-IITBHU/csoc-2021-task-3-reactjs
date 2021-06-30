// importing... 

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";



// function for the footer 
export default function Footer()
{
    return <>
        <h4 className='footer-part'>Todo App Created by COPS core members</h4>
    </>
}