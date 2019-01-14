/*
 * calendar_module.js - Module which includes functions
 *                      deal with connection between Front-end and Back-end.
 */
import {getSchedule, postSchedule} from './http_module.js';
 /*
  * getContent - Call back function for 'getSchedule' in http_module.js.
  *              
  */
 export function getContent(data){
     // Implemented assuming that the 'data' is JSON object type.
     var info  = JSON.parse(data).info;
     // info.date와 info.content를 html로 매칭해줘야 할 듯!
 }

 /*
  * postContent - Construct data which will be posted to node.js server.
  *               Call 'postSchedule' in http_module.js as a call back function.
  *               Called if 'save' button is clicked.
  */
 export function postContent(username, year_month){
     // 저장 시의 date : content 쌍을 모두 긁어와 JSON data로 만들어주는 작업.
     // 해당 JSON data를 postSchedule에게 넘겨줘야 함.

     var data = '';// JSON data.

     postSchedule(username, year_month, data);
 }