
// global

const HOME = "/";
const MAIN = "/main";
const SEARCH = "/search"
const MYPAGE = "/mypage";
const SIGNOUT = "/sign-out";
// const USERS = "/users";

// myPage

const EDIT_PROFILE = "/edit-profile";
const LIKE = "/likes";
const FOLLOWING = "/following";

// artists and songs
const ARTIST = "/:name";

const SONG_API = "/api/:id/song"

// user authentication

const routes = {
    home: HOME,
    main: MAIN,
    search: SEARCH,
    signOut: SIGNOUT,
    // users: USERS,
    myPage: MYPAGE,
    editProfile: EDIT_PROFILE,
    like: LIKE,
    following: FOLLOWING,
    artist: ARTIST,
    songApi: id => {
        if(id) {
            return `/api/${id}/song`
        } else {
            return SONG_API
        }
    }

};

export default routes;