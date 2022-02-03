
# Masonry

Cascading grid layout library

## Initialize

With vanilla JavaScript

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

With HTML

Add a div element with class `masonry`. 

``` html


<div class="masonry" id="masonry">
    <!-- Your cards here... -->
</div>
```


* * *

Made by Krasnolobov Sergey