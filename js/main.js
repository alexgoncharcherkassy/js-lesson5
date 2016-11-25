var todo = document.getElementById("todo");
var todoButton = document.getElementById("todo-button");
var Item = {
    id: '',
    field: '',
    status: false,

    setId: function (id) {
        this.id = id;
    },
    getId: function () {
        return this.id;
    },
    setField: function (field) {
        this.field = field;
    },
    setStatus: function (status) {
        this.status = status;
    },
    getField: function () {
        return this.field;
    },
    getStatus: function () {
        return this.status;
    }
};
var items = [];
var id = 0;

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
        item.setId(id++);
        item.setField(todo.value);
        item.setStatus(false);
        items.push(item);
        todo.value = '';
        createItem(item);
        console.log(items);
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
    div.setAttribute('id', item.getId());
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'select-input');
    var label = document.createElement('label');
    label.innerHTML = item.getField();
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
        if (parent.id == el.getId()) {
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
        if (id == el.getId()) {
            return true;
        }

        return false;
    });
    var obj = items[ind];
    obj.setStatus(status);
    renderAmount();
}


function renderAmount() {
    amountDiv = document.getElementById('amount-div');

    if (!amountDiv) {
        var toogle = document.getElementById('toogle');
        var amountDiv = document.createElement('div');
        amountDiv.setAttribute('class', 'todo-toogle');
        amountDiv.setAttribute('id', 'amount-div');
        toogle.parentNode.appendChild(amountDiv);
    }

    amountDiv.innerHTML = 'Selected number: ' + countSelected();
}

function countSelected() {
    var count = 0;
    items.forEach(function (elem) {
        if (elem.status == true) {
            count++;
        }
    });

    return count;
}

