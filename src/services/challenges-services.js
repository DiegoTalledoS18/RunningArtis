import axios from "axios";

const http = axios.create({
    baseURL:"http://localhost:8080/",
    headers: { "Content-type": "application/json" },
})

export class ChallengesServices{
    getChallenges=()=>{
       return http.get("challenges")
    }
    postChallenge=(title,businessId,urlToImage,challengeType)=> {
        return http.post("challenges",
            {
                "title": title,
                "businessId": businessId,
                "urlToImage": urlToImage,
                "challengeType": challengeType,

            })
    }
    updateChallenge=(challengeId,title,businessId,urlToImage,challengeType)=>{
        return http.put("challenges/"+challengeId,{
                "title": title,
                "businessId": businessId,
                "urlToImage": urlToImage,
                "challengeType": challengeType,
            })
    }
    deleteChallenge=(challengeId)=>{
        return http.delete("challenges/" + challengeId);
    }
}