import { Text } from "react-native";

function DisplayPrice({price}) {
    return ( <> 
        {price.toLocaleString("vi-Vn")}
    </> );
}

export default DisplayPrice;