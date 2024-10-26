class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.empty = true;
    }
  
    add(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
      this.empty = false;
    }
    calculateTotalPrice() {
        let total = 0;
        let current = this.head;
    
        while (current) {
          total += current.data.price; // Assumes each node's data has a `price` property
          current = current.next;
        }
        return total;
      }
  
    remove(title) {
      if (!this.head) return;  
      if (this.head.data.title === title) {
        this.head = this.head.next;
        return;
      }
  
      let current = this.head;
      while (current.next && current.next.data.title !== title) {
        current = current.next;
      }
  
      if (current.next) {
        current.next = current.next.next;
      }
    }
  
    findAll() {
      let books = [];
      let current = this.head;
      while (current) {
        books.push(current.data);
        current = current.next;
      }
      return books;
    }
  }
  
  export { LinkedList };
  