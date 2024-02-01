import { useEffect } from "react"
import { switchClass } from "../../utils"

function CommonContainer({ children }) {
    useEffect(() => {
        switchClass(document.querySelector('#commonContainer'), 'slide-up bg-white container')
    
        return () => {
            switchClass(document.querySelector('#commonContainer'), 'slide-out bg-white container')
        }
    }, [])
    
    
    return (
        <div id="commonContainer" className="bg-white container">
            {children}
        </div>
    )
}

export default CommonContainer