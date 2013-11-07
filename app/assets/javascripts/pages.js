var months = ['January',
             'Febuary',
                 'March',
                 'April',
                 'May',
                 'June',
                 'July',
                 'August',
                 'September',
                 'October',
                 'November',
                'December'];
    
var current = new Date();
var current_month = current.getMonth();
var current_year = current.getFullYear();
var day = current.getDay();
var date = current.getDate();

function get_Month_Year(month, year){
    return month + " " + year.toString();
}

function get_first_date(month, year) {
    var dateObj = new Date(year, month, 1);
    return dateObj.getDay();
}

function get_last_date(month, year) {
    var dateObj = new Date(year, month + 1, 0);
    return dateObj.getDate();
}


function init_calendar(){
    $("#month_year").text(get_Month_Year(months[current_month], current_year));
    $("#t_body").empty();
    $("#t_body").append($("<tr>"));
    
    var first_date = get_first_date(current_month, current_year);
    for(var i = 0; i < first_date; i++) {
        $("#t_body tr:last").append($("<td>"));
    }
    
    var num_date = 1;
    for (var i = 1; i <= 7 - first_date; i++) {
        $("#t_body tr:last").append("<td data-day='" + i + "'>" + num_date.toString() + "</td>");    
        if (num_date == date && current_month == current.getMonth() && current_year == current.getFullYear()) {
            $("#t_body td:last").css("cssText", "background-color: #eee")
        }
        
        num_date++;
    }
    
    
    for (var i = 2; i <= 5; i++) {
        $("#t_body").append($("<tr>"));
        for (var j = 1; j <= 7; j++) {
            if (num_date > get_last_date(current_month,current_year)) {
                $("#t_body tr:last").append("<td>" + "</td>");
            } else {
                $("#t_body tr:last").append("<td data-day='" + num_date + "'>" + num_date.toString() + "</td>");
            }
            
            if (num_date == date && current_month == current.getMonth() && current_year == current.getFullYear()) {
            $("#t_body td:last").css("cssText", "background-color: #909090")
        } 
            num_date++;
        }
    }
    
    $("#t_body td").click(function(){
       var input = $("#description").val();
       var timer = $("#time option:selected").val();
       var cell = $(this).html();
       if(input.length > 0 && timer.length > 0 && cell.length > 0){
                var temp = cell + " " + input + " at " + timer;
                $(this).text(temp);
                $.post( "/appointments", { 'appointments':
                                            {"event":input,
                                            "time":timer,
                                            "day": $(this).data('day'),
                                            "month": current_month,
                                            "year": current_year }
                                        });
                $("#time option:first").prop('selected', 'disabled');
                $("#description").val("");
                
                
                //post
                
            } 
    });
    
    $.get( "/appointments", { "month": current_month,
                                            "year": current_year },
                                            function(data){
                                                $.each(data, function(key, value){
                                                    $("td[data-day='" + value.day + "']").append(" " +value.event + " at " + value.time);
                                                });
                                            }
                                            );
    //get
    
}

$(document).ready(function(){
    
    
    init_calendar();
    
    $("#prev_year").click(function(){
        current_year = current_year - 1;
        init_calendar();
    });
    
    $("#prev_month").click(function(){
        if (current_month == 0) {
            current_month = 11;
            current_year = current_year - 1;
        } else {
            current_month = current_month - 1;
        }
        init_calendar();
    });
    
    $("#next_month").click(function(){
        if (current_month == 11) {
            current_month = 0;
            current_year = current_year + 1;
        } else {
            current_month = current_month + 1;
        }
        init_calendar();
    });
    
    $("#next_year").click(function(){
        current_year = current_year + 1;
        init_calendar();
    });
    
    
});

