import Track from "./models/Track"
import Artist from "./models/Artist"
import User from "./models/User"

// https://stackoverflow.com/questions/47904851/mongoose-push-into-array-not-working



const mockTrack = [
    {
        title: "Tomorrow",
        artist: "Benjamin Tissot",
        imgUrl: "MEDIA/tomorrow.jpg",
        trackUrl:"MEDIA/bensound-tomorrow.mp3" 
    },
    {
        title: "Once again",
        artist: "Benjamin Tissot",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/bensound-onceaagain.mp3" 
    },
    {
        title: "Always be my unicorn",
        artist: "Freedom Trail Studio",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Always_Be_My_Unicorn.mp3" 
    },
    {
        title: "Beach Disco",
        artist: "Dougie Wood",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Beach_Disco.mp3" 
    },
    {
        title: "Big ALs",
        artist: "Josh Lippi & The Overtimers",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Big_ALs.mp3" 
    },
    {
        title: "Biggie",
        artist: "ALBIS",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Biggie.mp3" 
    },
    {
        title: "Decay Tower",
        artist: "roljui",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Decay_Tower.mp3" 
    },
    {
        title: "Lovely Afternoon Breeze",
        artist: "The 126ers",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Lovely_Afternoon_Breeze.mp3" 
    },
    {
        title: "Marianas",
        artist: "Quincas Moreira",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Marianas.mp3" 
    },
    {
        title: "Reckless Shred",
        artist: "Biz Baz Studio",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Reckless_Shred.mp3" 
    },
    {
        title: "Serial Dream Rock",
        artist: "Unicorn Heads",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Serial_Dream_Rock.mp3" 
    },
    {
        title: "Wind Marching For Rain",
        artist: "Puddle of Infinity",
        imgUrl: "MEDIA/onceagain.jpg",
        trackUrl:"MEDIA/Wind_Marching_For_Rain.mp3" 
    },
]

const makeTrack = (mockTrack) => {
    for(const obj of mockTrack){
        Track.create({
            title: obj.title,
            artist: obj.artist,
            imgUrl: obj.imgUrl,
            trackUrl: obj.trackUrl 
        }).then(res => console.log(res));
        
    }
   
}

const mockArtist = [
    {
        name: "Benjamin Tissot"
    },
    {
        name: "Freedom Trail Studio"
    },
    {
        name: "Dougie Wood"
    },
    {
        name: "Josh Lippi & The Overtimers"
    },
    {
        name: "ALBIS"
    },
    {
        name: "roljui"
    },
    {
        name: "The 126ers"
    },
    {
        name: "Quincas Moreira"
    },
    {
        name: "Biz Baz Studio"
    },
    {
        name: "Unicorn Heads"
    },
    {
        name: "Puddle of Infinity"
    },
    
]

const makeArtist = async (mockArtist) => {

    for(const obj of mockArtist){

        await Artist.create({name: obj.name})
        // await를 쓰지 않으면 track을 찾기 전에 다음 코드로 넘어가기 때문에 track이 계속 null을 반환함.
        const track = await Track.findOne({artist: obj.name});
        // await 대신 promise를 사용. then이 없으면 당연히 findeOne함수의 결과는 promise pending 상태로 남아있을 수 밖에 없다.
        Artist.findOne({name: obj.name}).then(artist => {
            artist.track.push(track.id);
            artist.save();
        })
    
 
    }
       
}


const exec = async () => {
    const result = await Track.findOne({title: mockTrack[0].title})
    if(!result){
        makeTrack(mockTrack);
        makeArtist(mockArtist);
    }

}
exec()
