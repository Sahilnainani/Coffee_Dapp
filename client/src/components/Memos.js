import {useState, useEffect} from 'react';

const Memos = ({state})=>{
    const [memos,setMemos] = useState([])
    const {contract} = state;
    useEffect(()=>{
        const memosMessage=async()=>{
            const memos = await contract.getMemos();
            setMemos(memos);
        }
        contract && memosMessage()
    },[contract])
    return(
        <div>
            <p style={{ textAlign: "center", marginTop: "20px" }}>Messages</p>
            {memos.map((memo)=>{
                return(
                    <div className="container-fluid"
                    style={{ width: "100%" }}
                    key={Math.random()}>
                        <table style={{marginBottom: "10px",}} key={memo.timestamp}>
                            <tbody>
                                <tr>
                                    <td style={{backgroundColor: "#96D4D4",border: "1px solid white",borderCollapse: "collapse",padding: "7px",width: "200px",}}>{memo.name}</td>
                                    <td style={{backgroundColor: "#96D4D4",border: "1px solid white",borderCollapse: "collapse",padding: "7px",width: "500px",}}>{memo.message}</td>
                                    <td style={{backgroundColor: "#96D4D4",border: "1px solid white",borderCollapse: "collapse",padding: "7px",width: "500px",}}>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
                                    <td style={{backgroundColor: "#96D4D4",border: "1px solid white",borderCollapse: "collapse",padding: "7px",width: "400px",}}>{memo.sender}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}

export default Memos;