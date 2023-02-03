function loadState(){
    var store = window.localStorage
    console.log("loadState");
    $('#nerm input:radio').each(function() {
        var pref_name = $(this).data("pref");
        var which = $(this).data("which");
        var pref_val = store.getItem(pref_name);

        if (which == pref_val) {
            var input_id = $(this)[0].id
            $(this).attr("checked", "checked");
            $("i[data-pref='" + pref_name + "'][data-which='" + which + "']")
                .removeClass("fa-regular")
                .addClass("fa-solid");
        }
    })
}

function save_option(pref_name, which) {
    window.localStorage.setItem(pref_name, which)
    console.log("saved pref " + pref_name + " as " + window.localStorage.getItem(pref_name));
}

function choose_option(pref_name, which) {
    pref_which_input_id = 'input#' + pref_name + "-" + which;
    $(pref_which_input_id).checked = true;
    $("i[data-pref='" + pref_name + "']").removeClass("fa-solid").addClass("fa-regular");
    $("i[data-pref='" + pref_name + "'][data-which='" + which + "']").addClass("fa-solid");
    save_option(pref_name, which)
}


$(".pref-select label").click(function(e) {
    e.preventDefault()

    pref_name = $(this).data("pref")
    which = $(this).data("which")

    if (pref_name && which) {
        choose_option(pref_name, which)
    }
})

$(document).ready(function () {
    loadState();
    console.log("setup input change handler")
    // $('#nerm').on('change', 'input', saveState);
    $("#clear-form").click(() => {
        if (window.confirm("Clear the worksheet and your saved choices?")) {
            $("#nerm input:radio").each(() => {
                $(this)[0].checked = false;
            })
            $("#nerm label i").removeClass("fa-solid")
                              .addClass("fa-regular");
        }
    })
});