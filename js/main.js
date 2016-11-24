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
    item = Object.create(Item);
    item.setId(id++);
    item.setField(todo.value);
    item.setStatus(false);
    items.push(item);
    todo.value = '';
    createItem(item);
    console.log(items);
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
    btn.setAttribute("onClick", remove);

    ul.appendChild(li);
}







function renderItems(id) {
    if (items.length > 0) {
        // if (!document.getElementById('toogle')) {
            var toogle = document.createElement('div');
            toogle.setAttribute('id', 'toogle');
            toogle.setAttribute('class', 'todo-toogle');
            var ul = document.createElement('ul');


            document.getElementById("todo-section").insertBefore(toogle, null);
            toogle.appendChild(ul);
        // } else {
        //     toogle = document.getElementById('toogle');
        //     ul = toogle.children[0];
        //     console.log(ul);
        // }
            console.log(ul);

        items.forEach(function (val, ind, arr) {
            var li = document.createElement('li');
            var div = document.createElement('div');
            div.setAttribute('class', 'view');
            div.setAttribute('id', val.getId());
            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            var label = document.createElement('label');
            label.innerHTML = val.getField();
            var btn = document.createElement('input');
            btn.setAttribute('type', 'button');
            btn.setAttribute('class', 'btn-remove');
            // btn.setAttribute('id', val.getId());
            btn.setAttribute('value', 'x');
            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(btn);
            li.appendChild(div);

            ul.appendChild(li);

            // btn.setAttribute('onClick', remove);

            console.log(li);
        });

    }
}
function remove() {
    // items.splice(id, 1);
    // renderItems();
    // var parent = div.parentNode;
    // div.remove();
    console.log(this);
}
// var removes = document.getElementsByClassName('btn-remove');
// removes.forEach(function (val, ind) {
//
// });
// console.log(removes);
