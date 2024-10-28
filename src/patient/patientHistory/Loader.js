import React from "react";
import { TailSpin } from "react-loader-spinner";
import { Theme_Color } from "../../config";

export default function Loader() {
    return (
        <TailSpin
            height="40"
            width="40"
            color={ Theme_Color}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}