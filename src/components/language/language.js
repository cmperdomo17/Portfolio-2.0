document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.getElementById('language-selector');
    const languageText = document.getElementById('language-text');
    let isEnglish = true;

    languageSelector.addEventListener('click', function () {
        if (isEnglish) {
            languageText.textContent = 'Español';
            isEnglish = false;
        } else {
            languageText.textContent = 'English';
            isEnglish = true;
        }
    });
});