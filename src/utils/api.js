import API_BASE_URL from "./config";
import axios from 'axios';

export const getNFTData = async () => {
    const response = await axios.get(`${API_BASE_URL}/market/getNFTData`, {
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        }
    })
    // console.log(response.data);
    // const response = await fetch(`${API_BASE_URL}/market/getNFTData`, {
    //     method: 'GET',
    //     headers: {
    //         "Access-Control-Allow-Credentials": true,
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    //         "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    //     }
    // });
    
    const data = await response.json();
    return data;
};

export const getFloorPrice = async (collectionID, date) => {
    const response = await fetch(`${API_BASE_URL}/market/getFVByDate/${collectionID}/${date}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getWalletNFTData = async () => {
    const response = await fetch(`${API_BASE_URL}/market/getWalletNFTData`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getWhalesBuyIndex = async () => {
    const response = await fetch(`${API_BASE_URL}/market/getWhalesBuyIndex`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getPastUserbase = async () => {
    const response = await fetch(`${API_BASE_URL}/market/getPastUserbase`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getRoyalty = async (collectionID) => {
    const response = await fetch(`${API_BASE_URL}/market/getRoyaltyByDaily/${collectionID}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getSpread = async (collectionID, date) => {
    const response = await fetch(`${API_BASE_URL}/market/getSpread/${collectionID}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getPriceImpact = async (collectionID, date) => {
    const response = await fetch(`${API_BASE_URL}/market/getPriceImpact/${collectionID}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};

export const getOrderBook = async (collectionID, date) => {
    const response = await fetch(`${API_BASE_URL}/market/getOrderBook/${collectionID}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};
