/*
 * calendar_module.js - Module which includes functions
 *                      deal with connection between Front-end and Back-end.
 *                      Connected with functions in http_module.js.
 */

import {postSchedule} from './http_module.js';

 /*
  * getContent - Call back function for 'getSchedule' in http_module.js.
  *              Parse JSON data recieved from server and pass it to html.
  *              Requires 1 parameter.
  *              : data (JSON object) - Data from node.js server.
  */
export function getContent(data){
    var info  = data.info;
    for (i = 1; i < 32; i++){
        var id = i.toString();
        var content = info[i - 1].content;
        document.getElementById(id).value = content;
    }
}

/*
 * postContent - Construct data which will be posted to node.js server.
 *               Call 'postSchedule' in http_module.js as a call back function.
 *               Called if 'save' button is clicked.
 *               Requires 2 parameters.
 *               : username (String) - User identifier.
 *                 year_month (String) - Year/Month identifier.
 */
export function postContent(username, year_month){
    var json = {};
    json.info = [];
    
    for (i = 1; i < 32; i++){
        var id = i.toString();
        var docu = {};
        docu['date'] = id;
        docu['content'] = document.getElementById(id).value;
        json.info.push(docu);
    }
    // Call postSchedule as a call back function.
    postSchedule(username, year_month, json);
}