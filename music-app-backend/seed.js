const Song = require('./models/Song')
const mongoose = require('mongoose')
const connectDB = require("./config/db");
const dotenv = require('dotenv')

dotenv.config()// ky9ra envi bach yjib MONGO_URI

const songs = [
    {
        "title":"Trap Chaabi",
        "artist": "AmineBeats",
        "youtubeUrl":"https://youtu.be/8S9_RTY3c7Y?si=i2KOXL6v_YfXcGFW",
        "spotifyUrl":"https://open.spotify.com/track/2gjd1wiZJ4BiyG8z60zm5D?si=aaf25407ee044ce9",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795359/TRAP_CHAABI_ckgjnf.jpg"

    },
    {
        "title":"FLASHBACK",
        "artist": "AmineBeats",
        "youtubeUrl":"https://youtu.be/j-JYE4ByG3Q?si=tGkNCNGR93425zVr",
        "spotifyUrl":"https://open.spotify.com/album/7sWY0rmLXqLjUMkB8ZDKsf?si=zn8DFiNJQzOsnMC6pXJ_eg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795323/Flashback_k5ds0x.jpg"

    },
    {
        "title":"LUCIFER",
        "artist": "AmineBeats",
        "youtubeUrl":"https://youtu.be/tEtypHpa70Q",
        "spotifyUrl":"https://open.spotify.com/album/5pnwfSWCtKCIDddHq8KzVN?si=TkdmPLWKT7i2nXjZexFHCA",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795342/lucifer_sfl3eb.jpg"

    },
    {
        "title":"SuperHero",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=TiFPYEWFyj8",
        "spotifyUrl":"https://open.spotify.com/album/1HvBtLMIbeNTxFLWKNboEr?si=iL95RoRFTeiZdWXNwENLrw",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795343/Mc_Artisan_-_Big_A_-_Rubio_-_SuperHero_oq7bz7.jpg"

    },
    {
        "title":"Laman Khalitini",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=kI_P8pf9Qu4",
        "spotifyUrl":"https://open.spotify.com/album/5oDt1wodHz4v7Dv9flXTJc?si=aHIp7VxiQaCtwLXAb5aQXQ",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795365/Zina_Daoudia_x_Amal_Bant_-_Laman_Khalitini_xemned.jpg"

    },
    {
        "title":"Bogota",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=4o9z2UiZH_Q",
        "spotifyUrl":"https://open.spotify.com/album/5v81QGhkCy6tGDzLO4SMv3?si=kgKPnJgtRoKvpt6LK8QkNg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795306/BOGOTA_doinqu.jpg"

    },
    {
        "title":"TRI",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=HLK7N7E94DE",
        "spotifyUrl":"https://open.spotify.com/album/1ss9POsEvVBKaufFK3Bc8h?si=VH8KI4gYQjmJyKzfwhOCug",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795360/TRI_new_jtyqj4.jpg"

    },
    {
        "title":"NARC",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=qO3yYvSF1fQ",
        "spotifyUrl":"https://open.spotify.com/album/0ooON34EyX72yUCFZhP86K?si=DM-NT6tERt-6RxECYoIzfQ",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795348/MORO_-_NARC_lw8ilf.jpg"

    },
    {
        "title":"Nostalgia III",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=L-bR1yzgo7g",
        "spotifyUrl":"https://open.spotify.com/album/0c9GvzeV28CHLSgxDpceph?si=qHkIhLjgQpGbO_k10ho46w",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795351/Nostalgia_3_hb5ggz.jpg"

    },
    {
        "title":"Big Boss",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=eWa27qtZ4Bs",
        "spotifyUrl":"https://open.spotify.com/album/5AwRvNgHN76QVCYR9aaxeL?si=uy-pX81YTBaXzmwb9Qb-Yg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795303/big_boss_new_ojxtwt.jpg"

    },
    {
        "title":"Gnawa Phonk",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=Kclr8LZaSyw",
        "spotifyUrl":"https://open.spotify.com/album/25H1o3dWCS3mtaxTjuNCxc?si=BdG5GdTNSnWJaiP2lHHsAg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795328/GNAWA_PHONK_xbn5vt.jpg"

    },
    {
        "title":"Stalin",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=HirskJO9vv4",
        "spotifyUrl":"https://open.spotify.com/album/3IcOneZpOs5hFFHoEbxgAs?si=EKVlPJAqRzuuOcftmg7W3w",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795358/stal-in_vp4sk6.jpg"

    },
    {
        "title":"Doza (Tahdous Remix)",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=nRFd7gHsHrA",
        "spotifyUrl":"https://open.spotify.com/album/2d31vw7G64s6pWy3N4vgT2?si=c5iPqxW_Rm6HYe0q6x7BiQ",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795315/Doza_ie0sio.jpg"

    },
    {
        "title":"Metapsy (Ahidous Remix)",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=s87nfVlNCso",
        "spotifyUrl":"https://open.spotify.com/album/7vkwEN2jab4P8TYHpNwbTO?si=_WLSUP4NSnOxNihpH1JzBg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795346/METAPSY_ktg9zf.jpg"

    },
    {
        "title":"3raft Rap",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=biiEdCGI2KY",
        "spotifyUrl":"https://open.spotify.com/album/5KZPAsazXm6RjGQUcy78gv?si=Yr-mW9KVTbGg1ZCLFrXZDg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795287/3RAFT_RAP_bxm5bu.jpg"

    },
    {
        "title":"LHIBA",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=s7jtYcUrUeE",
        "spotifyUrl":"https://open.spotify.com/album/0aWVsAmcSOv9nLMvM0o13q?si=B2vJAr2uQQOc6IZ6AJ3tzQ",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795335/HIBA_zj1yrt.jpg"

    },
    {
        "title":"Chaabi Vibes",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=P7DwggRbbyk",
        "spotifyUrl":"https://open.spotify.com/album/1M09Bmu1WiKgqtOSqGEaIW?si=uA-WYJ12SjyKK3iAXjWKYw",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795310/chaabi_vibes_ps9brq.jpg"

    },
    {
        "title":"Dr Stone",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=HoAemkmL0P4",
        "spotifyUrl":"https://open.spotify.com/album/55xTfNSht5UBYmnR2mBvjp?si=uiowPjvYTg-E5DvvvCQ4FA",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795316/dr_stone_mex0xv.jpg"

    },
    {
        "title":"Anzar Trap",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=dc3asdVulKM",
        "spotifyUrl":"https://open.spotify.com/album/7grpcUX0p5KoyXME3w5HDQ?si=OKpPAK_eQBKbz6tgo8sF8A",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795299/anzar_trap_fn_jostwa.jpg"

    },
    {
        "title":"KASBAH",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=F_H2MPlfsgQ",
        "spotifyUrl":"https://open.spotify.com/album/0WO2Owx17uPUKl7g8PC7A6?si=rAAWgok2QWeWnEfwPsd0zg",
        "coverImage":""
    
    },
    {
        "title":"Baba Mimoun",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=gW4S7W3HDcY",
        "spotifyUrl":"https://open.spotify.com/album/3C3SYiBylrbqJg2FVtad6I?si=muAurOxzSeuRkcrnVH8oaQ",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795353/Nouveau_projet_2_oyknb9.jpg"

    },
    {
        "title":"Gnawa Game",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=hn0dVhxzM3E",
        "spotifyUrl":"https://open.spotify.com/album/75d9zW3oSy009JsQ1Bbon1?si=LdpLyldtR-6WU1_EDEI7bQ",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795327/gnawa_game_xzetxk.jpg"

    },
    {
        "title":"AKAL",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=Dnn7ibaYcQo",
        "spotifyUrl":"https://open.spotify.com/album/6NEO1oiRDpN27VsdZqy9fT?si=IAOr8DGSR0e66pbwMe1tGw",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795291/AKAL_in9swh.jpg"
    },
    {
        "title":"Azul",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=LwQ7IOWdlzw",
        "spotifyUrl":"https://open.spotify.com/album/36cDRIpn9a1fZab0BW2Rkv?si=mrcBdBDiRGa6a68kFdklKw",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795301/AZUL_yhwg6l.jpg"

    },
    {
        "title":"Habitus (Remix)",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=Bw5YxFc6e3c",
        "spotifyUrl":"https://open.spotify.com/album/2mer0wUWNoOzTu8DmaKshJ?si=bGCFUnzzSKSjMUSc_ctArg",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795333/habitus_yfnz09.jpg"

    },
    {
        "title":"MONOLOGUE (Instrumental Version)",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=3a6O0yI6vqE",
        "spotifyUrl":"https://open.spotify.com/album/5le7ibvaSe68bLhJXpi05B?si=SSPIX0oPTbW7dF3qRs4m8Q",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795347/MONOLOGUE_gdtdp0.jpg"

    },
    {
        "title":"Ha wlidi (Instrumental Version)",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=xMtbHr1Cn6c",
        "spotifyUrl":"https://open.spotify.com/album/4LdLQ4HCrysJVjW3NEgwe2?si=TbXN1-2eS8iE3257I-NJ8w",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795355/Nouveau_projet_zc7nau.jpg"

    },

    {
        "title":"Fur Cel",
        "artist": "AmineBeats",
        "youtubeUrl":"https://www.youtube.com/watch?v=yPobV3yPuHc",
        "spotifyUrl":"https://open.spotify.com/album/2XbfcJ0NaczAqgF38Oe0tr?si=GmHxN2v0RLShWrdJLdM_wA",
        "coverImage":"https://res.cloudinary.com/ddzhdrmld/image/upload/v1781795325/fur_cel_ygh1ta.jpg"
    }
]
const seedDB = async ()=> {    
    await connectDB(); // ضروري

    await Song.deleteMany();
    await Song.insertMany(songs)

    console.log("Seed done");
    mongoose.connection.close();
}
seedDB();