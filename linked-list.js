/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {

    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    } else {

      this.tail.next = newNode;
      this.tail = newNode;
      this.length += 1;
    }
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {

    if (!this.head) return new Error("The list is empty!");

    let currentNode = this.head;
    const tail = this.tail;

    while (currentNode) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        return tail;
      }

      if (currentNode.next === this.tail) {
        currentNode.next = null;
        this.tail = currentNode;
        this.length -= 1;
        return tail;
      }
      currentNode = currentNode.next;

    }


  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) return new Error("The list is empty!");

    const head = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return head;



  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this.getNodeByIdx(idx).val;

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);
   if (idx === this.length) return this.push(val);

   if (idx === 0) return this.unshift(val);

   if (idx > this.length || idx < 0) {
    throw new Error("Invalid index.");
  }
   
    // get the one before it
    let prev = this.getNodeByIdx(idx - 1);

    
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  getNodeByIdx(idx){
    let currentNode = this.head;
    let count = 0;

    while (currentNode != null && count != idx) {
      count += 1;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

// module.exports = LinkedList;
