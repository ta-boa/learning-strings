
Menu
[x] abs/doremi

[x] display (frets,semi,major)

[x] tuning preset

[x] string running

[x] left/right hand

[] migrar settings.value para display

[] migrar cores dos menus para variables

[] tweak screen sizes 

[] chord list

[] adicionar violao e guitarra

[] arrumar alias (~/music, ~/...)

[] seminotes? major/minor on scales

[] about

[] copyright

[] tailwind

[] vite?

- share (querystring/base64)?
- timeline?

```
   1   │ const keys = [["C"], ["Db", "C#"], ["D"]]
   2   │
   3   │ // given the keys above, build a script that can combine all possible combinations of the keys
   4   │ // and return a new array of all possible combinations
   5   │
   6   │ function AllCombinations() {
   7   │     var result = []
   8   │     var current = []
   9   │     var index = 0
  10   │     function recurse() {
  11   │         if (index === keys.length) {
  12   │             result.push(current.slice())
  13   │             return
  14   │         }
  15   │         for (var i = 0; i < keys[index].length; i++) {
  16   │             current.push(keys[index][i])
  17   │             index++
  18   │             recurse()
  19   │             index--
  20   │             current.pop()
  21   │         }
  22   │     }
  23   │     recurse()
  24   │     return result
  25   │ }
  26   │ console.log(AllCombinations())
```
