import { useEffect, useState } from "react";
import Button from "./Button";
import NotFoundPage from "./NotFoundPage";
const arr = [1, 2, 3]

const Home = () =>{
    const [isError, setError] = useState(false)
    const [matchDay, setMatchDay] = useState([])
    const [value, setValue] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () =>{
        const response = await fetch("https://football98.p.rapidapi.com/premierleague/fixtures", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "football98.p.rapidapi.com",
                "x-rapidapi-key": "1c61963340msh06512a632c9e547p11af8fjsn8344fe2e744b"
            }
        })
        if (!response.ok){
            setIsLoading(false)
            setError(true)
        }
        const jsonData = await response.json()
        const getMatchDay = jsonData[0]
        const getObjKey = Object.keys(getMatchDay)
        setMatchDay(getMatchDay[getObjKey[value]])
        setIsLoading(false)
        setError(false)
    }
    useEffect(() =>{
        fetchData()
    }, [])
    console.log(matchDay);

    if (isLoading){
        return (
            <div class="flex items-center justify-center mt-20 text-xl">
                <button type="button" class="text-blue-500 flex justify-center text-center" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Processing...
                </button>
            </div>
        )
    }
    if (isError){
        return <NotFoundPage/>
    }
    return (
        <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center mt-20">
            <div class="flex-none w-20">
            </div>
        <div className="grid lg:grid-cols-3 py-5 px-5 w-full gap-5 sm:grid-cols md:grid-cols-2">
            {
                matchDay.map((match =>{
                const {MatchDay, awayLogo, awayTeam, homeLogo, homeTeam} = match
                console.log(MatchDay);
                return(
                        <div>
                            <div className="flex bg-gradient-to-tr from-purple-400 to-blue-500 flex-col w-full rounded-lg shadow-lg overflow-hidden">
                            <p className="py-4 px-4 font-bold text-white text-center border-b-2 border-gray-600">{MatchDay}</p>
                            <div className="py-4 px-4 flex justify-between items-center border bg-white flex-row my-2 mx-2 rounded-lg">
                                <div className="font-bold text-gray-600 text-sm">{homeTeam}</div>
                                <div className="font-bold">VS</div>
                                <div className="font-bold text-gray-600 text-sm">{awayTeam}</div>
                            </div>
                            <div className="flex justify-between py-4 px-10">
                                <img className="w-20 h-20 rounded-lg shadow-lg" src={homeLogo} alt="homelogo"/>
                                <img className="w-20 h-20 rounded-lg shadow-lg" src={awayLogo} alt="homelogo"/>
                            </div>
                        </div>
                    </div>
                    )}))}
                    </div>
                    <div class="flex-none w-20 ">
                    </div>
                </div>
                {/* //Add button component later */}
                </div>     
    )
}

export default Home
