
function parseJson() {
    var json_file = "new_example_article.json";
    var read_file = (new File($.fileName)).parent;
    read_file = new File(read_file + "\\" + json_file);
    read_file.open('r');
    var content = read_file.read();

    content = "(" + content + ")";

    var obj;
    try {
    obj = eval(content);
    }
    catch(error)
    {
        $.writeln (error);
        }

    read_file.close();
    return obj;
}
