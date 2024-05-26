const Wrapper=(props)=>{
    return(
        <main>
            <div className="wrapperCss ">			
                <div className="row">
                    <div className="full-width ml-auto">
                        {props.children}
                    </div>
                </div>
            </div>
        </main>            
    )
}
export {Wrapper}