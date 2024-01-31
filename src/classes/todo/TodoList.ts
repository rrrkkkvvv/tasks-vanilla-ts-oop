import Todo from './Todo';


export default class TodoList {
    todos: Todo[] = [];
    todoListElement: HTMLElement | null = document.querySelector('.todo-list');
    todoTemplate: HTMLElement | null = document.querySelector('#template-item');

    constructor() {
        this.loadTodos();
        this.updateTodosDiv();
        this.addEventListeners();

    }

    loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            try {

                const parsedTodos: Todo[] = JSON.parse(storedTodos);
                this.todos = parsedTodos;
                this.countOfTodos();

            } catch (error) {
                console.error(error);
            }
        }
    }

    updateTodosDiv() {

        if (this.todoListElement && this.todoTemplate) {
            this.todoListElement.innerHTML = '';
            this.todos.forEach((todo) => {
                let newTodoDiv = document.importNode(this.todoTemplate!, true) as HTMLElement;

                newTodoDiv.classList.add('todo-item');
                newTodoDiv.id = todo.id.toString();
                newTodoDiv.querySelector('.todo-item__text')!.textContent = todo.text;
                if (todo.completed) {
                    newTodoDiv.classList.add('todo-item--done');
                }
                this.todoListElement!.appendChild(newTodoDiv);
            })
        }
    }

    addTodo(text: string) {
        if (text.trim() !== '') {
            let newTodo = new Todo(
                this.todos.length >= 1 ? this.todos.length : 0,
                text,
                false
            )

            this.todos.push(newTodo);
            this.updateTodosDiv();
            this.addEventListeners();
            localStorage.setItem('todos', JSON.stringify(this.todos));
            this.countOfTodos()

        }
    }

    removeTodo(removedTodosId: number) {
        this.todos = this.todos.filter((todo) => todo.id !== removedTodosId)
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.countOfTodos()
    }

    addEventListeners() {
        const allTodos = document.querySelectorAll('.todo-item');
        allTodos.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.toggle('todo-item--done');
                let todoId = parseInt(item.id);
                let todo = this.todos.find((todo) => todo.id === todoId);
                if (todo) {
                    todo.completed = !todo.completed;
                    this.countOfTodos();

                    localStorage.setItem('todos', JSON.stringify(this.todos));
                }
            })
            item.querySelector('.todo-item__remove-button')!.addEventListener('click', () => {
                const todoId = parseInt(item.id);
                this.removeTodo(todoId);
                item.remove();
            });
        })
    }

    countOfTodos() {
        const counter = document.querySelector('.app-footer');
        if (counter) {
            const doneTodos = this.todos.filter(todo => todo.completed);
            const moreTodos = this.todos.filter(todo => !todo.completed);
            counter.textContent = `${moreTodos.length} more to do, ${doneTodos.length} done`;
        }
    }

}
