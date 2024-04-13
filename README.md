
# Masonry

A lightweight library for creating cascadind grid layout

## Initialize
In js file

``` js

const options = {
  0: {
    gap: 10,
    columns: 1,
  },
  700: {
    gap: 20,
    columns: 2,
  },
  1000: {
    gap: 20,
    columns: 3,
  },
};

//Availiable three option for configuration {containerWidth, gap cols and cols number}

new Masonry(document.getElementById("masonry"), options);



```

In HTML

Add a div element with class `masonry`. 

``` html


<div class="masonry" id="masonry">
     <div class="masonry_item card">
       <!-- Add your card code here... -->
     </div> 
</div>
```


* * *

Made by Krasnolobov Sergey
