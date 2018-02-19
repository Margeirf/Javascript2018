# Verkefni 5
## 1.) Afhverju er getElementById() fljótleglegasta aðferðin?
Af því að það stoppar þegar það hefur fundið 1 element.

## 2.) Hvað gerir querySelectorAll()? komdu með kóðasýnidæmi ásamt skýringu
querySelectorAll() finnur öll element með ákveðinn css classa eins og .container, þessi element verða "indexuð" þeas þau verða númeruð eins og array, byrja á 0

```javascript
    document.querySelectorAll(".container");
```

## 3.) Hvað er NodeList? Útskýrðu útfrá eftirfarandi kóðasýnidæmi, útskýrðu línu fyrir línu.

```javascript
    var elements = document.getElementsByTagName('li');
    if (elements.length > 0) {
    var el = elements[2];
    el.className = 'cool';
    }
```

hér eru öll element af týpunni li sett í lista og ef það eru fleiri en 0 li element þá fær li nr. 3 css classann "cool"

## 4.) Hvað gerir getElementsByTagName()? Hverju eru skilað? komdu með kóðsýnidæmi.

```javascript
    var elements = document.getElementsByTagName('li');
```

þessi aðferð finnur öll element með nafninu li og indexar þau

