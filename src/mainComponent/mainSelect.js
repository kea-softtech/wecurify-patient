const MainSelect = (props) => {
    return (
        <div>
            <select
                className="form-control"
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                multiSelect={props}
            >
                {props.children}
            </select>
        </div>
    )
}
export { MainSelect }