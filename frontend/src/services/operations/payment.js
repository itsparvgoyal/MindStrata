import { toast } from "react-hot-toast";
import api from "../service";
import { resetCart } from "../../redux/slices/cartSlice";
import { updateUser } from "../../redux/slices/authSlice";


// to load razorpay sdk 
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src


        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export const buyCourse = async ({courseIDs , userDetails , navigate , dispatch}) => {

    try {
        // load script 
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        // console.log("1")
        // agar error aa gya load hone me toh 
        if(!res) {
            toast.error("Unable to load Payment gateway . Try again later . ");
            return;
        }
        // initiate the order 
        const orderRes = await api.post('/payment/capturePayment' , courseIDs)

        // console.log("2")
        if(!orderRes.data.success) {
            toast.error(orderRes.data.message);
            return;
        }
        // console.log("3")
        // console.log("Razorpay Key =", razorpayKey);

        //options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            currency: orderRes.data.order.currency,
            amount: `${orderRes.data.order.amount}`,
            order_id:orderRes.data.order.id,
            name:"MindStrata",
            description: "Thank You for Purchasing the Course",
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            theme: {
                color: "#6366f1",
                backdrop_color: "#09090b"
            },
            handler: function(response) {
                //verifyPayment
                verifyPayment({...response, courseIDs}, navigate, dispatch);
            }
        }
        // console.log("4")

        // window create kro 
        const payementObject = new window.Razorpay(options);
        // console.log("5")
        payementObject.open();

        // handler
        payementObject.on('payment.failed', function(response) {
            toast.error("Payment failed . Try again later .");
            console.log("error",response.error);
        })
        
        // console.log("6")
    } catch (error) {
        console.log("error in buying course", error);
        toast.error("Could not buy course . Try again later . ");
    }

}


export const verifyPayment = async (bodyData , navigate , dispatch) => {

    try {
        const response = await api.post('/payment/verifyPayment', bodyData , {
            headers : {
                "content-type": "application/json"
            }
        } )

        if(!response.data.success) {
            toast.error(response.data.message);
            return;
        }

        toast.success("Payment verified successfully");
        navigate("/dashboard/enrolledCourses");
        dispatch(resetCart());
        // console.log("updating user in local storage")
        // console.log(response?.data?.updatedUser);
        dispatch(updateUser(response?.data?.updatedUser));

        return;
    } catch (error) {
        console.log("error in verifying payement", error);
        toast.error("Could not verify payment . Try again later . ");
        return error;
    }
}

