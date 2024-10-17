import axios from "axios";

export const FetchSports = async() => {
    const response =  await axios.get('http://localhost:4000/facilities');
    return response.data;
}

export const LoginUser = async(email, password)=>{
    const response = await axios.get('http://localhost:4000/users');
    const users = response.data;

    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (user) {
        return { success: true, data: user }; 
    } else {
        return { success: false, message: 'Invalid email or password' }; 
    }
}

export const RegisterUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:4000/users', userData);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response.data.message || 'Registration failed.' };
    }
};

export const BookingData = async (BookingData) =>{
    try{
        const response = await axios.post('http://localhost:4000/bookings',BookingData);
        return { success: true, data: response.data };
    } catch(error) {
        return { success: false, message: error.response.data.message };
    }
}

export const BookingDetails = async(userId) => {
    console.log("userId Details",userId)
    try{
        const response = await axios.get(`http://localhost:4000/bookings?userId=${userId}`);
        console.log("reponse for the booking",response);
        console.log("booking details",response.data);
        return response.data;
    }
    catch(error){
         return { success:false ,message:error };
    }
}