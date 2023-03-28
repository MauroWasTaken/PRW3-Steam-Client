import { useParams } from 'react-router';
import '/src/assets/style/details.css'
import {useEffect, useState} from "react";

export default function NoPage() {


    return (
        <div className={"container"}>
            <div className={"title"}>
                <h1>
                    404 - Page not found
                </h1>
            </div>
        </div>
    )
}