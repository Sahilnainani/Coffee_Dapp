import {ethers} from 'ethers'

const Buy = ({state})=>{

    const buyChai = async(event)=>{
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector('#name').value;
        const message = document.querySelector('#message').value;
        const eth = document.querySelector('#eth').value;
        console.log(name,message,contract)
        const amount = {value:ethers.utils.parseEther(`${eth}`)}
        const tx = await contract.buyCoffee(name,message,amount)
        await tx.wait();
        console.log("Transection is Done")
    }
    return(
        <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
            <form onSubmit={buyChai}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" id="name" placeholder='Enter Your Name'></input>
                    <label className="form-label">Message</label>
                    <input className="form-control" type="text" id="message" placeholder='Enter Your Message'></input>
                    <label className="form-label">Amount</label>
                    <input className="form-control" id="eth" placeholder='Enter Amount' defaultValue='0.02'></input>
                    <button type="submit" className="btn btn-primary" disabled={!state.contract}>Pay</button>
                </div>
            </form>
            
        </div>
    )
}

export default Buy;