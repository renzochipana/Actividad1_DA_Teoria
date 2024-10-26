
import { LinkedList } from './LinkedList';

export const saveListToStorage = (list) => {
  const books = list.findAll();
  localStorage.setItem('library', JSON.stringify(books));
};

export const loadListFromStorage = () => {
  const books = JSON.parse(localStorage.getItem('library')) || [];
  const list = new LinkedList();
  books.forEach((book) => list.add(book));
  return list;
};
