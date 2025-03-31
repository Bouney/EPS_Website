if (new URL(window.location)['pathname'] === '/edit-requests' && new URLSearchParams(document.location.search).get('url')) {
    if (new URLSearchParams(document.location.search).get('url').includes('/clubs')) {
        document.getElementById('edit-info-clubs').setAttribute('style', 'display: block;');
    }
    const URL_TO_EDIT = new URLSearchParams(document.location.search).get('url')
    const FORM_LOGIN_LINK = document.getElementById('form-login-link');
    const FORM_NO_LOGIN_LINK = document.getElementById('form-no-login-link');
    for (let form_link of [FORM_LOGIN_LINK, FORM_NO_LOGIN_LINK]) {
        form_link.setAttribute(
            'href', form_link.getAttribute('href') + '=' + encodeURIComponent(URL_TO_EDIT));
    }
} else {
    document.getElementById('edit-request-link').setAttribute(
        'href', '/edit-requests?url=' + encodeURIComponent(window.location));
}