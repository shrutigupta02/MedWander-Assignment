import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <button onClick={()=> navigate("/form", { state: { title: "Form A" } })}
            >Form A
            </button> 

            <button onClick={()=> navigate("/form", { state: { title: "Form B" } })}
            >Form B</button>
        </div>
    )
}