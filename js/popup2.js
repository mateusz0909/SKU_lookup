//load an extension
document.addEventListener('DOMContentLoaded', function () {
    // add selector to button
    const Btn = document.querySelector('.button');
    //add selector to form input
    const form = document.getElementById("form");
    //main function handling button click


    function result() {
        let input1 = document.getElementById('input').value;
        var e = document.getElementById("edit");
        var language = e.options[e.selectedIndex].value;
        const safeSearch = document.getElementById("safe").checked;
        let identifier = '';
        var input = '';
        var safeUrl = '';
        var regx = /([^" "]+)/ //regural expression searching for the first x number of digits until space
        

        //input validator
        if (input1 == false || input1.includes(";") || input1.includes(",") || input1.includes("&")) {
            warn()
            return
        }

        //assigns the first number from input 
    

        //input validator function
        function warn() {
            document.getElementById('alert').style.display = 'block'
            document.getElementById('input').classList.add('red-border');
            document.getElementById('alert').classList.add('bounceIn');
            setTimeout(() => {
                document.getElementById('alert').style.display = 'none'
                document.getElementById('input').classList.remove('red-border');
            }, 3000)
            return
        }

        //check if the input is EAN (productcode) or fpc (manufacturer code)
        // if (result.length == 14 || result.length == 13) {
        //     identifier = 'productcode'
        // } else
        //     identifier = 'manufacturercode'

        //get current date if the safe search is checked
        if (safeSearch) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            var safeUrl = `&startOfSaleAfter=2000-07-22&startOfSaleBefore=${today}`
        }
        const arr = input1.split(' ');

        if (identifier == "productcode") {
            let index;
            for (index = 0; index < arr.length; ++index) {
                if (arr[index].startsWith('0') === false) {
                    arr[index] = "0" + arr[index]
                }

            }
            input = arr.join(';')

        } else {
            input = arr.join(';')
        }

        // console.log(input)
        let url = `https://pg.browser.synthrone.io/search?type=pdpd&contains=${input1}&language=${language}${safeUrl}`
        // open URL in new card if fields are filled properly 
        if (input1.length !== 0 && language !== 'empty') {

            Btn.classList.add('running')
            setTimeout(() => {
                window.open(url, '_blank')
                Btn.classList.remove('running')
            }, 1000);
        } else {
            document.getElementById('edit').classList.add('red-border');
            setTimeout(() => {
                document.getElementById('edit').classList.remove('red-border');
            }, 3000)
        }

    };

    Btn.addEventListener('click', result)
    form.onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key == 13) {
            e.preventDefault();
            result();

        }

    }
})