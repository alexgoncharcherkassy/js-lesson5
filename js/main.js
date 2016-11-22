var todo = document.getElementById("todo");
var todoButton = document.getElementById("todo-button");
var Item = {
    field: '',
    status: false,

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

todo.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13 && todo.value !== '') {
        todoButton.click();
    }
});

todoButton.addEventListener("click", function (event) {
    event.preventDefault();
    item = Object.create(Item);
    item.setField(todo.value);
    item.setStatus(false);
    items.push(item);
    todo.value = '';
    console.log(items);
});

function checkItems() {
    if (items.length > 0) {
        items.forEach(function (val, ind, arr) {

        });
    }
}