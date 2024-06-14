import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loader() {
    return (
        <TailSpin
            height="40"
            width="40"
            color="#1a3c8b"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}