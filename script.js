/**
 * Tooltip Wrapper elementini döretmek
 */
const tooltipWrapper = document.createElement('div')
tooltipWrapper.classList.add('tooltip-wrapper')
tooltipWrapper.innerHTML = `<div class="tooltip-content"></div>`

/**
 * Gurallar maslahaty bolan ähli elementleri saýlamak
 */
const tooltipEls = document.querySelectorAll('[data-tooltip]')

/**
 * Elementiň gurallaryny görkez
 * @param {dom} el - selected comment 
 * @param {dom} toolTipEl -klonlanan ToolTip Element
 */
const showToolTip = (el, toolTipEl) => {
    // Element gurallary elementini almak
    var _content = el.dataset.tooltip || "";
    // Element Tooltip elementiniň ýerini almak
    var _pos = el.dataset.tooltipPosition || "right";
    // ViewPort inini almak
    var _vpWidth = window.outerWidth
    // ViewPort beýikligini almak
    var _vpHeight = window.outerHeight
    // Gurallar mazmunyny düzmek
    toolTipEl.querySelector('.tooltip-content').innerText = _content
    // Tooltip Position Attribute-i düzmek
    toolTipEl.dataset.position = _pos

    // Elementiň çäkli gönüburçlugyny almak
    var rect = el.getBoundingClientRect()

    // Gurallar maslahatyny wagtlaýyn gizläň
    toolTipEl.style.visibility = `hidden`
    // Tooltip elementini resminamanyň organyna goşuň
    document.body.appendChild(toolTipEl)
    // Tooltip beýikligi
    var tipHeight = toolTipEl.clientHeight
    // Tooltip ini
    var tipWidth = toolTipEl.clientWidth

    if (_pos == 'right') {
        // Elementiň sag tarapynda Tooltip pozisiýasyny düzmek
        toolTipEl.style.left = `calc(${rect.right}px + 1.3rem)`
        toolTipEl.style.top = `${(rect.top + (rect.height / 2)) - (tipHeight / 2)}px`
    }
    if (_pos == 'left') {
        // Elementiň çep tarapynda Tooltip pozisiýasyny düzmek
        toolTipEl.style.left = `calc(${rect.left - tipWidth}px - 1.3rem)`
        toolTipEl.style.top = `${(rect.top + (rect.height / 2)) - (tipHeight / 2)}px`
    }
    if (_pos == 'top') {
        // Elementiň ýokarky tarapynda Tooltip pozisiýasyny düzmek
        toolTipEl.style.left = `${(rect.left + (rect.width / 2)) - (tipWidth / 2)}px`
        toolTipEl.style.top = `calc(${rect.top - tipHeight}px - 1.3rem)`
    }
    if (_pos == 'bottom') {
        // Elementiň aşaky tarapynda Tooltip pozisiýasyny düzmek
        toolTipEl.style.left = `${(rect.left + (rect.width / 2)) - (tipWidth / 2)}px`
        toolTipEl.style.top = `calc(${rect.bottom}px + 1.3rem)`
    }
    //Tooltip elementiniň çäkli gönüburçlugyny almak
    var ttRect = toolTipEl.getBoundingClientRect()

    /**
     * Gurallar maslahatyna jogap bermek
     */
    if ((ttRect.left + ttRect.width) > _vpWidth || ttRect.left < 0 || (((ttRect.top + ttRect.height) > _vpHeight || ttRect.top < 0) && (_pos == "top" || _pos == "bottom"))) {
        if ((rect.top - ttRect.height) > 0) {
            // Tooltip-i elementiň ýokarsyna ýerleşdirmek, sebäbi sahypa görnüşinden çykýar
            toolTipEl.dataset.position = `top`
            toolTipEl.style.left = `${(rect.left + (rect.width / 2)) - (tipWidth / 2)}px`
            toolTipEl.style.top = `calc(${rect.top - tipHeight}px - 1.3rem)`
        } else {
            // Tooltip-i elementiň aşagyna ýerleşdirmek, sahypanyň görnüşinden aşmagy sebäpli
            toolTipEl.dataset.position = `bottom`
            toolTipEl.style.left = `${(rect.left + (rect.width / 2)) - (tipWidth / 2)}px`
            toolTipEl.style.top = `calc(${rect.bottom}px + 1.3rem)`
        }
    }
    toolTipEl.style.visibility = `visible`

}

/**
 * Gurallar maslahatyny ýapmak
 * @param {dom} toolTipEl - gurallar elementi
 */
const closeToolTip = (toolTipEl) => {
    toolTipEl.remove()
}
tooltipEls.forEach(el => {
    el.addEventListener('mouseenter', e => {
        // Elementiň haçan aýlanýandygyny görkezmek üçin gural gurallary elementi
        var toolTipEl = tooltipWrapper.cloneNode(true)
        showToolTip(el, toolTipEl)
        el.addEventListener('mouseout', e => {
            closeToolTip(toolTipEl)
        })
        // Müşderi 'Esc' (Escape) düwmesini bassa, tootlipi ýapmak
        document.body.addEventListener('keyup', e => {
            if (e.key == 'Escape' || e.code == 'Escape' || e.keyCode == 27 || e.which == 27)
                closeToolTip(toolTipEl)
        })
        // Sahypa aýlanan bolsa, tootlipi ýapmak
        window.addEventListener('scroll', function (e) {
            closeToolTip(toolTipEl)
        }, true);
        //Sahypanyň ölçegi üýtgedilen bolsa, düwmäni ýapmak
        window.addEventListener('resize', function (e) {
            closeToolTip(toolTipEl)
        }, true);
    })
})
