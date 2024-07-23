import { Button } from "react-bootstrap"

const SecondaryButton = (props) => {
    return (
        <Button
            type="submit"
            variant="default"
            className="lightbuttonColor mr-3 btn_sub"
            onClick={props.onClick}
        >{props.children}</Button>
    )
}

export { SecondaryButton }