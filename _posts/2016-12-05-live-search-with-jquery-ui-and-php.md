---
layout: post
title:  "Live Search With jQuery UI and PHP"
date:   2016-12-05
---

I am using jQuery UI Autocomplete to do a live search input widget. The one I'm looking for to build with have clickable items, and show complex content with each item. Luckily, jQuery UI Autocomplete can achieve all this.

Basic setup is simple enough:
```javascript
    $('#myInput').autocomplete({
        source: 'search_function.php',
        'min-width': 1
    })
```
PHP file would return a JSON array containing search results returned from database.

However, if we want to return a complex object and do custom rendering, we need change `source` to a function:
```javascript
source:
    function (request, response) {
        $.getJSON("/search_function.php?term=" + request.term, function (data) {
            if(data.length > 1){
                response($.map(data, function (item) {
                    return {
                        label: item.title,
                        value: item.access,
                        artist: item.artist,
                        url: item.href
                    };
                }));
            } else {
                response([{
                    label: "Sorry, there are no results matched your seach.",
                    value: " ",
                }]);
            }
        });
    }
```

jQuery UI Autocomplete required list items have two properties: `label` and `value`. We can have more properties to be used in our custom render function, in that we use `create` event and `_renderItem` object:
```javascript
create: function () {
    $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div>" + item.label + "<br><small>" + item.value + "<span class='."'float-xs-right'".'>" + item.artist + "</span></small></div>")
            .appendTo(ul);
    };
}
```

To make each list item a link, we need `select` event:
```javascript
select: function( event, ui ) {
    if(ui.item.url !== undefined){
        var href = ui.item.artist;
        window.location = ui.item.url;
    }         
}
```

A possible pitfall is that in touch device, user need to tap twice to get link working. For this, we disable hover callbacks:
```javascript
open: function(event, ui) {
        if($(window).innerWidth <= 768) {
            $(".ui-autocomplete").off("menufocus hover mouseover mouseenter");
        }
    }
```

A sample search_function PHP file could look like this(PDO defined before hand, database connection established):
```php
<? php
if (isset($_GET['term'])){
    $return_arr = array();

    try {
        $stmt = $pdo->prepare('SELECT title FROM table WHERE UPPER(title) LIKE UPPER(?)');
        $term = '%'.$_GET['term'].'%';
        $stmt->execute([$term]);
        $return_arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }

    echo json_encode($return_arr);
}
?>
```