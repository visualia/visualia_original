# Utils

## Array utils

### array()

`array = (length = 1)`

Creates an empty array with the `length` of items.

**Usage**

```
{{ array(3) }}
```

gives the result

`{{ array(3) }}`

<br />

#### Note

To fill the array with values, you can use a Javacript `map` array method:

```
{{ array(3).map(_ => 100) }}
```

`{{ array(3).map(_ => 100) }}`

### array2object()

**Usage**

```
{{ array2object([['hello','world'],['hola','mundo']]) }}
```

gives the result

`{{ array2object([['hello','world'],['hola','mundo']]) }}`
