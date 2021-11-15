const csrftokenElem = document.querySelector('[name=csrfmiddlewaretoken]');
const csrftoken = (csrftokenElem !== null) ? csrftokenElem.value : null;

export const isAuthenticated = () => {
    return csrftoken !== null;
};

export const tokenConfig = () => {
    return {
        credentials: 'include',
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
    };
};

const useridElem = document.querySelector('[name=userid]');
export const USER_ID = (useridElem !== null) ? useridElem.value : null;


const usernameElem = document.querySelector('[name=username]');
export const USERNAME = (usernameElem !== null) ? usernameElem.value : null;
