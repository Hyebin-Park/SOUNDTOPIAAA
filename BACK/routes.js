
// global

const HOME = "/";
const MAIN = "/main";
const SEARCH = "/search"
const MYPAGE = "/mypage";
const SIGNIN = "/sign-in";
const SIGNUP = "/sign-up";
const SIGNOUT = "/sign-out";
// const USERS = "/users";

// myPage

const EDIT_PROFILE = "/edit-profile";
const LIKE = "/likes";
const FOLLOWING = "/following";

// artists and songs
const ARTIST = "/:name";

const SONG_API = "/api/:id/song"
const SEARCH_SONG_API = "/api/:id/search"
const SEARCHBAR_API = "/api/search"

// user authentication

const routes = {
    home: HOME,
    main: MAIN,
    search: SEARCH,
    signIn: SIGNIN,
    signUp: SIGNUP,
    signOut: SIGNOUT,
    // users: USERS,
    myPage: MYPAGE,
    editProfile: EDIT_PROFILE,
    like: LIKE,
    following: FOLLOWING,
    artist: name => {
        if(name) {
            return `${name}`
        } else {
            return ARTIST
        }
    },
    songApi: id => {
        if(id) {
            return `/api/${id}/song`
        } else {
            return SONG_API
        }
    },
    searchSongApi : id => {
        if(id){
            return `/api/${id}/search`
        } else {
            return SEARCH_SONG_API
        }
    },
    // searchBarApi : term => {
    //     if(term){
    //         return `/api/${term}/search`
    //     } else {
    //         return SEARCHBAR_API
    //     }
    // }
    searchBarApi : SEARCHBAR_API
};

export default routes;