import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post'; 
const root_Url = "http://reduxblog.herokuapp.com/api";
const api_key = "?key=tliew2"

/**
 * Action to fetch initial Posts
 */
export function fetchPosts() {
    //getrequest
    const request = axios.get(`${root_Url}/posts${api_key}`);
    console.log("Fetch Posts")
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

/**
 * Action to create a new post based on user input
 */
export function createPost(values) {
    //postrequest
    //first object is the url, second object is the data that we want to send
    axios.post(`${root_Url}/posts${api_key}`, values);

    return {
        type: CREATE_POST,
        payload: request
    }; 
}
    
