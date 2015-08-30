var test1 = "abcdef";
var test2 = 123;
var test3 = true;
var test4 = {};
var test5 = [];
var test6;
var test7 = {"abcdef": 123};
var test8 = ["abcdef", 123];
function test9() {return "abcdef"};

document.write("var test1 = \"abcdef\"; - ");
document.write(typeof test1 + "<br>");

document.write("var test2 = 123; - ");
document.write(typeof test2 + "<br>");

document.write("var test3 = true; - ");
document.write(typeof test3 + "<br>" );

document.write("var test4 = {}; - ");
document.write(typeof test4 + "<br>" );

document.write("var test5 = []; - ");
document.write(typeof test5 + "<br>");

document.write("var test6; - ");
document.write(typeof test6 + "<br>");

document.write("var test7 = {\"abcdef\": 123}; - ");
document.write(typeof test7 + "<br>");

document.write("var test8 = [\"abcdef\", 123]; - ");
document.write(typeof test8 +"<br>");

document.write("function test9() {return \"abcdef\"}; - ");
document.write(typeof test9 + "<br>");