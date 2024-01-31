import './style.css'
import TodoList from './classes/todo/TodoList';
import Categories from './classes/Categories';


const todoList = new TodoList();
const categories = new Categories()

const addTodoButton = document.querySelector('#add-todo--button');
const addTodoInput = document.querySelector('#add-todo--input') as HTMLInputElement;

const addTodoForm = document.querySelector('.add-todo__form');

const allButton = document.querySelector('.all');
const doneButton = document.querySelector('.done');
const activeButton = document.querySelector('.active');
const addTodoShowButton = document.querySelector('.add-todo__show-form-button');
const closeAddTodoButton = document.querySelector('.close-button');

addTodoButton?.addEventListener('click', (e) => {
  e.preventDefault();
  todoList.addTodo(addTodoInput.value);
  addTodoInput.value = '';
});

allButton!.addEventListener('click', () => {
  categories.changeCategory('all');
})
activeButton!.addEventListener('click', () => {
  categories.changeCategory('active');
})
doneButton!.addEventListener('click', () => {
  categories.changeCategory('done');
})


addTodoShowButton!.addEventListener('click', () => {
  addTodoForm?.classList.toggle('hide');
})

closeAddTodoButton!.addEventListener('click', () => {
  addTodoForm?.classList.add('hide');
})
