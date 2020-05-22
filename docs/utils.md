| title: Hello

# Utils

## Array utils

---

| title: Yo

### array

`array = (length = 1)`

Creates an empty array with the `length` of items.

```
{{ array(3) }}
```

gives the result

`{{ array(3) }}`

<br />

To fill the array with values, you can use a Javacript `map` array method:

```
{{ array(3).map(_ => 100) }}
```

`{{ array(3).map(_ => 100) }}`
