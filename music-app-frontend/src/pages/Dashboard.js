import { useEffect, useState } from "react";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const songCount = songs.length;
    
    const now = new Date();

    const newThisMonth = songs.filter(song => {
        const date = new Date(song.createdAt);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
    const LastAdded = songs.length > 0 
        ? [...songs].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0].title
        : "-";
        const stats = [
        { title: "Songs", value: songCount},
        { title: "New This Month", value: newThisMonth},
        { title: "Last Added", value: LastAdded}
    ];


    useEffect(()=>{
        api.get("/songs")
        .then((res)=>{
                  console.log("API RESPONSE:", res.data);

            setSongs(res.data)
            setLoading(false)
        })
        .catch(()=>{
            setError("Failed to load songs")
            setLoading(false);
        })
    },[])
    
  return (
    <div className="dashboard">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading  && !error && (
            <>
                {stats.map((item, index) => (
                    <StatsCard
                     key={index}
                    title={item.title}
                    value={item.value}
                    />
                ))}

            </>

        )}
        
     
    </div>
  );
}
