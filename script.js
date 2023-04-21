let _this;
var timer;

$(document).on("input", "textarea, input", function () {
    _this = $(this);

    _this[0].addEventListener("blur", changeStyleMistake);
    _this[0].addEventListener("focus", changeStyleMistake);

    // works for inputs that remove an icon on the left from input on blur event
    // f.e YouTube removes magnifier on blur thus the highlight also chanes positon

    // as long as I know, if multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded, so binding eventListener on every input event shouldn't cause problems. I guess))
    clearTimeout(timer);
    timer = setTimeout(sendRequest, 700);
});

function sendRequest() {
    $(_this).highlightWithinTextarea("destroy");
    $(_this).highlightWithinTextarea({
        highlight: ["test", "hello"],
    });
    changeStyleMistake();
}
function changeStyleMistake() {
    $(".hwt-highlights").css(
        "margin-top",
        parseInt($(_this).offset().top) -
            parseInt($(".hwt-backdrop").offset().top) +
            "px"
    );

    $(".hwt-backdrop").css("font-size", $(_this).css("font-size"));
    $(".hwt-highlights").css(
        "height",
        parseInt($(_this).height()) +
            parseInt($(_this).css("padding-top")) +
            parseInt($(_this).css("padding-bottom")) +
            parseInt($(_this).css("border-top")) +
            parseInt($(_this).css("border-bottom")) +
            "px"
    );
    $(".hwt-highlights").css("display", "flex");
    $(".hwt-highlights").css("align-items", "center");

    if ($(_this).css("margin-left") != "0px") {
        $(".hwt-highlights").css(
            "margin-left",
            parseInt($(_this).css("margin-left")) +
                parseInt($(_this).css("padding-left")) +
                parseInt($(_this).css("border-left")) +
                "px"
        );
    } else {
        $(".hwt-highlights").css(
            "margin-left",
            $(_this).offset().left -
                $(".hwt-backdrop").offset().left +
                parseInt($(_this).css("margin-left")) +
                parseInt($(_this).css("padding-left")) +
                parseInt($(_this).css("border-left")) +
                "px"
        );
    }
    $(".hwt-highlights").each(function () {
        $("mark").each(function () {
            // console.log($(this).text());
            $(this).css("background-color", "transparent !important");
            $(this).addClass("mark-border-ext");
        });
    });
}
