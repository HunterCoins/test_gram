let _this;
var timer;

$(document).on("input", "textarea, input", function () {
    _this = $(this);

    _this[0].addEventListener("blur", changeStyleMistake);
    _this[0].addEventListener("focus", changeStyleMistake);

    _this[0].addEventListener("scroll", changeTopOffsetOnScroll);

    clearTimeout(timer);
    timer = setTimeout(sendRequest, 700);
});

function changeTopOffsetOnScroll(e) {
    if (e && e.type === "scroll") {
        if (e && e.target) {
            $(e.target)
                .siblings(".hwt-backdrop")
                .children(".hwt-highlights")
                .css({
                    top: "0px",
                    height: `${
                        $(e.target).get(0).scrollHeight -
                        -parseInt($(e.target).css("padding-bottom"))
                    }px`,
                });
        }
    } else {
        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css({
                top: `-${$(_this).scrollTop()}px`,
                height: `${
                    $(_this).get(0).scrollHeight -
                    -parseInt($(_this).css("padding-bottom"))
                }px`,
            });
    }
}

function sendRequest() {
    $(_this).highlightWithinTextarea("destroy");
    $(_this).highlightWithinTextarea({
        highlight: ["test", "hello"],
    });
    changeStyleMistake();
}
function changeStyleMistake(e) {
    function getScrollBarWidth() {
        var $outer = $("<div>")
                .css({ visibility: "hidden", width: 100, overflow: "scroll" })
                .appendTo("body"),
            widthWithScroll = $("<div>")
                .css({ width: "100%" })
                .appendTo($outer)
                .outerWidth();
        $outer.remove();
        return 100 - widthWithScroll;
    }

    if ($(_this).siblings(".hwt-backdrop").width() >= $(window).width()) {
        $(_this).addClass("hwt-input-chg");
    }

    $(_this)
        .siblings(".hwt-backdrop")
        .css("font-family", $(_this).css("font-family") || "unset");

    $(_this)
        .siblings(".hwt-backdrop")
        .children(".hwt-highlights")
        .css(
            "margin-top",
            parseInt($(_this).offset().top) -
                parseInt($(_this).siblings(".hwt-backdrop").offset()?.top) +
                parseInt($(_this).css("padding-top")) +
                parseInt($(_this).css("border-top")) +
                "px"
        );

    $(_this)
        .siblings(".hwt-backdrop")
        .css("font-size", $(_this).css("font-size"));
    $(_this)
        .siblings(".hwt-backdrop")
        .children(".hwt-highlights")
        .css("height", parseInt($(_this).height()) + "px");

    if (
        $(_this).parent().css("display") === "flex" &&
        $(_this).css("height") > $(_this).css("line-height")
    ) {
        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css({ display: "flex", "align-items": "center" });
    }

    //if scrollbar apears - set margin-right taking into account scrollbar's width
    if ($(_this).get(0).scrollHeight > $(_this).get(0).clientHeight) {
        $(_this)
            .siblings(".hwt-backdrop")
            .css({ position: "relative", overflow: "hidden" });

        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css("position", "absolute");

        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css(
                "margin-right",
                parseInt($(_this).css("padding-right")) +
                    getScrollBarWidth() +
                    "px"
            );

        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css({
                height: `${
                    $(_this).get(0).scrollHeight -
                    parseInt($(_this).css("padding-top")) -
                    parseInt($(_this).css("padding-bottom"))
                }px`,
            });

        changeTopOffsetOnScroll(e);
    } else {
        //check if not zero
        if (parseInt($(_this).css("padding-right"))) {
            $(_this)
                .siblings(".hwt-backdrop")
                .children(".hwt-highlights")
                .css(
                    "margin-right",
                    parseInt($(_this).css("padding-right")) +
                        parseInt($(_this).css("margin-right")) +
                        "px"
                );
        }
    }

    $(_this)
        .siblings(".hwt-backdrop")
        .css("line-height", $(_this).css("line-height"));

    if ($(_this).css("margin-left") != "0px") {
        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css(
                "margin-left",
                parseInt($(_this).css("margin-left")) +
                    parseInt($(_this).css("padding-left")) +
                    parseInt($(_this).css("border-left")) +
                    "px"
            );
    } else {
        $(_this)
            .siblings(".hwt-backdrop")
            .children(".hwt-highlights")
            .css(
                "margin-left",
                $(_this).offset().left -
                    $(_this).siblings(".hwt-backdrop").offset()?.left +
                    parseInt($(_this).css("margin-left")) +
                    parseInt($(_this).css("padding-left")) +
                    parseInt($(_this).css("border-left")) +
                    "px"
            );
    }
    $(".hwt-highlights").each(function () {
        $("mark").each(function () {
            $(this).css("background-color", "transparent !important");
            $(this).addClass("mark-border-ext");
        });
    });
}
