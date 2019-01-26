import axios from 'axios/index';
import { showMessage } from 'store/actions/fuse';

export const GET_GISTUSERDETAILS = '[GIST-USER APP] GET GISTUSERDETAILS';
export const GET_GISTUSERFORKDETAILS = '[GIST-USER APP] GET GISTUSERFORKDETAILS';

export function getGistUserDetails(user) {
    const request = axios.get('https://api.github.com/users/' + user + '/gists');

    return (dispatch) => {
        request.then((response) => {
            if(response.status === 200){
                if(response.data.length >0){
                    return dispatch({
                        type: GET_GISTUSERDETAILS,
                        payload: response.data,
                        user:user
                    })
                } else {
                    dispatch({
                        type: GET_GISTUSERDETAILS,
                        payload: response.data,
                        user:user
                    })
                    let nodataMsg = 'No Gist Data Found. Check the User Typed.'
                    return dispatch(showMessage({ message: nodataMsg }));
                }
            }
        }
        );


        request.catch((error) => {
            return dispatch(showMessage({ message: JSON.stringify(error.response.data.message) }));
        });
    }

}

export function getGistUserForks(id){
    const request = axios.get('https://api.github.com/gists/' + id + '/forks');

    return (dispatch) => {
        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type: GET_GISTUSERFORKDETAILS,
                    payload: response.data
                })
            }
        }
        );
        request.catch((error) => {
            return dispatch(showMessage({ message: JSON.stringify(error.response.data.message) }));
        });
    }
}
