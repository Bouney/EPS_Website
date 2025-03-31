async function getData() {
  const url = "/orca-news/data?api=msg";
      const RESPONSE = await fetch(url);
    return await RESPONSE.json();
}

getData().then((data) => {
  for (const MESSAGE of data) {
    let messageArticle = document.createElement('article');
    messageArticle.setAttribute('id', `msg-${MESSAGE['sid']}`);
    messageArticle.setAttribute('class', 'message');

    if (MESSAGE['atts'].length && !MESSAGE['atts'][0]['url'].endsWith('.pdf')) {
      const messageAttachment = document.createElement('img');
      messageAttachment.setAttribute('src', MESSAGE['atts'][0]['url']);
      messageAttachment.setAttribute('loading', 'lazy');
      messageAttachment.setAttribute('alt', '');
      messageArticle.appendChild(messageAttachment);
    }

    const messageDate = document.createElement('div');
    messageDate.setAttribute('class', 'date');
    messageDate.textContent = MESSAGE['date'];
    messageArticle.appendChild(messageDate);

    const messageText = document.createElement('span');
    messageText.setAttribute('class', 'msg-text');
    // XSS
    let messageInnerHTML = MESSAGE['text']
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#x27;')
        .replaceAll('/', '&#x2F;');
    messageText.innerHTML = messageInnerHTML.replace(/\r\n|\r|\n/g, '<br>') + ' ';
    messageArticle.appendChild(messageText);

    if (MESSAGE['url']) {
      const topLevelLink = document.createElement('a');
      topLevelLink.setAttribute('href', MESSAGE['url']);
      topLevelLink.setAttribute('title', MESSAGE['text']);
      topLevelLink.setAttribute('onclick', `window.open('${MESSAGE['url']}', 'newwindow', 'width=550,height=600'); return false;`);
      topLevelLink.setAttribute('onmouseover', "this.title='';");

      const moreLink = document.createElement('span');
      moreLink.setAttribute('class', 'msg-more');
      moreLink.setAttribute('aria-hidden', 'true');
      moreLink.textContent = '[more]'
      messageArticle.appendChild(moreLink)

      const ENDING_HR = document.createElement('hr');
      ENDING_HR.setAttribute('class', 'msg-divider');
      messageArticle.appendChild(ENDING_HR);

      topLevelLink.appendChild(messageArticle);
      document.querySelector("main").append(topLevelLink);
    } else {
      const ENDING_HR = document.createElement('hr');
      ENDING_HR.setAttribute('class', 'msg-divider');
      messageArticle.appendChild(ENDING_HR);
      document.querySelector("main").append(messageArticle);
    }
  }
  document.getElementById('loading-message').remove();
  document.getElementById('body').setAttribute(
    'style', 'cursor: auto !important;');
});