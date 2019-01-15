/*
 * calendar_module.js - Module which includes functions
 *                      deal with connection between Front-end and Back-end.
 */
import {getSchedule, postSchedule} from './http_module.js';
 /*
  * getContent - Call back function for 'getSchedule' in http_module.js.
  d*              
  */
export function getContent(data){
    // Implemented assuming that the 'data' is JSON object type.
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
 */
export function postContent(username, year_month){
    // 저장 시의 date : content 쌍을 모두 긁어와 JSON data로 만들어주는 작업.
    // 해당 JSON data를 postSchedule에게 넘겨줘야 함.

    var json = {};
    json.info = [];
    
    for (i = 1; i < 32; i++){
        var id = i.toString();
        var docu = {};
        docu['date'] = id;
        
        docu['content'] = document.getElementById(id).value;
        json.info.push(docu);
    }

    postSchedule(username, year_month, json);
}