var todo = document.getElementById("todo");
var todoButton = document.getElementById("todo-button");
var Item = {
    id: String,
    field: String,
    status: Boolean
};
var items = [];
var id = 0;
var myStorage = localStorage;

function saveToStorage(items) {
    myStorage.setItem('storage', JSON.stringify(items));
}

function getFromStorage() {
    items = JSON.parse(myStorage.getItem('storage'));
    return items ? items : [];
}

todo.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13 && todo.value !== '') {
        todoButton.click();
    }
});

todoButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (todo.value !== '') {
        item = Object.create(Item);
        item.id = Date.now();
        item.field = todo.value;
        item.status = false;
        items.push(item);
        todo.value = '';
        createItem(item);
        saveToStorage(items);
    }
});

function createRenderDiv() {
    ul = document.getElementById('toogle-ul');

    if (!ul) {
        var toogle = document.createElement('div');
        toogle.setAttribute('id', 'toogle');
        toogle.setAttribute('class', 'todo-toogle');
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'toogle-ul');
        document.getElementById("todo-section").insertBefore(toogle, null);
        toogle.appendChild(ul);
    }

    return ul;
}

function createItem(item) {
    ul = createRenderDiv();
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.setAttribute('class', 'view');
    div.setAttribute('id', item.id);
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'select-input');
    if (item.status) {
        checkbox.setAttribute('checked', true);
    }
    var label = document.createElement('label');
    label.innerHTML = item.field;
    var btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn-remove');
    btn.setAttribute('value', 'x');
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(btn);
    li.appendChild(div);
    btn.addEventListener("click", remove, false);
    checkbox.addEventListener("change", select, false);

    ul.appendChild(li);
}

function remove(elem) {
    var parent = elem.target.parentNode;
    ind = items.findIndex(function (el) {
        if (parent.id == el.id) {
            return true;
        }

        return false;
    });
    items.splice(ind, 1);
    parent.parentNode.remove();
    var amountDiv = document.getElementById('amount-div');
    if (items.length === 0 && amountDiv) {
        amountDiv.remove();
    }
    renderAmount();
    saveToStorage(items);
}

function select(elem) {
    var nextSibling = elem.target.nextSibling;

    if (elem.target.checked) {
        nextSibling.setAttribute('class', 'selected-label');
        setStatus(elem, true);
    } else {
        nextSibling.setAttribute('class', '');
        setStatus(elem, false);
    }
}

function setStatus(elem, status) {
    var id = elem.target.parentNode.id;
    ind = items.findIndex(function (el) {
        if (id == el.id) {
            return true;
        }

        return false;
    });
    var obj = items[ind];
    obj.status = status;
    saveToStorage(items);
    renderAmount();
}


function renderAmount() {
    var count = countSelected();
    amountDiv = document.getElementById('amount-div');

    if (count) {
        if (!amountDiv) {
            var toogle = document.getElementById('toogle');
            var amountDiv = document.createElement('div');
            amountDiv.setAttribute('class', 'todo-toogle');
            amountDiv.setAttribute('id', 'amount-div');
            toogle.parentNode.appendChild(amountDiv);
        }

        amountDiv.innerHTML = 'Selected number: ' + count;
    }
    if (!count && amountDiv) {
        amountDiv.remove();
    }
}

function countSelected() {
    var count = 0;
    items.forEach(function (elem) {
        if (elem.status) {
            count++;
        }
    });

    return count;
}

function renderFromStorage() {
    items = getFromStorage();
    console.log(items);
    if (items) {
        items.forEach(function (val) {
            console.log(val);
            createItem(val);
        });
        renderAmount();
    }
}
renderFromStorage();