import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();

    return(
        <div>
            <button onClick={()=> navigate("/form", { state: { title: "Form A", type: 'a' } })}
            >Form A
            </button> 

            <button onClick={()=> navigate("/form", { state: { title: "Form B", type: 'b' } })}
            >Form B</button>
        </div>
    )
}