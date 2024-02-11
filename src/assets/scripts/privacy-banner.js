document.addEventListener('DOMContentLoaded', function () {
    // check if the user has accepted the privacy policy from the cookie
    if (document.cookie.indexOf('privacy-policy-accepted=true') === -1) {
        // create the banner element from raw HTML
        var banner = document.createElement('div');
        banner.classList.add('privacy-banner');
        banner.innerHTML = `
        <div class="privacy-banner__content z-index:1000 fixed bottom:0 translateX(calc(50vw-50%)) translateX(0)@sm bottom:10@2xs bottom:20@md left:10@sm left:20@md max-w:400 p:20 r:8 f:14 lh:normal bg:white box-shadow:0|0|1px|rgba(0,0,0,.5)">
            <p class="fg:gray-90">
                To enhance your website experience, we employ <a class="fg:blue-60 text:underline" href="https://rosua.org/privacy-policy" target="_blank">cookies and third-party tracking technologies</a>. By browsing this website, you consent to our use of these technologies.
            </p>
            <button type="button" class="mt:10 r:8 px:6 py:4 float:right fg:blue-60 bg:white bg:gray-5:hover b:1|solid|blue-60 box-shadow:0|0|1|blue-60/.5 cursor:pointer">Close</button>
        </div>`;

        // when the user clicks the accept button, set the cookie expiry date to 30 days from now
        banner.querySelector('button').addEventListener('click', function () {
            var date = new Date();
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
            document.cookie = 'privacy-policy-accepted=true; expires=' + date.toUTCString() + '; path=/';
            banner.remove();
        });

        // add the banner to the page
        document.body.appendChild(banner);
    }
});