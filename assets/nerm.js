function loadState(){
    var store = window.localStorage
    console.log("loadState");
    $('#nerm input:radio').each(function() {
        var pref_name = this.name;
        var option_value = $(this).val();
        var pref_val = store.getItem(pref_name);

        if (pref_val == option_value) {
            var input_id = $(this)[0].id
            console.log("setting " + input_id + ".checked => true")
            $(this)[0].checked = true;

            console.log("setting label[for=" + input_id + "] i classes...")
            $("label[for=" + input_id + "] i")
                .removeClass("fa-regular")
                .addClass("fa-solid");
        }
    })
}

$(".pref-select label").click(function(e) {
    e.preventDefault()

    selected_input_id = $(this).attr("for")
    console.log("selected_input_id: " + selected_input_id)

    selected_radio = $("#" + selected_input_id)
    if (!selected_radio) {
        return false;
    }

    pref_name = selected_radio[0].name
    pref_val = $(selected_radio).val();
    $(selected_radio).checked = true;

    console.log("pref_val: " + pref_val)
    if (pref_val != null) {
        window.localStorage.setItem(pref_name, pref_val)
        console.log("saved pref " + pref_name + " as " + window.localStorage.getItem(pref_name));
    }

    icon_set_selector = "#" + pref_name + " label i"
    icon_selector = "label[for=" + selected_input_id + "] i"

    $(icon_set_selector).removeClass("fa-solid").addClass("fa-regular");
    $(icon_selector).addClass("fa-solid");
})

$(document).ready(function () {
    loadState();
    console.log("setup input change handler")
    // $('#nerm').on('change', 'input', saveState);
});