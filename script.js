$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();

    function showErrorIcon(element, message) {
        var icon = $(element).next('.error-icon');
        icon.attr('title', message);
        icon.show();
    }

    function hideErrorIcon(element) {
        var icon = $(element).next('.error-icon');
        icon.hide();
    }

    function calculateTax(income, extraIncome, deductions, age) {
        var totalIncome = income + extraIncome - deductions;
        var tax = 0;

        if (totalIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (totalIncome - 800000);
            } else if (age === '≥40 & <60') {
                tax = 0.4 * (totalIncome - 800000);
            } else if (age === '≥60') {
                tax = 0.1 * (totalIncome - 800000);
            }
        }

        return tax;
    }

    $('#taxForm').submit(function(event) {
        event.preventDefault();

        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val());
        var deductions = parseFloat($('#deductions').val());
        var age = $('#age').val();

        var isValid = true;
        if (isNaN(income)) {
            showErrorIcon('#income', 'Invalid input');
            isValid = false;
        } else {
            hideErrorIcon('#income');
        }
        if (isNaN(extraIncome)) {
            showErrorIcon('#extraIncome', 'Invalid input');
            isValid = false;
        } else {
            hideErrorIcon('#extraIncome');
        }
        if (isNaN(deductions)) {
            showErrorIcon('#deductions', 'Invalid input');
            isValid = false;
        } else {
            hideErrorIcon('#deductions');
        }
        if (age === '') {
            showErrorIcon('#age', 'Please select an option');
            isValid = false;
        } else {
            hideErrorIcon('#age');
        }

        if (isValid) {
            // Calculate tax
            var tax = calculateTax(income, extraIncome, deductions, age);
           
            $('#resultBody').html(tax.toFixed(2)+
                                 '<p>After tax deductions</p>');
            $('#resultModal').modal('show');
        }
    });

    $('#resultModal .btn-primary').click(function() {
        location.reload(); 
    });

    
});
