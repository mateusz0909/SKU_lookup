$(function() {
    $('#edit').change(function() {
        localStorage.setItem('country', this.value);
    });
    if(localStorage.getItem('country')){
        $('#edit').val(localStorage.getItem('country'));
    }
});