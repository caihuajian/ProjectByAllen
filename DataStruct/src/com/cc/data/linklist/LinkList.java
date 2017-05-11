package com.cc.data.linklist;

import java.util.Random;

public class LinkList {

	public Node list;

	public int getElem(int i) {
		Node p = list.next;
		int j;
		j = 0;
		if (p == null) {
			return -1;
		}
		if (j == i) {
			return p.data;
		}
		while (p != null && j < i) {
			p = p.next;
			++j;
		}

		if (p == null || j > i) {
			return -1;
		}
		return p.data;
	}

	public int insert(int i, int e) {
		int j = 0;
		Node p, s;
		p = list;

		System.out.println("=============" + list.data);

		if (i == 0) {
			p.data = e;
			p.next = null;
			return 0;
		}

		while (p != null && j < i) {
			p = p.next;
			++j;
		}

		if (p == null || j > i) {
			return -1;
		}
		s = new Node();
		s.data = e;
		s.next = p.next;
		p.next = s;
		return 0;

	}

	public int delete(int i) {
		int j = 0;
		Node p, q;
		p = list;

		while (p.next != null && j < i) {
			p = p.next;
			++j;
		}
		if (p.next == null || j < i) {
			return -1;
		}
		q = p.next;
		p.next = q.next;
		return 0;

	}

	public void createListHead(int n) {
		Node p;
		int i;
		list = new Node();
		list.next = null;
		for (i = 0; i < n; i++) {
			p = new Node();
			p.data = new Random().nextInt(100);
			p.next = list.next;
			list.next = p;
		}
	}

	public void createListTail(int n) {

		Node p, r;
		int i;
		list = new Node();
		r = list;
		for (i = 0; i < n; i++) {
			p = new Node();
			p.data = new Random().nextInt(100);
			r.next = p;
			r = p;
		}

		r.next = null;
	}

	public int clear() {
		Node p, q;
		p = list.next;
		while (p != null) {
			q = p.next;
			p = null;
			p = q;
		}

		list.next = null;
		return 0;
	}

	public void printList() {
		Node p;
		p = list;
		String res = "[";
		while (p.next != null) {
			res += p.data + ",";
			p = p.next;
		}
		System.out.println(res + "]");
	}
}
