/*
 * http_module.js - Module which includes functions for HTTP requests.
 *                  Connected with functions in the calendar_module.js.
 */
import {getContent} from './calendar_module.js';
/*
 * getSchedule - GET schedule info from node.js server.
 *               Requires 3 parameters.
 *               : username (String) - User identifier.
 *                 year_month (String) - Year/Month identifier.
 *                 callbackFunc (Function) - Call back function.
 *                                           Response data will be passed into this function.
 */
export function getSchedule(username, year_month){
    // Make url for HTTP GET request.
    var url = 'http://143.248.140.106:3780/getschedule?';
    var user = 'user='.concat(username).concat('&');
    var yearmonth = 'year_month='.concat(year_month);
    var full_url = url.concat(user).concat(yearmonth);
    // Send GET request to node.js server.
    $.get(full_url, function(error, data){
            if (error){
                console.log(error);
            }else{
                // Pass data from server into call back function.
                getContent(data);
            }
    });
};

/*
 * postSchedule - POST schedule info from node.js server.
 *                Requires 4 parameters.
 *                : username (String) - User identifier.
 *                  year_month (String) - Year/Month identifier.
 *                  data (Json) - Data which is supposed to be posted to server.
 *                  callbackFunc (Function) - Call back function.
 *                                            Response data will be passed into this function.
 */
/*********************************************************************************************
 * Format of 'data':                                                                         *
 * {"info" :                                                                                 *
 *           [                                                                               *
 *              {"date" : date1, "content" : content1},                                      *
 *              {"date" : date2, "content" : content2},                                      *
 *              ...                                                                          *
 *           ]                                                                               *
 * }                                                                                         *
 ********************************************************************************************/
export function postSchedule(username, year_month, data){
    // Make url for HTTP POST request.
    var url = 'http://143.248.140.106:3780/postschedule?';
    var user = 'user='.concat(username).concat('&');
    var yearmonth = 'year_month='.concat(year_month);
    var full_url = url.concat(user).concat(yearmonth);
    // Send POST request to node.js server with data which is supposed to be posted.
    $.post(full_url, data, function(error){
            if (error){
                console.log(error);
            }else{
                // Call getSchedule to refresh schedule datas.
                getSchedule(username, year_month);
            }
    });
}